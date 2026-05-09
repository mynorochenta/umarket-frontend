"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart, Eye } from "lucide-react";
import { cardItem, cardHoverProps } from "@/lib/animations";
import { VerifiedBadge, CondicionBadge } from "./Badge";
import type { Publicacion } from "@/lib/types";

interface PublicacionCardProps {
  publicacion: Publicacion;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  variant?: "grid" | "list";
}

/* ── Variante lista ───────────────────────────────────────────────────────── */
function ListCard({
  publicacion: p,
  isFavorite,
  onToggleFavorite,
}: Omit<PublicacionCardProps, "variant">) {
  return (
    <motion.div variants={cardItem} {...cardHoverProps}>
      <Link href={`/publicacion/${p.id}`}>
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden flex gap-4 p-3 sm:p-4 hover:shadow-md transition-shadow">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700">
            <Image
              src={p.imagenes[0]}
              alt={p.titulo}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
          <div className="flex-1 min-w-0 flex flex-col gap-1">
            <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">
              {p.titulo}
            </p>
            <p className="text-primary font-bold text-lg leading-tight">
              Q{p.precio.toLocaleString()}
            </p>
            <VerifiedBadge universidad={p.universidadNombre} size="xs" />
            <CondicionBadge condicion={p.condicion} size="xs" className="w-fit" />
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite(p.id);
            }}
            className="flex-shrink-0 self-start p-1"
          >
            <Heart
              className={`w-4.5 h-4.5 transition-colors ${
                isFavorite
                  ? "fill-red-500 text-red-500"
                  : "text-gray-400 hover:text-red-400"
              }`}
            />
          </button>
        </div>
      </Link>
    </motion.div>
  );
}

/* ── Variante grid (default) ─────────────────────────────────────────────── */
export function PublicacionCard({
  publicacion: p,
  isFavorite,
  onToggleFavorite,
  variant = "grid",
}: PublicacionCardProps) {
  if (variant === "list") {
    return (
      <ListCard
        publicacion={p}
        isFavorite={isFavorite}
        onToggleFavorite={onToggleFavorite}
      />
    );
  }

  return (
    <motion.div variants={cardItem} {...cardHoverProps} className="group">
      <Link href={`/publicacion/${p.id}`}>
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
          {/* Imagen */}
          <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
            <Image
              src={p.imagenes[0]}
              alt={p.titulo}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Badge categoría */}
            <div className="absolute top-2.5 left-2.5">
              <span className="bg-white/90 dark:bg-gray-900/90 text-gray-700 dark:text-gray-200 text-[10px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm">
                {p.categoria}
              </span>
            </div>
            {/* Botón favorito */}
            <button
              onClick={(e) => {
                e.preventDefault();
                onToggleFavorite(p.id);
              }}
              className="absolute top-2.5 right-2.5 w-7 h-7 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-sm"
              aria-label={isFavorite ? "Quitar favorito" : "Agregar favorito"}
            >
              <Heart
                className={`w-3.5 h-3.5 transition-colors ${
                  isFavorite
                    ? "fill-red-500 text-red-500"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              />
            </button>
            {/* Badge condición */}
            <div className="absolute bottom-2.5 left-2.5">
              <CondicionBadge condicion={p.condicion} size="xs" />
            </div>
          </div>

          {/* Contenido */}
          <div className="p-3.5 flex flex-col gap-2 flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 text-sm leading-snug">
              {p.titulo}
            </h3>
            <p className="text-primary font-bold text-xl leading-none">
              Q{p.precio.toLocaleString()}
            </p>
            <VerifiedBadge universidad={p.universidadNombre} className="w-fit" />

            {/* Vendedor + stats */}
            <div className="flex items-center justify-between pt-2 mt-auto border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-1.5 min-w-0">
                <Image
                  src={p.vendedor.avatar}
                  alt={p.vendedor.nombre}
                  width={18}
                  height={18}
                  className="rounded-full flex-shrink-0"
                />
                <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[90px]">
                  {p.vendedor.nombre.split(" ")[0]}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Eye className="w-3 h-3" />
                <span>{p.vistas}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
