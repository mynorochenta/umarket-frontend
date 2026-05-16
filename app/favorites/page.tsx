"use client";
import Link from "next/link";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { PublicacionCard } from "@/components/ui/PublicacionCard";
import { useFavorites } from "@/hooks/useFavorites";
import { listings } from "@/lib/mock-data";
import { pageTransition, staggerContainer, cardItem } from "@/lib/animations";

export default function FavoritesPage() {
  const { favorites, isFavorite, toggle } = useFavorites();
  const favs = listings.filter((p) => favorites.includes(String(p.id)));

  return (
    <ProtectedRoute>
      <motion.div
        variants={pageTransition}
        initial="initial"
        animate="animate"
        className="min-h-screen bg-gray-50 dark:bg-gray-950"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <Heart className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Favoritos</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {favs.length} {favs.length === 1 ? "guardado" : "guardados"}
                </p>
              </div>
            </div>
          </div>

          {favs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center py-24"
            >
              <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800/60 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-gray-300 dark:text-gray-600" />
              </div>
              <p className="text-gray-900 dark:text-white font-semibold mb-2">
                Aún no tienes favoritos
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 max-w-xs mx-auto">
                Guarda publicaciones que te interesen para encontrarlas fácilmente.
              </p>
              <Link
                href="/feed"
                className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
              >
                Explorar publicaciones
              </Link>
            </motion.div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              <AnimatePresence mode="popLayout">
                {favs.map((p) => (
                  <motion.div
                    key={p.id}
                    variants={cardItem}
                    exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.2 } }}
                    layout
                  >
                    <PublicacionCard
                      publicacion={p}
                      isFavorite={isFavorite(String(p.id))}
                      onToggleFavorite={toggle}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </motion.div>
    </ProtectedRoute>
  );
}
