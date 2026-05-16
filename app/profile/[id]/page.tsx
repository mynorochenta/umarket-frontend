"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageSquare, Calendar, ShoppingBag } from "lucide-react";
import { VerifiedBadge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { PublicacionCard } from "@/components/ui/PublicacionCard";
import { useFavorites } from "@/hooks/useFavorites";
import { getUserById, getListingsBySeller, getReviewsByRecipient } from "@/lib/mock-data";
import { pageTransition, staggerContainer, cardItem } from "@/lib/animations";

function timeAgo(date: Date): string {
  const months = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24 * 30));
  if (months < 1) return "este mes";
  if (months < 12) return `hace ${months} ${months === 1 ? "mes" : "meses"}`;
  const years = Math.floor(months / 12);
  return `hace ${years} ${years === 1 ? "año" : "años"}`;
}

function Initials({ name, size = "lg" }: { name: string; size?: "lg" | "sm" }) {
  const initial = name.trim().charAt(0).toUpperCase();
  const cls = size === "lg"
    ? "w-20 h-20 rounded-2xl border-4 border-white dark:border-gray-900 shadow text-2xl font-bold"
    : "w-7 h-7 rounded-full text-xs font-bold";
  return (
    <div className={`${cls} bg-primary text-white flex items-center justify-center flex-shrink-0`}>
      {initial}
    </div>
  );
}

export default function ProfilePage() {
  const params = useParams<{ id: string }>();
  const usuario = getUserById(params.id);
  const { isFavorite, toggle } = useFavorites();

  if (!usuario) return notFound();

  const publicacionesActivas = getListingsBySeller(params.id);
  const resenas = getReviewsByRecipient(params.id);

  const listingCount = publicacionesActivas.length;
  const reviewCount = resenas.length;
  const rating = reviewCount > 0
    ? (resenas.reduce((sum, r) => sum + r.rating, 0) / reviewCount).toFixed(1)
    : null;

  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden mb-6">
          <div className="h-28 bg-gradient-to-r from-primary via-primary-dark to-accent" />
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-12">
              <div className="flex items-end gap-4">
                <Initials name={usuario.name} size="lg" />
                <div className="mb-1">
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">{usuario.name}</h1>
                  <VerifiedBadge university={usuario.universityName} size="sm" />
                </div>
              </div>
              <Link
                href={`/messages?sellerId=${usuario.id}`}
                className="flex items-center gap-2 bg-primary text-white font-semibold px-4 py-2.5 rounded-xl text-sm hover:bg-primary-dark transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                Enviar mensaje
              </Link>
            </div>

            <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                Miembro {timeAgo(usuario.joinedAt)}
              </div>
              <div className="flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4" />
                {listingCount} publicaciones
              </div>
              {rating !== null && (
                <div className="flex items-center gap-1.5">
                  <StarRating rating={Number(rating)} size="sm" />
                  <span className="font-semibold text-gray-700 dark:text-gray-300">{rating}</span>
                  <span className="text-xs">({reviewCount} reseñas)</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Publicaciones activas ({listingCount})
            </h2>
            {listingCount > 0 ? (
              <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {publicacionesActivas.map((p) => (
                  <PublicacionCard key={p.id} publicacion={p} isFavorite={isFavorite(String(p.id))} onToggleFavorite={toggle} />
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                <p className="text-gray-400 text-sm">Este vendedor no tiene publicaciones activas</p>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Reseñas ({reviewCount})
            </h2>
            <div className="space-y-3">
              {reviewCount > 0 ? (
                resenas.map((r) => (
                  <motion.div key={r.id} variants={cardItem} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Initials name={r.author.name} size="sm" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">{r.author.name}</p>
                        <StarRating rating={r.rating} size="xs" />
                      </div>
                    </div>
                    {r.comment && <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{r.comment}</p>}
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
