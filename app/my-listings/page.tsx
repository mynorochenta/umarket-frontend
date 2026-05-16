"use client";

import { useState } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, Package } from "lucide-react";
import { ConditionBadge } from "@/components/ui/Badge";
import { useAuth } from "@/context/AuthContext";
import { getListingsBySeller } from "@/lib/mock-data";
import { pageTransition, staggerContainer, cardItem } from "@/lib/animations";
import type { Listing } from "@/lib/types";

export default function MyListingsPage() {
  const { usuario } = useAuth();
  const allListings = usuario ? getListingsBySeller(usuario.id) : [];
  const [listings, setListings] = useState<Listing[]>(allListings);
  const [tab, setTab] = useState<"activas" | "pausadas">("activas");
  const [deleteTarget, setDeleteTarget] = useState<Listing | null>(null);

  const active = listings.filter((p) => p.active);
  const paused = listings.filter((p) => !p.active);
  const displayed = tab === "activas" ? active : paused;

  const toggleActive = (id: number) =>
    setListings((prev) => prev.map((p) => p.id === id ? { ...p, active: !p.active } : p));

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setListings((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <ProtectedRoute>
      <AnimatePresence>
        {deleteTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-6 w-full max-w-sm shadow-xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-500" />
              </div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white text-center mb-1">
                ¿Eliminar publicación?
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  &ldquo;{deleteTarget.title}&rdquo;
                </span>{" "}
                será eliminada permanentemente.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="flex-1 py-2.5 rounded-2xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 py-2.5 rounded-2xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div variants={pageTransition} initial="initial" animate="animate" className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mis publicaciones</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                {active.length} activas · {paused.length} pausadas
              </p>
            </div>
            <Link
              href="/new-listing"
              className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors"
            >
              <Plus className="w-4 h-4" /> Nueva
            </Link>
          </div>

          <div className="flex gap-1 bg-gray-200 dark:bg-gray-800 rounded-xl p-1 mb-6 w-fit">
            {(["activas", "pausadas"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize ${
                  tab === t
                    ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {t} ({t === "activas" ? active.length : paused.length})
              </button>
            ))}
          </div>

          {displayed.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center py-20"
            >
              <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800/60 flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-gray-300 dark:text-gray-600" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                No tienes publicaciones {tab}
              </p>
              {tab === "activas" && (
                <Link
                  href="/new-listing"
                  className="mt-4 inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
                >
                  <Plus className="w-4 h-4" /> Publicar ahora
                </Link>
              )}
            </motion.div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="space-y-3"
            >
              <AnimatePresence mode="popLayout">
                {displayed.map((p) => (
                  <motion.div
                    key={p.id}
                    variants={cardItem}
                    exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                    layout
                  >
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 flex gap-4 items-start">
                      <Link href={`/listing/${p.id}`}>
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-800">
                          <Image
                            src={p.imageUrl ?? ""}
                            alt={p.title}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link href={`/listing/${p.id}`}>
                          <p className="font-semibold text-gray-900 dark:text-white text-sm truncate hover:text-cyan-500 transition-colors">
                            {p.title}
                          </p>
                        </Link>
                        <p className="text-cyan-500 font-bold text-lg">Q{p.price.toLocaleString()}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <ConditionBadge condition={p.itemCondition} size="xs" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 flex-shrink-0">
                        <button
                          onClick={() => toggleActive(p.id)}
                          className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-cyan-500 transition-colors"
                          title={p.active ? "Pausar" : "Activar"}
                        >
                          {p.active
                            ? <ToggleRight className="w-4 h-4 text-emerald-500" />
                            : <ToggleLeft className="w-4 h-4" />
                          }
                          {p.active ? "Activa" : "Pausada"}
                        </button>
                        <Link
                          href={`/listing/${p.id}/edit`}
                          className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-cyan-500 transition-colors"
                        >
                          <Pencil className="w-3.5 h-3.5" /> Editar
                        </Link>
                        <button
                          onClick={() => setDeleteTarget(p)}
                          className="flex items-center gap-1 text-xs text-red-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Eliminar
                        </button>
                      </div>
                    </div>
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
