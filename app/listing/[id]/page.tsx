"use client";

import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft, Heart, Share2, MessageCircle, CheckCircle,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import { VerifiedBadge, ConditionBadge } from "@/components/ui/Badge";
import { useFavorites } from "@/hooks/useFavorites";
import { pageTransition, fadeInUp } from "@/lib/animations";
import { apiGet, ApiError } from "@/lib/api";
import type { Listing } from "@/lib/types";

function timeAgo(date: Date): string {
  const secs = Math.floor((Date.now() - date.getTime()) / 1000);
  if (secs < 60) return "hace un momento";
  if (secs < 3600) return `hace ${Math.floor(secs / 60)} min`;
  if (secs < 86400) return `hace ${Math.floor(secs / 3600)} h`;
  return `hace ${Math.floor(secs / 86400)} días`;
}

function DetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-4">
            <div className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-3xl animate-pulse" />
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 space-y-3 border border-gray-100 dark:border-gray-800">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-full animate-pulse" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-5/6 animate-pulse" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-4/6 animate-pulse" />
            </div>
          </div>
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 space-y-4 border border-gray-100 dark:border-gray-800">
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-3/4 animate-pulse" />
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-2/3 animate-pulse" />
              <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded-full w-1/3 animate-pulse" />
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse" />
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse" />
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-5 space-y-3 border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-2/3 animate-pulse" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full w-1/2 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PublicacionPage() {
  const params = useParams<{ id: string }>();
  const { isFavorite, toggle } = useFavorites();
  const [publicacion, setPublicacion] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);
  const [imgIdx, setImgIdx] = useState(0);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    apiGet<Listing>(`/api/listings/${params.id}`)
      .then((data) => setPublicacion(data))
      .catch((err) => {
        if (err instanceof ApiError && err.status === 404) setMissing(true);
      })
      .finally(() => setLoading(false));
  }, [params.id]);

  if (missing) return notFound();
  if (loading) return <DetailSkeleton />;
  if (!publicacion) return null;

  const images = publicacion.images?.map((img) => img.url) ?? [publicacion.imageUrl ?? ""];
  const multipleImages = images.length > 1;

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: publicacion.title, url: window.location.href });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  const prevImg = () => setImgIdx((i) => (i === 0 ? images.length - 1 : i - 1));
  const nextImg = () => setImgIdx((i) => (i === images.length - 1 ? 0 : i + 1));

  const contactUrl = `/messages?vendedor=${publicacion.seller.id}&listing=${publicacion.id}`;

  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <Link
          href="/feed"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Volver al feed
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* ── LEFT COLUMN ────────────────────────────────────────── */}
          <div className="lg:col-span-3 space-y-4">

            {/* Title — mobile only (hidden on lg, shown in right col on desktop) */}
            <div className="lg:hidden">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white leading-snug">
                {publicacion.title}
              </h1>
              <p className="text-2xl font-black text-cyan-500 mt-1">
                Q{publicacion.price.toLocaleString()}
              </p>
            </div>

            {/* Image gallery */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800">
              <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 group">
                <Image
                  src={images[imgIdx]}
                  alt={publicacion.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />

                {/* Image counter badge */}
                {multipleImages && (
                  <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
                    {imgIdx + 1} / {images.length}
                  </div>
                )}

                {/* Prev / next — always visible on mobile, hover-only on desktop */}
                {multipleImages && (
                  <>
                    <button
                      onClick={prevImg}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronLeft className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                    </button>
                    <button
                      onClick={nextImg}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronRight className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                    </button>

                    {/* Dot indicators */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setImgIdx(i)}
                          className={`h-1.5 rounded-full transition-all ${i === imgIdx ? "bg-white w-4" : "bg-white/50 w-1.5"}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnail strip */}
              {multipleImages && (
                <div className="flex gap-2 p-3">
                  {images.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIdx(i)}
                      className={`relative w-16 h-12 rounded-xl overflow-hidden border-2 transition-all ${
                        i === imgIdx
                          ? "border-cyan-500 scale-105"
                          : "border-transparent hover:border-gray-300 dark:hover:border-gray-600"
                      }`}
                    >
                      <Image src={src} alt="" fill className="object-cover" sizes="64px" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Description card */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-6"
            >
              <h2 className="font-semibold text-gray-900 dark:text-white mb-3">Descripción</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {publicacion.description}
              </p>

              <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center text-xs border border-cyan-200 dark:border-cyan-800 text-cyan-600 dark:text-cyan-400 px-2.5 py-1 rounded-full">
                  {publicacion.category.name}
                </span>
                <ConditionBadge condition={publicacion.itemCondition} size="sm" />
                <span className="text-xs text-gray-400">
                  · {timeAgo(new Date(publicacion.publishedAt))}
                </span>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN ───────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-4">

            {/* Price + actions — sticky on desktop */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-6 lg:sticky lg:top-24 lg:z-10">

              {/* Title + price — desktop only */}
              <div className="hidden lg:block mb-5">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white leading-snug mb-2">
                  {publicacion.title}
                </h1>
                <p className="text-3xl font-black text-cyan-500">
                  Q{publicacion.price.toLocaleString()}
                </p>
              </div>

              {/* Primary CTA */}
              <Link
                href={contactUrl}
                className="flex w-full items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-semibold py-3 rounded-2xl transition-colors text-sm mb-3"
              >
                <MessageCircle className="w-4 h-4" />
                Contactar vendedor
              </Link>

              {/* Secondary actions */}
              <div className="flex gap-2 mb-5">
                <button
                  onClick={() => toggle(String(publicacion.id))}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl border text-sm font-medium transition-colors ${
                    isFavorite(String(publicacion.id))
                      ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-500"
                      : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-red-300 hover:text-red-500"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorite(String(publicacion.id)) ? "fill-red-500" : ""}`} />
                  {isFavorite(String(publicacion.id)) ? "Guardado" : "Guardar"}
                </button>
                <button
                  onClick={handleShare}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:border-cyan-400 hover:text-cyan-500 transition-colors"
                >
                  {shared
                    ? <><CheckCircle className="w-4 h-4 text-emerald-500" /> Copiado</>
                    : <><Share2 className="w-4 h-4" /> Compartir</>
                  }
                </button>
              </div>

              {/* Safety tip */}
              <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-100 dark:border-amber-800 text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                💡 Siempre realiza la transacción en persona dentro del campus universitario.
              </div>
            </div>

            {/* Seller card */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-5">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                Vendedor
              </h3>

              <Link href={`/profile/${publicacion.seller.id}`} className="flex items-center gap-3 group">
                <div className="w-14 h-14 rounded-full ring-2 ring-cyan-500/30 bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {publicacion.seller.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {publicacion.seller.name}
                  </p>
                  <VerifiedBadge university={publicacion.seller.university} size="xs" />
                </div>
              </Link>

              <Link
                href={`/profile/${publicacion.seller.id}`}
                className="mt-4 flex w-full items-center justify-center py-2 rounded-2xl border border-cyan-200 dark:border-cyan-800 text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-colors"
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
