"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid, List, SlidersHorizontal, X, ChevronDown, Loader2,
} from "lucide-react";
import { PublicacionCard } from "@/components/ui/PublicacionCard";
import { SkeletonGrid } from "@/components/ui/SkeletonCard";
import { PriceSlider } from "@/components/ui/PriceSlider";
import { SearchBar } from "@/components/ui/SearchBar";
import { useFavorites } from "@/hooks/useFavorites";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { universidades } from "@/lib/mock-data";
import { staggerContainer, pageTransition } from "@/lib/animations";
import type { Categoria, Condicion, FiltrosFeed, Publicacion } from "@/lib/types";
import { apiGet } from "@/lib/api";

const categorias: Categoria[] = [
  "Libros","Electrónica","Ropa","Deportes","Hogar",
  "Arte","Música","Transporte","Servicios","Apuntes","Comida","Otros",
];

const condiciones: { value: Condicion; label: string }[] = [
  { value: "nuevo", label: "Nuevo" },
  { value: "bueno", label: "Buen estado" },
  { value: "regular", label: "Regular" },
];

const ordenOpciones = [
  { value: "reciente", label: "Más recientes" },
  { value: "precio_asc", label: "Precio: menor a mayor" },
  { value: "precio_desc", label: "Precio: mayor a menor" },
  { value: "popular", label: "Más populares" },
];

function FeedInner() {
  const searchParams = useSearchParams();
  const { isFavorite, toggle } = useFavorites();
  const [vista, setVista] = useState<"grid" | "list">("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);

  const [filtros, setFiltros] = useState<FiltrosFeed>({
    categoria: (searchParams.get("categoria") as Categoria) || undefined,
    orden: "reciente",
    precioMin: 0,
    precioMax: 10000,
  });
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

  useEffect(() => {
    apiGet<Publicacion[]>("/api/listings")
      .then((data) => {
        setPublicaciones(
          data.map((p) => ({
            ...p,
            creadoEn: new Date(p.creadoEn),
            vendedor: { ...p.vendedor, joinedAt: new Date(p.vendedor.joinedAt) },
          }))
        );
      })
      .catch(() => setApiError(true))
      .finally(() => setLoading(false));
  }, []);

  const filtradas = useMemo(() => {
    let result = [...publicaciones];
    if (filtros.categoria) result = result.filter((p) => p.categoria === filtros.categoria);
    if (filtros.universidadId) result = result.filter((p) => p.universidadId === filtros.universidadId);
    if (filtros.condicion) result = result.filter((p) => p.condicion === filtros.condicion);
    result = result.filter((p) => p.precio >= priceRange[0] && p.precio <= priceRange[1]);
    switch (filtros.orden) {
      case "precio_asc": return result.sort((a, b) => a.precio - b.precio);
      case "precio_desc": return result.sort((a, b) => b.precio - a.precio);
      case "popular": return result.sort((a, b) => b.vistas - a.vistas);
      default: return result.sort((a, b) => b.creadoEn.getTime() - a.creadoEn.getTime());
    }
  }, [filtros, priceRange, publicaciones]);

  const { displayed, hasMore, isLoading: loadingMore, sentinelRef } = useInfiniteScroll(filtradas, 12);

  const activeFiltersCount = [
    filtros.categoria, filtros.universidadId, filtros.condicion,
    priceRange[0] > 0 || priceRange[1] < 10000 ? "price" : undefined,
  ].filter(Boolean).length;

  const clearFiltros = () => {
    setFiltros({ orden: "reciente", precioMin: 0, precioMax: 10000 });
    setPriceRange([0, 10000]);
  };

  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {filtros.categoria ?? "Todas las publicaciones"}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              {filtradas.length} resultados
            </p>
          </div>
          <SearchBar className="sm:w-72" compact />
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
          {/* Filtros toggle */}
          <button
            onClick={() => setFiltersOpen((v) => !v)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors flex-shrink-0 ${
              filtersOpen || activeFiltersCount > 0
                ? "bg-primary text-white"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filtros
            {activeFiltersCount > 0 && (
              <span className="bg-white/20 text-xs rounded-full w-4 h-4 flex items-center justify-center">{activeFiltersCount}</span>
            )}
          </button>

          {/* Orden */}
          <div className="relative flex-shrink-0">
            <select
              value={filtros.orden}
              onChange={(e) => setFiltros((f) => ({ ...f, orden: e.target.value as FiltrosFeed["orden"] }))}
              className="appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 rounded-xl pl-3 pr-8 py-2 focus:outline-none focus:border-primary"
            >
              {ordenOpciones.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          </div>

          {/* Chips de categorías */}
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setFiltros((f) => ({ ...f, categoria: f.categoria === cat ? undefined : cat }))}
              className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                filtros.categoria === cat
                  ? "bg-primary text-white"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-primary hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}

          {activeFiltersCount > 0 && (
            <button onClick={clearFiltros} className="flex-shrink-0 flex items-center gap-1 text-xs text-red-500 hover:text-red-600 ml-auto">
              <X className="w-3.5 h-3.5" /> Limpiar
            </button>
          )}
        </div>

        <div className="flex gap-6">
          {/* ── PANEL DE FILTROS (desktop) ─────────────────────────────── */}
          <AnimatePresence>
            {filtersOpen && (
              <motion.aside
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 260 }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.25 }}
                className="hidden lg:block flex-shrink-0 overflow-hidden"
              >
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 space-y-6 sticky top-24 w-[260px]">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Filtros</h3>
                    {activeFiltersCount > 0 && (
                      <button onClick={clearFiltros} className="text-xs text-red-500 hover:underline">Limpiar todo</button>
                    )}
                  </div>

                  {/* Universidad */}
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Universidad</h4>
                    <div className="space-y-1">
                      {universidades.map((u) => (
                        <label key={u.id} className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="radio"
                            name="universidad"
                            checked={filtros.universidadId === u.id}
                            onChange={() => setFiltros((f) => ({ ...f, universidadId: f.universidadId === u.id ? undefined : u.id }))}
                            className="accent-primary"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary">{u.nombreCorto}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Condición */}
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Condición</h4>
                    <div className="flex flex-wrap gap-2">
                      {condiciones.map((c) => (
                        <button
                          key={c.value}
                          onClick={() => setFiltros((f) => ({ ...f, condicion: f.condicion === c.value ? undefined : c.value }))}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                            filtros.condicion === c.value
                              ? "bg-primary text-white"
                              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary-light hover:text-primary"
                          }`}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Precio */}
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Rango de precio</h4>
                    <PriceSlider value={priceRange} onChange={setPriceRange} max={10000} step={50} />
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* ── GRID/LISTA ─────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            {/* Toggle vista */}
            <div className="flex justify-end mb-4">
              <div className="flex bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-1 gap-0.5">
                <button onClick={() => setVista("grid")} className={`p-1.5 rounded-lg transition-colors ${vista === "grid" ? "bg-primary text-white" : "text-gray-400 hover:text-gray-600"}`}>
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button onClick={() => setVista("list")} className={`p-1.5 rounded-lg transition-colors ${vista === "list" ? "bg-primary text-white" : "text-gray-400 hover:text-gray-600"}`}>
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {apiError ? (
              <div className="text-center py-20">
                <p className="text-4xl mb-3">⚠️</p>
                <p className="text-gray-500 dark:text-gray-400 font-medium">No se pudo cargar el feed</p>
                <p className="text-xs text-gray-400 mt-1">Verifica que el servidor esté corriendo en localhost:8080</p>
              </div>
            ) : loading ? (
              <SkeletonGrid count={12} />
            ) : filtradas.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-4xl mb-3">🔍</p>
                <p className="text-gray-500 dark:text-gray-400 font-medium">No hay publicaciones con estos filtros</p>
                <button onClick={clearFiltros} className="mt-3 text-sm text-primary hover:underline">Limpiar filtros</button>
              </div>
            ) : (
              <>
                <motion.div
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                  className={vista === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                    : "flex flex-col gap-3"
                  }
                >
                  {displayed.map((p) => (
                    <PublicacionCard key={p.id} publicacion={p} isFavorite={isFavorite(p.id)} onToggleFavorite={toggle} variant={vista} />
                  ))}
                </motion.div>

                {/* Sentinel para infinite scroll */}
                <div ref={sentinelRef} className="h-8 mt-6 flex items-center justify-center">
                  {loadingMore && <Loader2 className="w-5 h-5 text-primary animate-spin" />}
                  {!hasMore && displayed.length > 12 && (
                    <p className="text-xs text-gray-400">Has visto todas las publicaciones</p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeedPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 dark:bg-gray-950" />}>
      <FeedInner />
    </Suspense>
  );
}
