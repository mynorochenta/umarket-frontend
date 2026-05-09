"use client";

import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageSquare, Calendar, ShoppingBag } from "lucide-react";
import { VerifiedBadge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { PublicacionCard } from "@/components/ui/PublicacionCard";
import { useFavorites } from "@/hooks/useFavorites";
import { getUsuario, getPublicacionesPorVendedor, getResenasPorDestinatario } from "@/lib/mock-data";
import { pageTransition, staggerContainer, cardItem } from "@/lib/animations";

function timeAgo(date: Date): string {
  const months = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24 * 30));
  if (months < 1) return "este mes";
  if (months < 12) return `hace ${months} ${months === 1 ? "mes" : "meses"}`;
  const years = Math.floor(months / 12);
  return `hace ${years} ${years === 1 ? "año" : "años"}`;
}

export default function PerfilPage() {
  const params = useParams<{ id: string }>();
  const usuario = getUsuario(params.id);
  const { isFavorite, toggle } = useFavorites();

  if (!usuario) return notFound();

  const publicacionesActivas = getPublicacionesPorVendedor(params.id);
  const resenas = getResenasPorDestinatario(params.id);

  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header del perfil */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden mb-6">
          {/* Banner */}
          <div className="h-28 bg-gradient-to-r from-primary via-primary-dark to-accent" />
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-12">
              <div className="flex items-end gap-4">
                <div className="relative">
                  <Image src={usuario.avatar} alt={usuario.nombre} width={80} height={80} className="rounded-2xl border-4 border-white dark:border-gray-900 shadow" />
                  {usuario.verified && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="mb-1">
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">{usuario.nombre}</h1>
                  <VerifiedBadge universidad={usuario.universidadNombre} size="sm" />
                </div>
              </div>
              <Link
                href="/mensajes/c1"
                className="flex items-center gap-2 bg-primary text-white font-semibold px-4 py-2.5 rounded-xl text-sm hover:bg-primary-dark transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                Enviar mensaje
              </Link>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 mt-3 max-w-lg">{usuario.bio}</p>

            <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                Miembro {timeAgo(usuario.joinedAt)}
              </div>
              <div className="flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4" />
                {usuario.publicacionesCount} publicaciones
              </div>
              <div className="flex items-center gap-1.5">
                <StarRating rating={usuario.calificacion} size="sm" />
                <span className="font-semibold text-gray-700 dark:text-gray-300">{usuario.calificacion}</span>
                <span className="text-xs">({usuario.resenasCount} reseñas)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Publicaciones */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Publicaciones activas ({publicacionesActivas.length})
            </h2>
            {publicacionesActivas.length > 0 ? (
              <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {publicacionesActivas.map((p) => (
                  <PublicacionCard key={p.id} publicacion={p} isFavorite={isFavorite(p.id)} onToggleFavorite={toggle} />
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                <p className="text-gray-400 text-sm">Este usuario no tiene publicaciones activas</p>
              </div>
            )}
          </div>

          {/* Reseñas */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Reseñas ({resenas.length})
            </h2>
            <div className="space-y-3">
              {resenas.length > 0 ? (
                resenas.map((r) => (
                  <motion.div key={r.id} variants={cardItem} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Image src={r.autor.avatar} alt={r.autor.nombre} width={28} height={28} className="rounded-full" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">{r.autor.nombre}</p>
                        <StarRating rating={r.calificacion} size="xs" />
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{r.comentario}</p>
                  </motion.div>
                ))
              ) : (
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 text-center">
                  <p className="text-gray-400 text-sm">Sin reseñas aún</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
