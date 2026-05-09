"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  href?: string;
  animated?: boolean;
}

const sizes = {
  sm: { box: "w-7 h-7 rounded-lg text-sm", text: "text-lg" },
  md: { box: "w-9 h-9 rounded-xl text-base", text: "text-xl" },
  lg: { box: "w-12 h-12 rounded-2xl text-xl", text: "text-2xl" },
};

function LogoMark({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const s = sizes[size];
  return (
    <div
      className={`${s.box} bg-gradient-to-br from-primary to-accent flex items-center justify-center font-black text-white flex-shrink-0`}
    >
      <span className={s.text}>U</span>
    </div>
  );
}

export function Logo({ size = "md", href = "/", animated = true }: LogoProps) {
  const s = sizes[size];
  const inner = (
    <div className="flex items-center gap-2.5">
      <LogoMark size={size} />
      <span className={`${s.text} font-bold text-gray-900 dark:text-white leading-none`}>
        U<span className="text-primary">Market</span>
      </span>
    </div>
  );

  if (!animated) {
    return href ? <Link href={href}>{inner}</Link> : inner;
  }

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
      {href ? <Link href={href}>{inner}</Link> : inner}
    </motion.div>
  );
}

/* Versión solo del ícono, para splash screen */
export function LogoIcon({ className = "" }: { className?: string }) {
  return (
    <div
      className={`bg-gradient-to-br from-primary to-accent flex items-center justify-center font-black text-white ${className}`}
    >
      <span className="text-4xl">U</span>
    </div>
  );
}
