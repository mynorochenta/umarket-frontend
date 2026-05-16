"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, GraduationCap, ArrowRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { useAuth } from "@/context/AuthContext";
import { fadeInUp } from "@/lib/animations";

const inputCls =
  "w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 " +
  "focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.endsWith(".edu") && !email.includes(".edu.")) {
      setError("Debes usar tu email universitario (.edu)");
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      router.push("/feed");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Credenciales incorrectas");
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

          {/* Info line */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
            <GraduationCap className="w-4 h-4 text-cyan-500 flex-shrink-0" />
            Usa tu correo universitario .edu para acceder
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

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
                  placeholder="tu.nombre@uvg.edu.gt"
                  className={`${inputCls} pl-10 pr-4 py-3`}
                />
              </div>
            </div>

            {/* Contraseña */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-medium text-gray-300">Contraseña</label>
                <span className="text-xs text-gray-500 dark:text-gray-600">
                  <a href="#" className="hover:text-gray-400 transition-colors">
                    ¿Olvidaste tu contraseña?
                  </a>{" "}
                  (próximamente)
                </span>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
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
            </div>

            {/* Error */}
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm bg-red-900/20 border border-red-800 rounded-xl px-3 py-2"
              >
                {error}
              </motion.p>
            )}

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-semibold py-3 rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
              ) : (
                <>
                  Iniciar sesión
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            ¿No tienes cuenta?{" "}
            <Link href="/register" className="text-cyan-500 font-semibold hover:text-cyan-400 transition-colors">
              Regístrate gratis
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
