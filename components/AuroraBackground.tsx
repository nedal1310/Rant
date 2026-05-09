"use client";

import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { motion, useMotionValue, animate, useMotionTemplate } from "framer-motion";
import { useEffect } from "react";

const COLORS = ["#befae5", "#1E67C6", "#CE84CF", "#eb7c98"];

export function AuroraBackground() {
  const color = useMotionValue(COLORS[0]);

  useEffect(() => {
    animate(color, COLORS, {
      duration: 10,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const background = useMotionTemplate`
    radial-gradient(140% 140% at 50% 0%, #020617 55%, ${color})
  `;

  return (
    <motion.div
      style={{ background }}
      className="fixed inset-0 z-0 pointer-events-none"
    // no extra classes needed, fixed inset-0 already handles it
    >
      <Canvas
        style={{ position: "absolute", inset: 0 }}
        gl={{ antialias: false, powerPreference: "low-power" }}
      >
        <Stars
          radius={50}
          count={typeof window !== "undefined" && window.innerWidth < 768 ? 800 : 2000}
          factor={4}
          fade
          speed={2}
        />
      </Canvas>
    </motion.div>
  );
}
