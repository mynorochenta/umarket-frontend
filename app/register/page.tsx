"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, Lock, User, CheckCircle, AlertCircle, ArrowRight,
  Eye, EyeOff, ShieldCheck,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { apiPost } from "@/lib/api";
import { fadeInUp } from "@/lib/animations";

const inputCls =
  "w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 " +
  "focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all";

function EduBadge({ email }: { email: string }) {
  const valid = email.includes(".edu") && email.includes("@");
  const hasAt = email.includes("@");
  if (!hasAt || email.split("@")[0].length < 2) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className={`flex items-center gap-1.5 mt-1.5 text-xs ${
          valid ? "text-emerald-400" : "text-red-400"
        }`}
      >
        {valid ? <CheckCircle className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
        {valid ? "Email universitario válido ✓" : "Necesitas un email con dominio .edu"}
      </motion.div>
    </AnimatePresence>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEduEmail = email.includes("@") && email.includes(".edu");
  const canSubmit = name && isEduEmail && password.length >= 8;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setError("");
    setLoading(true);
    try {
      await apiPost("/api/users/register", { name, email, password });
      router.push("/verify-email");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al crear la cuenta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12 bg-white dark:bg-[#0A0F1E] dark:[background-image:radial-gradient(circle_at_1px_1px,rgba(6,182,212,0.08)_1px,transparent_0)] dark:[background-size:32px_32px]"
    >
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl p-8">

          {/* Logo + tagline */}
          <div className="flex flex-col items-center text-center mb-8">
            <Logo size="md" href="/" />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">El marketplace de tu universidad</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Nombre completo
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Ana González"
                  className={`${inputCls} pl-10 pr-4 py-3`}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Email universitario
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="ana.gonzalez@uvg.edu.gt"
                  className={`${inputCls} pl-10 pr-4 py-3`}
                />
              </div>
              <EduBadge email={email} />
            </div>

            {/* Contraseña */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  placeholder="Mínimo 8 caracteres"
                  className={`${inputCls} pl-10 pr-10 py-3`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {/* Strength bar */}
              {password && (
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3].map((level) => (
                    <div
                      key={level}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        password.length >= level * 4
                          ? level === 1
                            ? "bg-red-500"
                            : level === 2
                            ? "bg-amber-400"
                            : "bg-emerald-500"
                          : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-400 text-sm bg-red-900/20 border border-red-800 rounded-xl px-3 py-2">
                {error}
              </p>
            )}

            <p className="text-xs text-gray-500 dark:text-gray-600">
              Al registrarte aceptas nuestros{" "}
              <a href="#" className="text-cyan-600 hover:text-cyan-500 transition-colors">términos de uso</a>
              {" "}y{" "}
              <a href="#" className="text-cyan-600 hover:text-cyan-500 transition-colors">política de privacidad</a>.
            </p>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={!canSubmit || loading}
              whileHover={{ scale: canSubmit ? 1.01 : 1 }}
              whileTap={{ scale: canSubmit ? 0.98 : 1 }}
              className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-semibold py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
              ) : (
                <>
                  Crear cuenta
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>

            {/* Trust line */}
            <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-600" />
              Tu correo .edu verifica que eres estudiante
            </div>
          </form>

          <p className="mt-5 text-center text-sm text-gray-500 dark:text-gray-500">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="text-cyan-500 font-semibold hover:text-cyan-400 transition-colors">
              Inicia sesión
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
