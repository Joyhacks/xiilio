import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AudioWaveformProps {
  isActive: boolean;
  getVolume: () => number;
  barCount?: number;
  className?: string;
  color?: "primary" | "accent" | "muted";
}

export function AudioWaveform({ 
  isActive, 
  getVolume, 
  barCount = 5,
  className,
  color = "primary"
}: AudioWaveformProps) {
  const [bars, setBars] = useState<number[]>(Array(barCount).fill(0.1));
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!isActive) {
      setBars(Array(barCount).fill(0.1));
      return;
    }

    const animate = () => {
      const volume = getVolume();
      
      // Create varied bar heights based on volume with some randomness
      const newBars = Array(barCount).fill(0).map((_, i) => {
        const centerIndex = Math.floor(barCount / 2);
        const distanceFromCenter = Math.abs(i - centerIndex);
        const baseHeight = Math.max(0.1, volume - distanceFromCenter * 0.05);
        const randomVariation = (Math.random() - 0.5) * 0.2;
        return Math.min(1, Math.max(0.1, baseHeight + randomVariation));
      });
      
      setBars(newBars);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, getVolume, barCount]);

  const colorClasses = {
    primary: "bg-primary",
    accent: "bg-accent",
    muted: "bg-muted-foreground"
  };

  return (
    <div className={cn("flex items-center justify-center gap-1", className)}>
      {bars.map((height, i) => (
        <div
          key={i}
          className={cn(
            "w-1 rounded-full transition-all duration-75",
            colorClasses[color]
          )}
          style={{ 
            height: `${Math.max(4, height * 32)}px`,
            opacity: isActive ? 0.7 + height * 0.3 : 0.3
          }}
        />
      ))}
    </div>
  );
}
