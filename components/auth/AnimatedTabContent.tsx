// components/AnimatedTabContent.tsx
"use client";
import { motion } from "framer-motion";

export function AnimatedTabContent({ children, keyId }: any) {
  return (
    <motion.div
      key={keyId}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
