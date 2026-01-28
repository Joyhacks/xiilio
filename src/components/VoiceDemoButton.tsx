import { useState, useCallback, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Volume2, Loader2, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

type DemoState = "idle" | "recording" | "processing" | "speaking";

// Demo greeting messages from different agents
const DEMO_GREETINGS = [
  { agent: "receptionist", text: "Hello! I'm Julia, your AI receptionist. How can I help you today?" },
  { agent: "assistant", text: "Hi there! I'm Kate, your personal AI assistant. What can I do for you?" },
  { agent: "sales", text: "Hey! I'm Brad from sales. Ready to help you grow your business!" },
];

export function VoiceDemoButton({ className }: { className?: string }) {
  const [state, setState] = useState<DemoState>("idle");
  const [audioLevel, setAudioLevel] = useState(0);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, []);

  const cleanup = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    if (mediaRecorderRef.current) {
      if (mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop();
      }
      mediaRecorderRef.current = null;
    }
    setAudioLevel(0);
  }, []);

  const analyzeAudio = useCallback(() => {
    if (!analyserRef.current) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);

    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
      sum += dataArray[i] * dataArray[i];
    }
    const rms = Math.sqrt(sum / dataArray.length) / 255;
    setAudioLevel(rms);

    if (state === "recording") {
      animationRef.current = requestAnimationFrame(analyzeAudio);
    }
  }, [state]);

  const playDemoGreeting = useCallback(async () => {
    setState("processing");
    
    // Pick a random greeting
    const greeting = DEMO_GREETINGS[Math.floor(Math.random() * DEMO_GREETINGS.length)];
    
    abortControllerRef.current = new AbortController();

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
            text: greeting.text,
            agentType: greeting.agent,
          }),
          signal: abortControllerRef.current.signal,
        }
      );

      if (!response.ok) {
        throw new Error(`TTS request failed: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      const audio = new Audio(audioUrl);
      audio.volume = 0.8;
      audioRef.current = audio;

      audio.onplay = () => {
        setState("speaking");
      };

      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        setState("idle");
        audioRef.current = null;
        toast({
          title: "Voice Demo Complete! 🎉",
          description: "Explore our AI agents to experience full conversations.",
        });
      };

      audio.onerror = () => {
        URL.revokeObjectURL(audioUrl);
        setState("idle");
        audioRef.current = null;
      };

      await audio.play();
    } catch (error: any) {
      if (error.name !== "AbortError") {
        console.error("TTS error:", error);
        toast({
          variant: "destructive",
          title: "Voice Demo Error",
          description: "Failed to play voice demo. Please try again.",
        });
      }
      setState("idle");
    }
  }, []);

  const startRecording = useCallback(async () => {
    cleanup();
    audioChunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        } 
      });
      streamRef.current = stream;

      audioContextRef.current = new AudioContext();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      source.connect(analyserRef.current);

      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus') 
        ? 'audio/webm;codecs=opus' 
        : 'audio/webm';
      
      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        streamRef.current?.getTracks().forEach(track => track.stop());
        
        if (audioContextRef.current) {
          await audioContextRef.current.close();
          audioContextRef.current = null;
        }

        if (audioChunksRef.current.length > 0) {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          
          if (audioBlob.size > 1000) {
            await transcribeAndRespond(audioBlob);
          } else {
            // Audio too short, just play a greeting
            await playDemoGreeting();
          }
        } else {
          setState("idle");
        }
      };

      mediaRecorder.start(100);
      setState("recording");
      
      // Start audio level analysis
      analyzeAudio();

      // Auto-stop after 5 seconds for demo
      setTimeout(() => {
        if (mediaRecorderRef.current?.state === "recording") {
          stopRecording();
        }
      }, 5000);

    } catch (err: any) {
      console.error("Failed to start recording:", err);
      
      if (err.name === "NotAllowedError") {
        toast({
          variant: "destructive",
          title: "Microphone Access Denied",
          description: "Please allow microphone access to try the voice demo.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Recording Error",
          description: "Failed to access microphone. Please try again.",
        });
      }
      setState("idle");
    }
  }, [analyzeAudio, cleanup, playDemoGreeting]);

  const stopRecording = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    setAudioLevel(0);

    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }
  }, []);

  const transcribeAndRespond = useCallback(async (audioBlob: Blob) => {
    setState("processing");

    try {
      // Transcribe the audio
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.webm");
      formData.append("language", "eng");

      const sttResponse = await fetch(
        `${SUPABASE_URL}/functions/v1/elevenlabs-stt`,
        {
          method: "POST",
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
          },
          body: formData,
        }
      );

      if (!sttResponse.ok) {
        throw new Error("Transcription failed");
      }

      const result = await sttResponse.json();
      const transcript = result.text?.trim();

      if (transcript) {
        // Generate a response based on what they said
        const responseText = `I heard you say: "${transcript}". To experience full AI conversations, explore our team of specialized agents!`;
        
        abortControllerRef.current = new AbortController();

        const ttsResponse = await fetch(
          `${SUPABASE_URL}/functions/v1/elevenlabs-tts`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              apikey: SUPABASE_KEY,
              Authorization: `Bearer ${SUPABASE_KEY}`,
            },
            body: JSON.stringify({
              text: responseText,
              agentType: "receptionist",
            }),
            signal: abortControllerRef.current.signal,
          }
        );

        if (!ttsResponse.ok) {
          throw new Error("TTS failed");
        }

        const audioData = await ttsResponse.blob();
        const audioUrl = URL.createObjectURL(audioData);
        
        const audio = new Audio(audioUrl);
        audio.volume = 0.8;
        audioRef.current = audio;

        audio.onplay = () => setState("speaking");
        audio.onended = () => {
          URL.revokeObjectURL(audioUrl);
          setState("idle");
          audioRef.current = null;
        };
        audio.onerror = () => {
          URL.revokeObjectURL(audioUrl);
          setState("idle");
        };

        await audio.play();
      } else {
        // No speech detected, play greeting instead
        await playDemoGreeting();
      }
    } catch (error) {
      console.error("Demo error:", error);
      // Fallback to greeting on error
      await playDemoGreeting();
    }
  }, [playDemoGreeting]);

  const handleClick = useCallback(() => {
    if (state === "idle") {
      startRecording();
    } else if (state === "recording") {
      stopRecording();
    } else if (state === "speaking") {
      cleanup();
      setState("idle");
    }
  }, [state, startRecording, stopRecording, cleanup]);

  const pulseScale = 1 + audioLevel * 0.4;
  const glowOpacity = audioLevel * 0.8;

  return (
    <div className="relative inline-flex">
      {/* Glow effect when recording */}
      {state === "recording" && (
        <div 
          className="absolute inset-0 rounded-xl bg-primary/40 blur-xl transition-all duration-150"
          style={{ opacity: glowOpacity, transform: `scale(${pulseScale})` }}
        />
      )}
      
      {/* Speaking pulse effect */}
      {state === "speaking" && (
        <>
          <div className="absolute inset-0 rounded-xl bg-accent/30 blur-lg animate-pulse" />
          <div className="absolute -inset-2 rounded-xl bg-accent/20 blur-xl animate-pulse" style={{ animationDelay: "0.5s" }} />
        </>
      )}
      
      <Button
        variant="glass"
        size="xl"
        onClick={handleClick}
        disabled={state === "processing"}
        className={cn(
          "relative transition-all duration-300",
          state === "recording" && "ring-2 ring-primary ring-offset-2 ring-offset-background scale-105",
          state === "speaking" && "ring-2 ring-accent ring-offset-2 ring-offset-background",
          className
        )}
      >
        {state === "idle" && (
          <>
            <Mic className="w-5 h-5" />
            Try Voice Demo
          </>
        )}
        {state === "recording" && (
          <>
            <Mic className="w-5 h-5 animate-pulse text-primary" />
            Listening... (tap to stop)
          </>
        )}
        {state === "processing" && (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Processing...
          </>
        )}
        {state === "speaking" && (
          <>
            <Volume2 className="w-5 h-5 animate-pulse" />
            Speaking... (tap to stop)
          </>
        )}
        
        {/* Recording indicator */}
        {state === "recording" && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full animate-pulse" />
        )}
      </Button>
    </div>
  );
}
