import { useState, useCallback, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Loader2 } from "lucide-react";

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
}

const PULL_THRESHOLD = 80;
const ACTIVATION_DISTANCE = 15;

export function PullToRefresh({ onRefresh, children }: PullToRefreshProps) {
  const [refreshing, setRefreshing] = useState(false);
  const pullY = useMotionValue(0);
  const startY = useRef(0);
  const pulling = useRef(false);
  const decided = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const indicatorOpacity = useTransform(pullY, [0, PULL_THRESHOLD], [0, 1]);
  const indicatorScale = useTransform(pullY, [0, PULL_THRESHOLD], [0.5, 1]);
  const rotate = useTransform(pullY, [0, PULL_THRESHOLD], [0, 180]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (refreshing) return;
    decided.current = false;
    pulling.current = false;
    startY.current = 0;
    // Only track if page is scrolled to absolute top
    if (window.scrollY <= 0) {
      startY.current = e.touches[0].clientY;
    }
  }, [refreshing]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (refreshing || startY.current === 0) return;

    const currentY = e.touches[0].clientY;
    const rawDy = currentY - startY.current;

    if (!decided.current) {
      if (Math.abs(rawDy) < ACTIVATION_DISTANCE) return;
      decided.current = true;
      if (rawDy <= 0) {
        // Scrolling up — abort, let browser handle
        startY.current = 0;
        return;
      }
      // Double-check we're still at top (bounce could have moved us)
      if (window.scrollY > 0) {
        startY.current = 0;
        return;
      }
      pulling.current = true;
    }

    if (!pulling.current) return;

    // Prevent native scroll while pulling
    e.preventDefault();
    const dy = Math.max(0, rawDy * 0.4);
    pullY.set(Math.min(dy, PULL_THRESHOLD * 1.5));
  }, [pullY, refreshing]);

  const handleTouchEnd = useCallback(async () => {
    startY.current = 0;
    if (!pulling.current) return;
    pulling.current = false;
    decided.current = false;

    if (pullY.get() >= PULL_THRESHOLD && !refreshing) {
      setRefreshing(true);
      pullY.set(PULL_THRESHOLD * 0.6);
      try {
        if ("vibrate" in navigator) navigator.vibrate(15);
        await onRefresh();
      } finally {
        setRefreshing(false);
        pullY.set(0);
      }
    } else {
      pullY.set(0);
    }
  }, [pullY, onRefresh, refreshing]);

  // Use native event listeners so we can call preventDefault (non-passive)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    el.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return (
    <div ref={containerRef} className="relative">
      {/* Pull indicator */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 z-40 flex items-center justify-center"
        style={{
          opacity: indicatorOpacity,
          scale: indicatorScale,
          top: 72,
        }}
      >
        <motion.div
          className="w-10 h-10 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center border border-primary/30"
          style={{ rotate: refreshing ? undefined : rotate }}
          animate={refreshing ? { rotate: 360 } : {}}
          transition={refreshing ? { repeat: Infinity, duration: 0.8, ease: "linear" } : {}}
        >
          <Loader2 className="w-5 h-5 text-primary" />
        </motion.div>
      </motion.div>

      {children}
    </div>
  );
}
