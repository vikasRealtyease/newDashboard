"use client";

import { motion } from "framer-motion";

interface GradientBlobProps {
  className?: string;
  animate?: boolean;
  color?: "brand" | "success" | "warning" | "purple";
}

export function GradientBlob({
  className = "",
  animate = true,
  color = "brand",
}: GradientBlobProps) {
  const colorClasses = {
    brand: "bg-linear-to-br from-brand-400/30 via-brand-300/20 to-brand-500/30",
    success: "bg-linear-to-br from-success-400/30 via-success-300/20 to-success-500/30",
    warning: "bg-linear-to-br from-warning-400/30 via-warning-300/20 to-warning-500/30",
    purple: "bg-linear-to-br from-purple-400/30 via-purple-300/20 to-purple-500/30",
  };

  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${colorClasses[color]} ${className}`}
      animate={
        animate
          ? {
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, 30, 0],
              y: [0, -30, 0],
            }
          : {}
      }
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
