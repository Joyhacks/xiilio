import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface VoiceVisualizerProps {
  isActive: boolean;
  getVolume: () => number;
  type?: "circular" | "bars" | "wave";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function VoiceVisualizer({ 
  isActive, 
  getVolume, 
  type = "wave",
  size = "md",
  className 
}: VoiceVisualizerProps) {
  const [volume, setVolume] = useState(0);
  const [wavePoints, setWavePoints] = useState<number[]>(Array(20).fill(0.5));
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!isActive) {
      setVolume(0);
      setWavePoints(Array(20).fill(0.5));
      return;
    }

    const animate = () => {
      const currentVolume = getVolume();
      setVolume(currentVolume);

      // Generate wave points based on volume
      setWavePoints(prev => {
        const newPoints = [...prev];
        // Shift points left and add new point on right
        for (let i = 0; i < newPoints.length - 1; i++) {
          newPoints[i] = newPoints[i + 1];
        }
        // Add new point with some randomness based on volume
        newPoints[newPoints.length - 1] = 0.5 + (currentVolume - 0.5) * 0.8 + (Math.random() - 0.5) * currentVolume * 0.3;
        return newPoints;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, getVolume]);

  const sizeClasses = {
    sm: "h-8 w-24",
    md: "h-12 w-40",
    lg: "h-16 w-56"
  };

  if (type === "circular") {
    const rings = 3;
    return (
      <div className={cn("relative flex items-center justify-center", className)}>
        {Array(rings).fill(0).map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute rounded-full border-2 border-primary/30 transition-transform duration-150",
              isActive && "animate-pulse"
            )}
            style={{
              width: `${60 + i * 24 + (isActive ? volume * 20 : 0)}px`,
              height: `${60 + i * 24 + (isActive ? volume * 20 : 0)}px`,
              opacity: 1 - i * 0.25,
              transform: `scale(${1 + (isActive ? volume * 0.1 * (i + 1) : 0)})`
            }}
          />
        ))}
      </div>
    );
  }

  if (type === "bars") {
    const barCount = 9;
    return (
      <div className={cn("flex items-end justify-center gap-1", sizeClasses[size], className)}>
        {Array(barCount).fill(0).map((_, i) => {
          const centerIndex = Math.floor(barCount / 2);
          const distanceFromCenter = Math.abs(i - centerIndex);
          const baseHeight = isActive 
            ? Math.max(0.2, volume - distanceFromCenter * 0.08) 
            : 0.15;
          const randomFactor = isActive ? (Math.sin(Date.now() / 100 + i) + 1) / 2 * 0.2 : 0;
          const height = Math.min(1, baseHeight + randomFactor);
          
          return (
            <div
              key={i}
              className="w-1.5 bg-primary rounded-full transition-all duration-75"
              style={{ 
                height: `${Math.max(15, height * 100)}%`,
                opacity: 0.5 + height * 0.5
              }}
            />
          );
        })}
      </div>
    );
  }

  // Wave type (default)
  return (
    <div className={cn("relative overflow-hidden", sizeClasses[size], className)}>
      <svg 
        viewBox="0 0 100 40" 
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <path
          d={generateWavePath(wavePoints)}
          fill="none"
          stroke="url(#waveGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          className="transition-all duration-75"
        />
        {isActive && (
          <path
            d={generateWavePath(wavePoints)}
            fill="url(#waveGradient)"
            fillOpacity="0.1"
            className="transition-all duration-75"
          />
        )}
      </svg>
    </div>
  );
}

function generateWavePath(points: number[]): string {
  if (points.length < 2) return "";
  
  const width = 100;
  const height = 40;
  const stepX = width / (points.length - 1);
  
  let path = `M 0 ${height * points[0]}`;
  
  for (let i = 1; i < points.length; i++) {
    const x = i * stepX;
    const y = height * (1 - points[i]);
    const prevX = (i - 1) * stepX;
    const prevY = height * (1 - points[i - 1]);
    
    // Bezier curve for smoother wave
    const cpX1 = prevX + stepX / 3;
    const cpY1 = prevY;
    const cpX2 = x - stepX / 3;
    const cpY2 = y;
    
    path += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${x} ${y}`;
  }
  
  // Close path for fill
  path += ` L ${width} ${height} L 0 ${height} Z`;
  
  return path;
}
