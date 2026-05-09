"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, CheckCircle, RefreshCw, ArrowRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { fadeInUp, staggerContainer, cardItem } from "@/lib/animations";

const pasos = [
  {
    num: 1,
    titulo: "Revisa tu email",
    desc: "Te enviamos un enlace de verificación a tu correo universitario.",
    icon: Mail,
    done: true,
  },
  {
    num: 2,
    titulo: "Haz click en el enlace",
    desc: "Abre el email y haz click en \"Verificar mi cuenta\".",
    icon: CheckCircle,
    done: false,
  },
  {
    num: 3,
    titulo: "¡Listo para comprar!",
    desc: "Una vez verificado, podrás publicar y contactar vendedores.",
    icon: ArrowRight,
    done: false,
  },
];

export default function VerificarEmailPage() {
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);

  const handleResend = async () => {
    setResending(true);
    await new Promise((r) => setTimeout(r, 1500));
    setResending(false);
    setResent(true);
    setTimeout(() => setResent(false), 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-16">
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="w-full max-w-md text-center"
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo size="md" />
        </div>

        {/* Icono animado */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
          className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/25"
        >
          <Mail className="w-9 h-9 text-white" />
        </motion.div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Verifica tu email
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
          Enviamos un enlace de confirmación a tu correo universitario.
          Revisa tu bandeja de entrada y spam.
        </p>

        {/* Pasos */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 text-left space-y-4 mb-8"
        >
          {pasos.map((paso) => (
            <motion.div key={paso.num} variants={cardItem} className="flex gap-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  paso.done
                    ? "bg-primary text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-400"
                }`}
              >
                <paso.icon className="w-4 h-4" />
              </div>
              <div>
                <p
                  className={`text-sm font-semibold ${
                    paso.done
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                >
                  {paso.titulo}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                  {paso.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Acciones */}
        <div className="space-y-3">
          {resent ? (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-medium"
            >
              <CheckCircle className="w-4 h-4" />
              Email reenviado correctamente
            </motion.div>
          ) : (
            <button
              onClick={handleResend}
              disabled={resending}
              className="w-full flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-60"
            >
              <RefreshCw
                className={`w-4 h-4 ${resending ? "animate-spin" : ""}`}
              />
              {resending ? "Reenviando..." : "Reenviar email"}
            </button>
          )}

          <Link
            href="/feed"
            className="flex items-center justify-center gap-2 bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary-dark transition-colors text-sm"
          >
            Ir al feed
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <p className="mt-6 text-xs text-gray-400">
          ¿Problemas? Escríbenos a{" "}
          <a href="mailto:soporte@umarket.gt" className="text-primary hover:underline">
            soporte@umarket.gt
          </a>
        </p>
      </motion.div>
    </div>
  );
}
