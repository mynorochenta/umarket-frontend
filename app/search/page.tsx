"use client";

import { useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, ArrowLeft } from "lucide-react";
import { PublicacionCard } from "@/components/ui/PublicacionCard";
import { SearchBar } from "@/components/ui/SearchBar";
import { useFavorites } from "@/hooks/useFavorites";
import { listings } from "@/lib/mock-data";
import { staggerContainer, pageTransition } from "@/lib/animations";

function BuscarInner() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const { isFavorite, toggle } = useFavorites();

  const resultados = useMemo(() => {
    if (!q.trim()) return [];
    const lower = q.toLowerCase();
    return listings.filter(
      (p) =>
        p.title.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower) ||
        p.category.name.toLowerCase().includes(lower) ||
        p.seller.university.toLowerCase().includes(lower) ||
        p.seller.name.toLowerCase().includes(lower)
    );
  }, [q]);

  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/feed" className="w-9 h-9 rounded-xl flex items-center justify-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary transition-colors">
            <ArrowLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </Link>
          <SearchBar className="flex-1 max-w-xl" />
        </div>

        {q ? (
          <>
            <div className="mb-6">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {resultados.length > 0
                  ? `${resultados.length} resultado${resultados.length !== 1 ? "s" : ""} para "${q}"`
                  : `Sin resultados para "${q}"`}
              </h1>
            </div>

            {resultados.length > 0 ? (
              <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              >
                {resultados.map((p) => (
                  <PublicacionCard key={p.id} publicacion={p} isFavorite={isFavorite(String(p.id))} onToggleFavorite={toggle} />
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-24">
                <div className="w-16 h-16 rounded-2xl bg-gray-200 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-7 h-7 text-gray-400" />
                </div>
                <p className="text-gray-900 dark:text-white font-semibold mb-2">No encontramos resultados</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Intenta con otras palabras o explora las categorías</p>
                <Link href="/feed" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-5 py-2.5 rounded-xl text-sm">
                  Explorar todo
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-24">
            <Search className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Escribe algo para buscar publicaciones</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function BuscarPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 dark:bg-gray-950" />}>
      <BuscarInner />
    </Suspense>
  );
}
