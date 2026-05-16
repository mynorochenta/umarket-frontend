"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { cardItem, cardHoverProps } from "@/lib/animations";
import { VerifiedBadge, ConditionBadge } from "./Badge";
import type { Listing } from "@/lib/types";

interface PublicacionCardProps {
  publicacion: Listing;
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
      <Link href={`/listing/${p.id}`}>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-cyan-100 dark:border-gray-700 overflow-hidden flex gap-4 p-3 sm:p-4 hover:shadow-md transition-shadow">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700">
            <Image src={p.imageUrl ?? ""} alt={p.title} fill className="object-cover" sizes="96px" />
          </div>
          <div className="flex-1 min-w-0 flex flex-col gap-1">
            <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">{p.title}</p>
            <p className="text-primary font-bold text-lg leading-tight">Q{p.price.toLocaleString()}</p>
            <VerifiedBadge university={p.seller.university} size="xs" />
            <ConditionBadge condition={p.itemCondition} size="xs" className="w-fit" />
          </div>
          <motion.button
            onClick={(e) => { e.preventDefault(); onToggleFavorite(String(p.id)); }}
            animate={isFavorite ? { scale: [1, 1.3, 1] } : { scale: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex-shrink-0 self-start p-1"
          >
            <Heart className={`w-4.5 h-4.5 transition-colors ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-400"}`} />
          </motion.button>
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
    return <ListCard publicacion={p} isFavorite={isFavorite} onToggleFavorite={onToggleFavorite} />;
  }

  return (
    <motion.div variants={cardItem} {...cardHoverProps} className="group">
      <Link href={`/listing/${p.id}`}>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-cyan-100 dark:border-gray-700 overflow-hidden h-full flex flex-col">
          {/* Imagen */}
          <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
            <Image
              src={p.imageUrl ?? ""}
              alt={p.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            {/* Badge categoría */}
            <div className="absolute top-2.5 left-2.5">
              <span className="bg-white/90 dark:bg-gray-900/90 text-gray-700 dark:text-gray-200 text-[10px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm">
                {p.category.name}
              </span>
            </div>
            {/* Botón favorito */}
            <motion.button
              onClick={(e) => { e.preventDefault(); onToggleFavorite(String(p.id)); }}
              animate={isFavorite ? { scale: [1, 1.3, 1] } : { scale: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute top-2.5 right-2.5 w-7 h-7 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm"
              aria-label={isFavorite ? "Quitar favorito" : "Agregar favorito"}
            >
              <Heart className={`w-3.5 h-3.5 transition-colors ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-500 dark:text-gray-400"}`} />
            </motion.button>
            {/* Precio sobre la foto */}
            <div className="absolute bottom-2.5 left-2.5 bg-black/40 backdrop-blur-sm rounded-lg px-2 py-1">
              <span className="text-white font-bold text-lg leading-none">
                Q{p.price.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Contenido */}
          <div className="p-2.5 flex flex-col gap-1.5 flex-1">
            <h3 className="font-medium text-gray-900 dark:text-white line-clamp-2 text-sm leading-snug">
              {p.title}
            </h3>
            <VerifiedBadge university={p.seller.university} size="xs" className="w-fit" />

            <div className="pt-1.5 mt-auto border-t border-gray-100 dark:border-gray-700">
              <ConditionBadge condition={p.itemCondition} size="xs" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
