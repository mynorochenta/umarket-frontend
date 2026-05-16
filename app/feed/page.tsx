"use client";

import { useState, useMemo, useEffect, useRef, Suspense } from "react";
import { createPortal } from "react-dom";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutGrid, List, Search, ChevronDown, X, Loader2 } from "lucide-react";
import { PublicacionCard } from "@/components/ui/PublicacionCard";
import { SkeletonGrid } from "@/components/ui/SkeletonCard";
import { PriceSlider } from "@/components/ui/PriceSlider";
import { SearchBar } from "@/components/ui/SearchBar";
import { useFavorites } from "@/hooks/useFavorites";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { universities } from "@/lib/mock-data";
import { staggerContainer } from "@/lib/animations";
import type { FeedFilters, Listing } from "@/lib/types";
import { apiGet } from "@/lib/api";

const categorias: string[] = [
  "Books", "Electronics", "Clothing", "Sports", "Home",
  "Art", "Music", "Transport", "Services", "Notes", "Food", "Other",
];

const condiciones = [
  { value: "new",  label: "New" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
];

const ordenOpciones = [
  { value: "recent",     label: "Most recent" },
  { value: "price_asc",  label: "Lowest price" },
  { value: "price_desc", label: "Highest price" },
  { value: "popular",    label: "Most popular" },
];

function chipCls(active: boolean) {
  return (
    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap cursor-pointer select-none " +
    (active
      ? "bg-cyan-500 text-white border border-cyan-500"
      : "bg-transparent text-gray-700 dark:text-gray-300 border border-cyan-200 dark:border-gray-700 hover:border-cyan-400 dark:hover:border-cyan-500")
  );
}

type Pos = { top: number; left: number };

function FeedInner() {
  const searchParams = useSearchParams();
  const { isFavorite, toggle } = useFavorites();
  const [vista, setVista] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [publicaciones, setPublicaciones] = useState<Listing[]>([]);
  const [mounted, setMounted] = useState(false);

  const [filtros, setFiltros] = useState<FeedFilters>({
    category: searchParams.get("categoria") || undefined,
    order: "recent",
    priceMin: 0,
    priceMax: 10000,
  });
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [condicionesActivas, setCondicionesActivas] = useState<Set<string>>(new Set());

  const [categoriaOpen, setCategoriaOpen] = useState(false);
  const [precioOpen, setPrecioOpen] = useState(false);
  const [universidadOpen, setUniversidadOpen] = useState(false);
  const [uniSearch, setUniSearch] = useState("");

  const [categoriaPos, setCategoriaPos] = useState<Pos>({ top: 0, left: 0 });
  const [precioPos, setPrecioPos] = useState<Pos>({ top: 0, left: 0 });
  const [universidadPos, setUniversidadPos] = useState<Pos>({ top: 0, left: 0 });

  const categoriaBtnRef = useRef<HTMLButtonElement>(null);
  const precioBtnRef = useRef<HTMLButtonElement>(null);
  const universidadBtnRef = useRef<HTMLButtonElement>(null);

  const categoriaPanelRef = useRef<HTMLDivElement>(null);
  const precioPanelRef = useRef<HTMLDivElement>(null);
  const universidadPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  const measure = (ref: React.RefObject<HTMLButtonElement | null>): Pos => {
    if (!ref.current) return { top: 0, left: 0 };
    const r = ref.current.getBoundingClientRect();
    return { top: r.bottom + 8, left: r.left };
  };

  const openCategoria = () => {
    setCategoriaPos(measure(categoriaBtnRef));
    setCategoriaOpen((v) => !v);
    setPrecioOpen(false);
    setUniversidadOpen(false);
  };
  const openPrecio = () => {
    setPrecioPos(measure(precioBtnRef));
    setPrecioOpen((v) => !v);
    setCategoriaOpen(false);
    setUniversidadOpen(false);
  };
  const openUniversidad = () => {
    setUniversidadPos(measure(universidadBtnRef));
    setUniversidadOpen((v) => !v);
    setCategoriaOpen(false);
    setPrecioOpen(false);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const t = e.target as Node;
      if (categoriaOpen && !categoriaPanelRef.current?.contains(t) && !categoriaBtnRef.current?.contains(t))
        setCategoriaOpen(false);
      if (precioOpen && !precioPanelRef.current?.contains(t) && !precioBtnRef.current?.contains(t))
        setPrecioOpen(false);
      if (universidadOpen && !universidadPanelRef.current?.contains(t) && !universidadBtnRef.current?.contains(t)) {
        setUniversidadOpen(false);
        setUniSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [categoriaOpen, precioOpen, universidadOpen]);

  useEffect(() => {
    apiGet<Listing[]>("/api/listings")
      .then((data) => setPublicaciones(data))
      .catch(() => setApiError(true))
      .finally(() => setLoading(false));
  }, []);

  const universidadesFiltradas = useMemo(
    () =>
      universities.filter(
        (u) =>
          uniSearch === "" ||
          u.shortName.toLowerCase().includes(uniSearch.toLowerCase()) ||
          u.name.toLowerCase().includes(uniSearch.toLowerCase())
      ),
    [uniSearch]
  );

  const filtradas = useMemo(() => {
    let result = [...publicaciones];
    if (filtros.category)
      result = result.filter((p) => p.category.name === filtros.category);
    if (filtros.universityId)
      result = result.filter((p) => p.seller.university === filtros.universityId);
    if (condicionesActivas.size > 0)
      result = result.filter((p) => condicionesActivas.has(p.itemCondition?.toLowerCase() ?? ""));
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    switch (filtros.order) {
      case "price_asc":  return result.sort((a, b) => a.price - b.price);
      case "price_desc": return result.sort((a, b) => b.price - a.price);
      default:           return result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    }
  }, [filtros, priceRange, publicaciones, condicionesActivas]);

  const { displayed, hasMore, isLoading: loadingMore, sentinelRef } = useInfiniteScroll(filtradas, 12);

  const priceActive = priceRange[0] > 0 || priceRange[1] < 10000;
  const activeFiltersCount = [
    filtros.category,
    filtros.universityId,
    condicionesActivas.size > 0 ? "cond" : undefined,
    priceActive ? "price" : undefined,
  ].filter(Boolean).length;

  const clearFiltros = () => {
    setFiltros({ order: "recent", priceMin: 0, priceMax: 10000 });
    setPriceRange([0, 10000]);
    setCondicionesActivas(new Set());
  };

  const toggleCondicion = (val: string) => {
    setCondicionesActivas((prev) => {
      const next = new Set(prev);
      next.has(val) ? next.delete(val) : next.add(val);
      return next;
    });
  };

  const panelBase =
    "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl";

  const categoriaPanel = mounted && categoriaOpen && createPortal(
    <div
      ref={categoriaPanelRef}
      style={{ position: "fixed", top: categoriaPos.top, left: categoriaPos.left, zIndex: 9999 }}
      className={`${panelBase} p-2 min-w-[180px] max-h-64 overflow-y-auto`}
    >
      {categorias.map((cat) => (
        <button
          key={cat}
          onClick={() => {
            setFiltros((f: FeedFilters) => ({ ...f, category: f.category === cat ? undefined : cat }));
            setCategoriaOpen(false);
          }}
          className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors ${
            filtros.category === cat
              ? "bg-cyan-500 text-white"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>,
    document.body
  );

  const precioPanel = mounted && precioOpen && createPortal(
    <div
      ref={precioPanelRef}
      style={{ position: "fixed", top: precioPos.top, left: precioPos.left, zIndex: 9999 }}
      className={`${panelBase} p-5 w-72`}
    >
      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
        Price range
      </p>
      <PriceSlider value={priceRange} onChange={setPriceRange} max={10000} step={50} />
    </div>,
    document.body
  );

  const universidadPanel = mounted && universidadOpen && createPortal(
    <div
      ref={universidadPanelRef}
      style={{ position: "fixed", top: universidadPos.top, left: universidadPos.left, zIndex: 9999 }}
      className={`${panelBase} w-64`}
    >
      <div className="p-3 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-xl px-3 py-2">
          <Search className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          <input
            autoFocus
            value={uniSearch}
            onChange={(e) => setUniSearch(e.target.value)}
            placeholder="Search university…"
            className="bg-transparent text-sm outline-none text-gray-700 dark:text-gray-300 placeholder-gray-400 w-full"
          />
        </div>
      </div>
      <div className="max-h-56 overflow-y-auto p-2">
        {universidadesFiltradas.map((u) => (
          <button
            key={u.id}
            onClick={() => {
              setFiltros((f: FeedFilters) => ({
                ...f,
                universityId: f.universityId === u.shortName ? undefined : u.shortName,
              }));
              setUniversidadOpen(false);
              setUniSearch("");
            }}
            className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors ${
              filtros.universityId === u.shortName
                ? "bg-cyan-500 text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <span className="font-medium">{u.shortName}</span>
            <span className={`ml-1.5 text-xs ${filtros.universityId === u.shortName ? "text-white/70" : "text-gray-400"}`}>
              {u.name}
            </span>
          </button>
        ))}
        {universidadesFiltradas.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-4">No results</p>
        )}
      </div>
    </div>,
    document.body
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

      {/* ── STICKY FILTER BAR ─────────────────────────────────────── */}
      <div className="sticky top-16 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-3 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

            {/* Category */}
            <button
              ref={categoriaBtnRef}
              onClick={openCategoria}
              className={chipCls(!!filtros.category)}
            >
              {filtros.category ?? "Category"}
              {filtros.category ? (
                <X
                  className="w-3 h-3"
                  onClick={(e) => { e.stopPropagation(); setFiltros((f: FeedFilters) => ({ ...f, category: undefined })); }}
                />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>

            {/* Condition — multi-select chips */}
            {condiciones.map((c) => (
              <button
                key={c.value}
                onClick={() => toggleCondicion(c.value)}
                className={`${chipCls(condicionesActivas.has(c.value))} flex-shrink-0`}
              >
                {c.label}
              </button>
            ))}

            {/* Price */}
            <button
              ref={precioBtnRef}
              onClick={openPrecio}
              className={chipCls(priceActive)}
            >
              {priceActive ? `Q${priceRange[0]}–Q${priceRange[1]}` : "Price"}
              <ChevronDown className="w-3 h-3" />
            </button>

            {/* University */}
            <button
              ref={universidadBtnRef}
              onClick={openUniversidad}
              className={chipCls(!!filtros.universityId)}
            >
              {filtros.universityId ?? "University"}
              {filtros.universityId ? (
                <X
                  className="w-3 h-3"
                  onClick={(e) => { e.stopPropagation(); setFiltros((f: FeedFilters) => ({ ...f, universityId: undefined })); }}
                />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>

            {/* Clear */}
            {activeFiltersCount > 0 && (
              <button
                onClick={clearFiltros}
                className="flex-shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium text-red-500 border border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
              >
                <X className="w-3 h-3" /> Clear
              </button>
            )}

            <div className="flex-1 min-w-4" />

            {/* Grid / list toggle */}
            <div className="flex-shrink-0 flex items-center gap-0.5 bg-gray-100 dark:bg-gray-800 rounded-full p-1">
              <button
                onClick={() => setVista("grid")}
                className={`p-1.5 rounded-full transition-colors ${
                  vista === "grid"
                    ? "bg-white dark:bg-gray-700 text-cyan-600 shadow-sm"
                    : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setVista("list")}
                className={`p-1.5 rounded-full transition-colors ${
                  vista === "list"
                    ? "bg-white dark:bg-gray-700 text-cyan-600 shadow-sm"
                    : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                }`}
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Portal panels */}
      {categoriaPanel}
      {precioPanel}
      {universidadPanel}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── RESULTS COUNT + SORT ─────────────────────────────── */}
        <div className="flex items-center justify-between py-3 mb-1">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {loading ? "Loading…" : `${filtradas.length} listings found`}
          </span>
          <select
            value={filtros.order}
            onChange={(e) => setFiltros((f: FeedFilters) => ({ ...f, order: e.target.value as FeedFilters["order"] }))}
            className="text-sm text-gray-700 dark:text-gray-300 bg-transparent border-none outline-none cursor-pointer"
          >
            {ordenOpciones.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* ── MAIN CONTENT ─────────────────────────────────────── */}
        {apiError ? (
          <div className="text-center py-24">
            <p className="text-5xl mb-4">⚠️</p>
            <p className="text-gray-700 dark:text-gray-300 font-semibold text-lg mb-1">Could not load feed</p>
            <p className="text-sm text-gray-400">Make sure the server is running on localhost:8080</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-5 px-5 py-2 bg-cyan-500 text-white rounded-full text-sm font-medium hover:bg-cyan-600 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : loading ? (
          <SkeletonGrid count={12} />
        ) : filtradas.length === 0 ? (
          <div className="flex flex-col items-center py-24">
            <Search className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-gray-700 dark:text-gray-300 font-semibold text-lg">Nothing found</p>
            <p className="text-sm text-gray-400 mt-1">Try different filters</p>
            {activeFiltersCount > 0 && (
              <button
                onClick={clearFiltros}
                className="mt-5 px-5 py-2 bg-cyan-500 text-white rounded-full text-sm font-medium hover:bg-cyan-600 transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className={
                vista === "grid"
                  ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
                  : "flex flex-col gap-3"
              }
            >
              {displayed.map((p) => (
                <PublicacionCard
                  key={p.id}
                  publicacion={p}
                  isFavorite={isFavorite(String(p.id))}
                  onToggleFavorite={toggle}
                  variant={vista}
                />
              ))}
            </motion.div>

            <div ref={sentinelRef} className="h-10 mt-6 flex items-center justify-center pb-8">
              {loadingMore && <Loader2 className="w-5 h-5 text-cyan-500 animate-spin" />}
              {!hasMore && displayed.length > 12 && (
                <p className="text-xs text-gray-400">You&apos;ve seen all listings</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function FeedPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 dark:bg-gray-950" />}>
      <FeedInner />
    </Suspense>
  );
}
