"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { useAuth } from "@/context/AuthContext";
import { slideInLeft, slideInRight, fadeInUp } from "@/lib/animations";

const CIRCLES = [
  { width: 120, height: 120, top: "5%",  left: "10%" },
  { width:  80, height:  80, top: "15%", left: "70%" },
  { width: 150, height: 150, top: "25%", left: "40%" },
  { width:  60, height:  60, top: "35%", left: "85%" },
  { width: 100, height: 100, top: "45%", left: "20%" },
  { width: 140, height: 140, top: "55%", left: "60%" },
  { width:  70, height:  70, top: "65%", left: "5%"  },
  { width:  90, height:  90, top: "75%", left: "75%" },
  { width: 110, height: 110, top: "85%", left: "35%" },
  { width:  50, height:  50, top: "92%", left: "90%" },
  { width: 130, height: 130, top: "8%",  left: "55%" },
  { width:  75, height:  75, top: "20%", left: "25%" },
  { width: 160, height: 160, top: "38%", left: "78%" },
  { width:  55, height:  55, top: "50%", left: "48%" },
  { width:  95, height:  95, top: "60%", left: "15%" },
  { width: 115, height: 115, top: "70%", left: "65%" },
  { width:  85, height:  85, top: "80%", left: "30%" },
  { width: 145, height: 145, top: "12%", left: "88%" },
  { width:  65, height:  65, top: "42%", left: "3%"  },
  { width: 105, height: 105, top: "90%", left: "52%" },
];

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
    <div className="min-h-screen flex">
      {/* Panel izquierdo — decorativo */}
      <motion.div
        variants={slideInLeft}
        initial="initial"
        animate="animate"
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary-dark to-accent relative overflow-hidden items-center justify-center"
      >
        <div className="absolute inset-0 opacity-10">
          {CIRCLES.map((c, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: c.width,
                height: c.height,
                top: c.top,
                left: c.left,
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </div>
        <div className="relative text-center text-white px-12">
          <h2 className="text-4xl font-black mb-4">
            Bienvenido de vuelta 👋
          </h2>
          <p className="text-white/80 text-lg leading-relaxed max-w-sm mx-auto">
            Conecta con estudiantes de tu universidad y encuentra lo que necesitas.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4 max-w-xs mx-auto text-center">
            {[
              { n: "42+", l: "publicaciones" },
              { n: "15+", l: "vendedores" },
              { n: "8", l: "universidades" },
            ].map((s) => (
              <div key={s.l}>
                <p className="text-3xl font-black">{s.n}</p>
                <p className="text-white/70 text-xs">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Panel derecho — formulario */}
      <motion.div
        variants={slideInRight}
        initial="initial"
        animate="animate"
        className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-white dark:bg-gray-950"
      >
        <div className="w-full max-w-md">
          <div className="mb-8 flex justify-center lg:justify-start">
            <Logo size="md" />
          </div>

          <motion.div variants={fadeInUp} initial="initial" animate="animate">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              Iniciar sesión
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Usa tu email universitario para entrar
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Email universitario
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="tu.nombre@uvg.edu.gt"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* Contraseña */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Contraseña
                  </label>
                  <a href="#" className="text-xs text-primary hover:underline">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
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
                  className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-3 py-2"
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
                className="w-full flex items-center justify-center gap-2 bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Iniciar sesión
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
              ¿No tienes cuenta?{" "}
              <Link href="/registro" className="text-primary font-semibold hover:underline">
                Regístrate gratis
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
