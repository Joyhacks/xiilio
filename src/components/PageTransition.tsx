import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const pageTransition = {
  type: "tween" as const,
  ease: "easeOut",
  duration: 0.2,
};

export function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [displayKey, setDisplayKey] = useState(location.key);

  useEffect(() => {
    setDisplayKey(location.key);
  }, [location.key]);

  return (
    <motion.div
      key={displayKey}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
}
