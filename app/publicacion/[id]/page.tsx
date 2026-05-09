"use client";

import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft, Heart, Share2, Eye, MessageSquare, CheckCircle, ChevronLeft, ChevronRight,
} from "lucide-react";
import { VerifiedBadge, CondicionBadge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { useFavorites } from "@/hooks/useFavorites";
import { pageTransition, fadeInUp } from "@/lib/animations";
import { apiGet, ApiError } from "@/lib/api";
import type { Publicacion } from "@/lib/types";
import { SkeletonGrid } from "@/components/ui/SkeletonCard";

function timeAgo(date: Date): string {
  const secs = Math.floor((Date.now() - date.getTime()) / 1000);
  if (secs < 60) return "hace un momento";
  if (secs < 3600) return `hace ${Math.floor(secs / 60)} min`;
  if (secs < 86400) return `hace ${Math.floor(secs / 3600)} h`;
  return `hace ${Math.floor(secs / 86400)} días`;
}

export default function PublicacionPage() {
  const params = useParams<{ id: string }>();
  const { isFavorite, toggle } = useFavorites();
  const [publicacion, setPublicacion] = useState<Publicacion | null>(null);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);
  const [imgIdx, setImgIdx] = useState(0);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    apiGet<Publicacion>(`/api/publicaciones/${params.id}`)
      .then((data) => {
        setPublicacion({
          ...data,
          creadoEn: new Date(data.creadoEn),
          vendedor: { ...data.vendedor, joinedAt: new Date(data.vendedor.joinedAt) },
        });
      })
      .catch((err) => {
        if (err instanceof ApiError && err.status === 404) setMissing(true);
      })
      .finally(() => setLoading(false));
  }, [params.id]);

  if (missing) return notFound();
  if (loading) return <SkeletonGrid count={6} />;
  if (!publicacion) return null;

  const resenas: import("@/lib/types").Resena[] = [];

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: publicacion.titulo, url: window.location.href });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  const prevImg = () => setImgIdx((i) => (i === 0 ? publicacion.imagenes.length - 1 : i - 1));
  const nextImg = () => setImgIdx((i) => (i === publicacion.imagenes.length - 1 ? 0 : i + 1));

  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back */}
        <Link href="/feed" className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Volver al feed
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* ── IZQUIERDA: fotos + info ─────────────────────────────────── */}
          <div className="lg:col-span-3 space-y-6">
            {/* Carrusel */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800">
              <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-800 group">
                <Image src={publicacion.imagenes[imgIdx]} alt={publicacion.titulo} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 60vw" priority />

                {publicacion.imagenes.length > 1 && (
                  <>
                    <button onClick={prevImg} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronLeft className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                    </button>
                    <button onClick={nextImg} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {publicacion.imagenes.map((_, i) => (
                        <button key={i} onClick={() => setImgIdx(i)} className={`w-1.5 h-1.5 rounded-full transition-all ${i === imgIdx ? "bg-white w-4" : "bg-white/50"}`} />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {publicacion.imagenes.length > 1 && (
                <div className="flex gap-2 p-3">
                  {publicacion.imagenes.map((src, i) => (
                    <button key={i} onClick={() => setImgIdx(i)} className={`relative w-16 h-12 rounded-xl overflow-hidden border-2 transition-all ${i === imgIdx ? "border-primary" : "border-transparent hover:border-gray-300"}`}>
                      <Image src={src} alt="" fill className="object-cover" sizes="64px" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Descripción */}
            <motion.div variants={fadeInUp} initial="initial" animate="animate" className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-6">
              <h2 className="font-semibold text-gray-900 dark:text-white mb-3">Descripción</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{publicacion.descripcion}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2.5 py-1 rounded-full">
                  {publicacion.categoria}
                </span>
                <CondicionBadge condicion={publicacion.condicion} size="sm" />
                <VerifiedBadge universidad={publicacion.universidadNombre} size="sm" />
              </div>

              <div className="flex items-center gap-4 mt-4 text-xs text-gray-400">
                <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{publicacion.vistas} vistas</span>
                <span>{timeAgo(publicacion.creadoEn)}</span>
              </div>
            </motion.div>

            {/* Reseñas del vendedor */}
            {resenas.length > 0 && (
              <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-6">
                <h2 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Reseñas del vendedor ({resenas.length})
                </h2>
                <div className="space-y-4">
                  {resenas.map((r) => (
                    <div key={r.id} className="flex gap-3">
                      <Image src={r.autor.avatar} alt={r.autor.nombre} width={36} height={36} className="rounded-full flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{r.autor.nombre}</p>
                          <StarRating rating={r.calificacion} size="xs" />
                          <span className="text-xs text-gray-400">{timeAgo(r.creadoEn)}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{r.comentario}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── DERECHA: precio + acciones + vendedor ──────────────────── */}
          <div className="lg:col-span-2 space-y-4">
            {/* Precio + acciones */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-6 sticky top-24">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-snug">
                {publicacion.titulo}
              </h1>
              <p className="text-3xl font-black text-primary mb-4">
                Q{publicacion.precio.toLocaleString()}
              </p>

              <div className="flex gap-2 mb-5">
                <Link
                  href={`/mensajes/c1`}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary-dark transition-colors text-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  Contactar vendedor
                </Link>
                <button
                  onClick={() => toggle(publicacion.id)}
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-colors ${
                    isFavorite(publicacion.id)
                      ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                      : "border-gray-200 dark:border-gray-700 hover:border-red-300"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite(publicacion.id) ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
                </button>
                <button
                  onClick={handleShare}
                  className="w-12 h-12 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:border-primary transition-colors relative"
                >
                  {shared ? <CheckCircle className="w-5 h-5 text-emerald-500" /> : <Share2 className="w-5 h-5 text-gray-400" />}
                </button>
              </div>

              {shared && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-center text-emerald-600 dark:text-emerald-400 -mt-2 mb-3">
                  ¡Enlace copiado!
                </motion.p>
              )}

              <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-800 text-xs text-amber-700 dark:text-amber-400">
                💡 Siempre realiza la transacción en persona dentro del campus universitario.
              </div>
            </div>

            {/* Tarjeta vendedor */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-5">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Vendedor</h3>
              <Link href={`/perfil/${publicacion.vendedor.id}`} className="flex items-center gap-3 group">
                <Image src={publicacion.vendedor.avatar} alt={publicacion.vendedor.nombre} width={48} height={48} className="rounded-2xl" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                    {publicacion.vendedor.nombre}
                  </p>
                  <VerifiedBadge universidad={publicacion.vendedor.universidadCorto} size="xs" />
                </div>
              </Link>

              <div className="flex items-center gap-3 mt-3 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <StarRating rating={publicacion.vendedor.calificacion} size="xs" />
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    {publicacion.vendedor.calificacion}
                  </span>
                </div>
                <span className="text-xs">·</span>
                <span className="text-xs">{publicacion.vendedor.resenasCount} reseñas</span>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">{publicacion.vendedor.bio}</p>

              <Link
                href={`/perfil/${publicacion.vendedor.id}`}
                className="mt-3 block text-center text-xs font-medium text-primary hover:underline"
              >
                Ver perfil completo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
