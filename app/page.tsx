"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  BookOpen, Laptop, Shirt, Dumbbell, Home, Palette,
  Music, Bike, Briefcase, FileText, UtensilsCrossed, Package,
  ShieldCheck, ArrowRight, Star, Zap, Users, ShoppingBag,
} from "lucide-react";
import { PublicacionCard } from "@/components/ui/PublicacionCard";
import { useFavorites } from "@/hooks/useFavorites";
import { featuredListings, universities } from "@/lib/mock-data";
import { staggerContainer, cardItem, revealSection } from "@/lib/animations";

const categoriasData = [
  { nombre: "Libros", icon: BookOpen, color: "bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400" },
  { nombre: "Electrónica", icon: Laptop, color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" },
  { nombre: "Ropa", icon: Shirt, color: "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400" },
  { nombre: "Deportes", icon: Dumbbell, color: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" },
  { nombre: "Hogar", icon: Home, color: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400" },
  { nombre: "Arte", icon: Palette, color: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400" },
  { nombre: "Música", icon: Music, color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400" },
  { nombre: "Transporte", icon: Bike, color: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400" },
  { nombre: "Servicios", icon: Briefcase, color: "bg-lime-100 dark:bg-lime-900/30 text-lime-600 dark:text-lime-400" },
  { nombre: "Apuntes", icon: FileText, color: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400" },
  { nombre: "Comida", icon: UtensilsCrossed, color: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400" },
  { nombre: "Otros", icon: Package, color: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400" },
];

const stats = [
  { icon: ShoppingBag, value: "42+", label: "Publicaciones activas" },
  { icon: Users, value: "15+", label: "Vendedores verificados" },
  { icon: ShieldCheck, value: "8", label: "Universidades" },
  { icon: Star, value: "4.8", label: "Calificación promedio" },
];

function RevealSection({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      variants={revealSection}
      initial="initial"
      animate={inView ? "animate" : "initial"}
      id={id}
    className={className}
    >
      {children}
    </motion.section>
  );
}

export default function LandingPage() {
  const { isFavorite, toggle } = useFavorites();

  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-light dark:from-gray-950 dark:via-gray-900 dark:to-gray-900">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-primary-light dark:bg-primary/20 text-primary rounded-full text-sm font-medium px-4 py-1.5 mb-6"
            >
              <Zap className="w-3.5 h-3.5" />
              Solo para estudiantes verificados
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 dark:text-white leading-tight mb-5"
            >
              El marketplace
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                universitario
              </span>
              de Guatemala
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto leading-relaxed"
            >
              Compra y vende con confianza entre estudiantes de tu universidad.
              Todos los usuarios son verificados con email{" "}
              <span className="text-primary font-semibold">.edu</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <Link
                href="/feed"
                className="flex items-center justify-center gap-2 bg-primary text-white font-semibold px-6 py-3.5 rounded-2xl hover:bg-primary-dark transition-colors text-base shadow-lg shadow-primary/25"
              >
                Explorar publicaciones
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/register"
                className="flex items-center justify-center gap-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold px-6 py-3.5 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700"
              >
                Crear cuenta gratis
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400"
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-primary" />
                100% verificado
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-accent" />
                Gratis para publicar
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────────────────────── */}
      <RevealSection className="bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map(({ icon: Icon, value, label }) => (
              <motion.div key={label} variants={cardItem} className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-primary-light dark:bg-primary/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-2xl font-black text-gray-900 dark:text-white">{value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </RevealSection>

      {/* ── CATEGORÍAS ─────────────────────────────────────────────────────── */}
      <RevealSection className="py-16 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Explora por categoría</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Encuentra exactamente lo que necesitas</p>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3"
          >
            {categoriasData.map(({ nombre, icon: Icon, color }) => (
              <motion.div key={nombre} variants={cardItem}>
                <Link
                  href={`/feed?categoria=${encodeURIComponent(nombre)}`}
                  className="flex flex-col items-center gap-2.5 p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-primary hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center leading-tight">{nombre}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </RevealSection>

      {/* ── PUBLICACIONES DESTACADAS ───────────────────────────────────────── */}
      <RevealSection className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Publicaciones destacadas</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Lo más popular entre estudiantes</p>
            </div>
            <Link href="/feed" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              Ver todo <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {featuredListings.slice(0, 8).map((p) => (
              <PublicacionCard key={p.id} publicacion={p} isFavorite={isFavorite(String(p.id))} onToggleFavorite={toggle} />
            ))}
          </motion.div>
          <div className="mt-8 flex justify-center sm:hidden">
            <Link href="/feed" className="flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-2xl text-sm">
              Ver más <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </RevealSection>

      {/* ── CÓMO FUNCIONA ──────────────────────────────────────────────────── */}
      <RevealSection id="como-funciona" className="py-16 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">¿Cómo funciona?</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Tres pasos para comprar o vender con confianza</p>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { num: "01", titulo: "Regístrate con tu .edu", desc: "Crea tu cuenta con tu email universitario. Solo estudiantes verificados pueden acceder.", color: "from-primary to-primary-dark" },
              { num: "02", titulo: "Publica o explora", desc: "Sube lo que ya no necesitas o encuentra lo que buscas entre estudiantes de tu uni.", color: "from-accent to-accent-dark" },
              { num: "03", titulo: "Conecta y negocia", desc: "Chatea con vendedores verificados y cierra el trato de forma segura.", color: "from-emerald-500 to-emerald-700" },
            ].map((step) => (
              <motion.div key={step.num} variants={cardItem} className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-7 text-center hover:shadow-lg transition-shadow">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-5`}>
                  <span className="text-white font-black text-lg">{step.num}</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{step.titulo}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </RevealSection>

      {/* ── UNIVERSIDADES ──────────────────────────────────────────────────── */}
      <RevealSection id="universidades" className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Universidades verificadas</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-10">Estudiantes de estas universidades ya están en UMarket</p>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {universities.map((uni) => (
              <motion.div key={uni.id} variants={cardItem} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 hover:border-primary/40 transition-colors">
                <div className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center text-white font-black text-sm" style={{ backgroundColor: uni.color }}>
                  {uni.shortName.slice(0, 2)}
                </div>
                <p className="text-xs font-semibold text-gray-900 dark:text-white">{uni.shortName}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{uni.studentCount.toLocaleString()} estudiantes</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </RevealSection>

      {/* ── CTA FINAL ──────────────────────────────────────────────────────── */}
      <RevealSection className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary via-primary-dark to-accent rounded-3xl p-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="absolute w-32 h-32 rounded-full bg-white" style={{ top: `${(i * 23) % 100}%`, left: `${(i * 37) % 100}%`, transform: "translate(-50%,-50%)" }} />
              ))}
            </div>
            <div className="relative">
              <h2 className="text-3xl font-black text-white mb-3">¿Listo para unirte?</h2>
              <p className="text-white/80 mb-7 max-w-md mx-auto">Regístrate con tu email universitario y empieza a comprar y vender en minutos.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/register" className="flex items-center justify-center gap-2 bg-white text-primary font-bold px-6 py-3 rounded-2xl hover:bg-gray-50 transition-colors text-sm">
                  Crear cuenta gratis <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/feed" className="flex items-center justify-center gap-2 bg-white/10 text-white font-semibold px-6 py-3 rounded-2xl hover:bg-white/20 transition-colors text-sm border border-white/20">
                  Explorar primero
                </Link>
              </div>
            </div>
          </div>
        </div>
      </RevealSection>
    </div>
  );
}
