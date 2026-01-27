import { useState, useRef, useCallback, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { VoiceState } from "@/lib/voiceConfig";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

interface UsePushToTalkOptions {
  agentType: string;
  onTranscriptReady: (text: string) => void;
  onPartialTranscript?: (text: string) => void;
  onStateChange?: (state: VoiceState) => void;
  stopAgentAudio?: () => void; // For barge-in
}

interface UsePushToTalkReturn {
  state: VoiceState;
  isRecording: boolean;
  isProcessing: boolean;
  partialTranscript: string;
  audioLevel: number;
  startRecording: () => void;
  stopRecording: () => void;
  error: string | null;
}

export function usePushToTalk({
  agentType,
  onTranscriptReady,
  onPartialTranscript,
  onStateChange,
  stopAgentAudio,
}: UsePushToTalkOptions): UsePushToTalkReturn {
  const [state, setState] = useState<VoiceState>("idle");
  const [partialTranscript, setPartialTranscript] = useState("");
  const [audioLevel, setAudioLevel] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animationRef = useRef<number | null>(null);
  const hasAudioRef = useRef(false);

  // Update state and notify
  const updateState = useCallback((newState: VoiceState) => {
    setState(newState);
    onStateChange?.(newState);
  }, [onStateChange]);

  // Analyze audio levels
  const analyzeAudio = useCallback(() => {
    if (!analyserRef.current) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);

    // Calculate RMS level
    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
      sum += dataArray[i] * dataArray[i];
    }
    const rms = Math.sqrt(sum / dataArray.length) / 255;
    setAudioLevel(rms);

    // Detect if there's actual audio (voice activity)
    if (rms > 0.05) {
      hasAudioRef.current = true;
    }

    if (state === "recording") {
      animationRef.current = requestAnimationFrame(analyzeAudio);
    }
  }, [state]);

  // Start recording
  const startRecording = useCallback(async () => {
    // Barge-in: stop any playing agent audio
    stopAgentAudio?.();

    setError(null);
    setPartialTranscript("");
    hasAudioRef.current = false;
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

      // Set up audio analysis
      audioContextRef.current = new AudioContext();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      source.connect(analyserRef.current);

      // Set up MediaRecorder
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

      mediaRecorder.start(100); // Collect data every 100ms
      updateState("recording");

      // Start audio level analysis
      analyzeAudio();

    } catch (err: any) {
      console.error("Failed to start recording:", err);
      
      if (err.name === "NotAllowedError") {
        setError("Microphone access denied");
        toast({
          variant: "destructive",
          title: "Microphone Access Denied",
          description: "Please allow microphone access in your browser settings.",
        });
      } else {
        setError("Failed to start recording");
        toast({
          variant: "destructive",
          title: "Recording Error",
          description: "Failed to access microphone. Please try again.",
        });
      }
      updateState("error");
    }
  }, [analyzeAudio, stopAgentAudio, updateState]);

  // Stop recording and transcribe
  const stopRecording = useCallback(async () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    const mediaRecorder = mediaRecorderRef.current;
    if (!mediaRecorder || mediaRecorder.state === "inactive") {
      updateState("idle");
      return;
    }

    // Stop the recorder
    return new Promise<void>((resolve) => {
      mediaRecorder.onstop = async () => {
        // Clean up stream
        streamRef.current?.getTracks().forEach(track => track.stop());
        
        // Clean up audio context
        if (audioContextRef.current) {
          await audioContextRef.current.close();
          audioContextRef.current = null;
        }

        // Check if we have audio data and voice was detected
        if (audioChunksRef.current.length === 0 || !hasAudioRef.current) {
          console.log("No speech detected, discarding");
          setAudioLevel(0);
          updateState("idle");
          resolve();
          return;
        }

        // Create audio blob
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        
        if (audioBlob.size < 1000) {
          console.log("Audio too short, discarding");
          setAudioLevel(0);
          updateState("idle");
          resolve();
          return;
        }

        updateState("transcribing");
        setAudioLevel(0);

        try {
          // Upload to STT endpoint
          const formData = new FormData();
          formData.append("audio", audioBlob, "recording.webm");
          formData.append("language", "eng");

          const response = await fetch(
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

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || "Transcription failed");
          }

          const result = await response.json();
          const transcript = result.text?.trim();

          if (transcript) {
            onTranscriptReady(transcript);
            updateState("sending");
          } else {
            console.log("Empty transcript, discarding");
            updateState("idle");
          }
        } catch (err: any) {
          console.error("Transcription error:", err);
          setError("Failed to transcribe audio");
          toast({
            variant: "destructive",
            title: "Transcription Failed",
            description: "Could not process your speech. Please try again.",
          });
          updateState("error");
        }

        resolve();
      };

      mediaRecorder.stop();
    });
  }, [onTranscriptReady, updateState]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      streamRef.current?.getTracks().forEach(track => track.stop());
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return {
    state,
    isRecording: state === "recording",
    isProcessing: state === "transcribing" || state === "sending",
    partialTranscript,
    audioLevel,
    startRecording,
    stopRecording,
    error,
  };
}
