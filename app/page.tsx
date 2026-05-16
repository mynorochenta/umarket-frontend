"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight, ShieldCheck, GraduationCap, Tag, MessageCircle, MapPin, Zap,
} from "lucide-react";
import { PublicacionCard } from "@/components/ui/PublicacionCard";
import { useFavorites } from "@/hooks/useFavorites";
import { featuredListings } from "@/lib/mock-data";
import { staggerContainer, cardItem, revealSection } from "@/lib/animations";

function RevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      variants={revealSection}
      initial="initial"
      animate={inView ? "animate" : "initial"}
      className={className}
    >
      {children}
    </motion.section>
  );
}

const steps = [
  {
    icon: GraduationCap,
    title: "Regístrate con tu .edu",
    desc: "Crea tu cuenta usando tu correo universitario. Solo estudiantes verificados pueden acceder.",
    color: "bg-cyan-500/10 text-cyan-500",
  },
  {
    icon: Tag,
    title: "Publica lo que tienes",
    desc: "Sube fotos, pon el precio y listo. Tu publicación llega a estudiantes de toda Guatemala.",
    color: "bg-violet-500/10 text-violet-500",
  },
  {
    icon: MessageCircle,
    title: "Conecta y vende",
    desc: "Chatea directamente con compradores verificados y cierra el trato en el campus.",
    color: "bg-emerald-500/10 text-emerald-500",
  },
];

const trustStats = [
  { icon: GraduationCap, value: "16", label: "Universidades de Guatemala" },
  { icon: ShieldCheck, value: "100%", label: "Estudiantes verificados con .edu" },
  { icon: MapPin, value: "GT", label: "Hecho para Guatemala" },
];

export default function LandingPage() {
  const { isFavorite, toggle } = useFavorites();
  const featured = featuredListings.slice(0, 4);

  return (
    <div className="overflow-x-hidden">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center bg-gray-950 overflow-hidden">
        {/* Abstract geometric decoration */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="absolute -top-[10%] -right-[5%] w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute -bottom-[15%] -left-[10%] w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-white/[0.03]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full border border-cyan-500/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-cyan-500/5" />
          <div className="absolute top-[22%] right-[18%] w-2.5 h-2.5 rounded-full bg-cyan-500/50" />
          <div className="absolute top-[65%] left-[12%] w-2 h-2 rounded-full bg-cyan-500/30" />
          <div className="absolute top-[40%] left-[28%] w-1.5 h-1.5 rounded-full bg-cyan-400/25" />
          <div className="absolute top-[75%] right-[30%] w-1 h-1 rounded-full bg-cyan-400/40" />
        </div>

        <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-full text-xs font-semibold px-4 py-1.5 mb-8"
          >
            <Zap className="w-3 h-3" />
            Solo para estudiantes verificados · Guatemala
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.1] mb-6 max-w-3xl"
          >
            Compra y vende entre{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600">
              estudiantes universitarios
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg text-gray-400 mb-10 max-w-xl leading-relaxed"
          >
            Todos los usuarios están verificados con su correo{" "}
            <span className="text-cyan-400 font-semibold">.edu</span>. Compra con confianza, vende más rápido.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link
              href="/feed"
              className="flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-white font-bold px-7 py-4 rounded-2xl transition-colors text-base shadow-lg shadow-cyan-500/20"
            >
              Explorar publicaciones
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/register"
              className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-7 py-4 rounded-2xl transition-colors text-base"
            >
              Publicar algo
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="mt-10 flex flex-wrap items-center gap-5 text-sm text-gray-500"
          >
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-500" />
              <span>100% verificado</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-cyan-500" />
              <span>Gratis para publicar</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <RevealSection className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">¿Cómo funciona?</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Tres pasos para empezar a comprar o vender
            </p>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                variants={cardItem}
                className="relative bg-gray-50 dark:bg-gray-800/50 rounded-3xl border border-gray-100 dark:border-gray-800 p-7 text-center"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 ${step.color}`}>
                  <step.icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase">
                  Paso {i + 1}
                </span>
                <h3 className="font-bold text-gray-900 dark:text-white mt-1 mb-2 text-lg">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {step.desc}
                </p>
                {i < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -right-3 z-10 w-6 h-6 rounded-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 items-center justify-center shadow-sm -translate-y-1/2">
                    <ArrowRight className="w-3 h-3 text-gray-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </RevealSection>

      {/* ── FEATURED LISTINGS ─────────────────────────────────────────────── */}
      <RevealSection className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Publicaciones recientes
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Lo que estudiantes están vendiendo ahora
              </p>
            </div>
            <Link
              href="/feed"
              className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-cyan-500 hover:text-cyan-400 transition-colors"
            >
              Ver todo <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {featured.map((p) => (
              <PublicacionCard
                key={p.id}
                publicacion={p}
                isFavorite={isFavorite(String(p.id))}
                onToggleFavorite={toggle}
              />
            ))}
          </motion.div>
          <div className="mt-8 flex justify-center sm:hidden">
            <Link
              href="/feed"
              className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-6 py-3 rounded-2xl text-sm transition-colors"
            >
              Ver más publicaciones <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </RevealSection>

      {/* ── TRUST BANNER ──────────────────────────────────────────────────── */}
      <RevealSection className="py-16 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center"
          >
            {trustStats.map(({ icon: Icon, value, label }) => (
              <motion.div key={label} variants={cardItem} className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-cyan-500" />
                </div>
                <p className="text-4xl font-black text-gray-900 dark:text-white">{value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[180px] leading-snug">
                  {label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </RevealSection>

      {/* ── CTA FOOTER ────────────────────────────────────────────────────── */}
      <RevealSection className="py-20 bg-gray-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-cyan-500/20 via-gray-900 to-gray-900 border border-cyan-500/20 px-8 py-14 sm:px-14">
            <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                ¿Listo para empezar?
              </h2>
              <p className="text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
                Regístrate gratis con tu correo universitario y empieza a comprar y vender en minutos.
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-white font-bold px-8 py-4 rounded-2xl transition-colors text-base shadow-lg shadow-cyan-500/25"
              >
                Crear cuenta gratis
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </RevealSection>

    </div>
  );
}
