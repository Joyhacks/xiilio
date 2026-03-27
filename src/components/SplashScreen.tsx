import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import logoXilio from "@/assets/logo-xilio-new.png";

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      // Trigger onComplete after exit animation duration
      setTimeout(onComplete, 500);
    }, 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!visible) {
    return (
      <motion.div
        key="splash-exit"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="fixed inset-0 z-[9999] bg-background pointer-events-none"
      />
    );
  }

  return (
    <motion.div
      key="splash"
      initial={{ opacity: 1 }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
      style={{ paddingTop: "var(--safe-area-top)", paddingBottom: "var(--safe-area-bottom)" }}
    >
          {/* Subtle radial glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[100px]" />
          </div>

          {/* Logo */}
          <motion.img
            src={logoXilio}
            alt="Xilio"
            className="w-28 h-28 md:w-36 md:h-36 object-contain drop-shadow-2xl"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />

          {/* App name */}
          <motion.h1
            className="mt-6 text-3xl md:text-4xl font-bold tracking-tight text-foreground font-['Space_Grotesk']"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            xiilio
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="mt-2 text-sm text-muted-foreground tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            Your AI Agent Team
          </motion.p>

          {/* Loading indicator */}
          <motion.div
            className="mt-10 w-12 h-0.5 rounded-full bg-primary/40 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.0, delay: 1.2, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
  );
};
