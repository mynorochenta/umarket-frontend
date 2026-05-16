"use client";

import Link from "next/link";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { PublicacionCard } from "@/components/ui/PublicacionCard";
import { useFavorites } from "@/hooks/useFavorites";
import { listings } from "@/lib/mock-data";
import { pageTransition, staggerContainer } from "@/lib/animations";

export default function FavoritosPage() {
  const { favorites, isFavorite, toggle } = useFavorites();
  const favs = listings.filter((p) => favorites.includes(String(p.id)));

  return (
    <ProtectedRoute>
    <motion.div variants={pageTransition} initial="initial" animate="animate" className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <Heart className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Favoritos</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{favs.length} guardados</p>
          </div>
        </div>

        {favs.length === 0 ? (
          <div className="text-center py-24">
            <Heart className="w-12 h-12 text-gray-200 dark:text-gray-700 mx-auto mb-4" />
            <p className="text-gray-900 dark:text-white font-semibold mb-2">Aún no tienes favoritos</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Guarda publicaciones que te interesen para encontrarlas fácilmente.</p>
            <Link href="/feed" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-5 py-2.5 rounded-xl text-sm">
              Explorar publicaciones
            </Link>
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {favs.map((p) => (
              <PublicacionCard key={p.id} publicacion={p} isFavorite={isFavorite(String(p.id))} onToggleFavorite={toggle} />
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
    </ProtectedRoute>
  );
}
