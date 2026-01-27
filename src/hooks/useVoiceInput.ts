import { useState, useRef, useCallback, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

interface UseVoiceInputOptions {
  agentType?: string;
  onTranscript?: (text: string) => void;
  onSpeakStart?: () => void;
  onSpeakEnd?: () => void;
}

interface UseVoiceInputReturn {
  isListening: boolean;
  isSpeaking: boolean;
  startListening: () => void;
  stopListening: () => void;
  speakText: (text: string) => Promise<void>;
  stopSpeaking: () => void;
  transcript: string;
  volume: number;
}

export function useVoiceInput({
  agentType = "assistant",
  onTranscript,
  onSpeakStart,
  onSpeakEnd,
}: UseVoiceInputOptions = {}): UseVoiceInputReturn {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [volume, setVolume] = useState(0);

  // Use 'any' for recognition ref since SpeechRecognition types vary by browser
  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const volumeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (volumeIntervalRef.current) {
        clearInterval(volumeIntervalRef.current);
      }
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
      }
    };
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
      silenceTimeoutRef.current = null;
    }
    setIsListening(false);
    setVolume(0);
  }, []);

  const startListening = useCallback(() => {
    // Check for browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      toast({
        variant: "destructive",
        title: "Not Supported",
        description: "Speech recognition is not supported in your browser. Try Chrome or Edge.",
      });
      return;
    }

    setTranscript("");
    setIsListening(true);

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    let finalTranscript = "";

    recognition.onresult = (event) => {
      let interimTranscript = "";
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript;
        } else {
          interimTranscript += result[0].transcript;
        }
      }

      const currentTranscript = finalTranscript + interimTranscript;
      setTranscript(currentTranscript);
      
      // Reset silence timeout when we get results
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
      }
      
      // Auto-stop after 3 seconds of silence (when we have some transcript)
      if (finalTranscript.trim()) {
        silenceTimeoutRef.current = setTimeout(() => {
          recognition.stop();
        }, 3000);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      setVolume(0);
      
      const final = finalTranscript.trim();
      if (final) {
        onTranscript?.(final);
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      setVolume(0);
      
      if (event.error === "not-allowed") {
        toast({
          variant: "destructive",
          title: "Microphone Access Denied",
          description: "Please allow microphone access to use voice input.",
        });
      } else if (event.error !== "aborted" && event.error !== "no-speech") {
        toast({
          variant: "destructive",
          title: "Voice Error",
          description: "Failed to recognize speech. Please try again.",
        });
      }
    };

    recognition.onaudiostart = () => {
      // Simulate volume changes for visual feedback
      volumeIntervalRef.current = setInterval(() => {
        // Random volume simulation since Web Speech API doesn't provide actual levels
        setVolume(0.3 + Math.random() * 0.4);
      }, 100);
    };

    recognition.onaudioend = () => {
      if (volumeIntervalRef.current) {
        clearInterval(volumeIntervalRef.current);
        volumeIntervalRef.current = null;
      }
      setVolume(0);
    };

    recognitionRef.current = recognition;
    
    try {
      recognition.start();
    } catch (error) {
      console.error("Failed to start recognition:", error);
      setIsListening(false);
      toast({
        variant: "destructive",
        title: "Voice Error",
        description: "Failed to start voice recognition.",
      });
    }
  }, [onTranscript]);

  const stopSpeaking = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsSpeaking(false);
    onSpeakEnd?.();
  }, [onSpeakEnd]);

  const speakText = useCallback(async (text: string) => {
    if (!text.trim()) return;
    
    // Stop any current playback
    stopSpeaking();
    
    setIsSpeaking(true);
    onSpeakStart?.();

    try {
      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/elevenlabs-tts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
          },
          body: JSON.stringify({ 
            text: text.slice(0, 1000), // Limit text length
            agentType 
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`TTS request failed: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        setIsSpeaking(false);
        onSpeakEnd?.();
      };

      audio.onerror = () => {
        URL.revokeObjectURL(audioUrl);
        setIsSpeaking(false);
        onSpeakEnd?.();
        console.error("Audio playback error");
      };

      await audio.play();
    } catch (error) {
      console.error("TTS error:", error);
      setIsSpeaking(false);
      onSpeakEnd?.();
      // Silently fail - don't show toast for TTS errors
    }
  }, [agentType, onSpeakStart, onSpeakEnd, stopSpeaking]);

  return {
    isListening,
    isSpeaking,
    startListening,
    stopListening,
    speakText,
    stopSpeaking,
    transcript,
    volume,
  };
}

// Add type declarations for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}
