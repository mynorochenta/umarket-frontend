"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Search } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { fadeInUp, staggerContainer, cardItem } from "@/lib/animations";

const sugerencias = [
  { label: "Ir al Feed", href: "/feed" },
  { label: "Publicar artículo", href: "/new-listing" },
  { label: "Ver mis favoritos", href: "/favorites" },
  { label: "Mis mensajes", href: "/messages" },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4 py-16">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="max-w-md w-full text-center"
      >
        {/* Logo */}
        <motion.div variants={cardItem} className="flex justify-center mb-8">
          <Logo size="md" />
        </motion.div>

        {/* Número animado */}
        <motion.div
          variants={fadeInUp}
          className="relative mb-6"
        >
          <p className="text-[120px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-br from-primary to-accent select-none">
            404
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search className="w-12 h-12 text-white/80" />
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Página no encontrada
          </h1>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
            La página que buscas no existe o fue movida. Prueba con una de estas opciones:
          </p>
        </motion.div>

        {/* Sugerencias */}
        <motion.div variants={staggerContainer} className="grid grid-cols-2 gap-3 mb-8">
          {sugerencias.map((s) => (
            <motion.div key={s.href} variants={cardItem}>
              <Link
                href={s.href}
                className="block p-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-primary hover:text-primary transition-all hover:-translate-y-0.5"
              >
                {s.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={cardItem}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
