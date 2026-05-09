"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogoIcon } from "@/components/ui/Logo";
import {
  splashLogoVariants,
  splashContainerVariants,
} from "@/lib/animations";

export function SplashScreen() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    /* Solo mostrar si es la primera visita en esta sesión */
    if (!sessionStorage.getItem("umarket-splash-shown")) {
      setShow(true);
      sessionStorage.setItem("umarket-splash-shown", "1");
      const t = setTimeout(() => setShow(false), 2200);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          variants={splashContainerVariants}
          initial="initial"
          exit="exit"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-light dark:from-gray-950 dark:via-gray-900 dark:to-gray-900"
        >
          <motion.div
            variants={splashLogoVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col items-center gap-4"
          >
            <LogoIcon className="w-24 h-24 rounded-3xl shadow-2xl shadow-primary/30" />
            <div className="text-center">
              <h1 className="text-3xl font-black text-gray-900 dark:text-white">
                U<span className="text-primary">Market</span>
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                El marketplace universitario de Guatemala
              </p>
            </div>
          </motion.div>

          {/* Puntos de carga */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-16 flex gap-1.5"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-primary/40"
                animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
