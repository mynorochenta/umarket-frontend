"use client";

import { useState } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import { ConditionBadge } from "@/components/ui/Badge";
import { useAuth } from "@/context/AuthContext";
import { getListingsBySeller } from "@/lib/mock-data";
import { pageTransition, staggerContainer, cardItem } from "@/lib/animations";
import type { Listing } from "@/lib/types";

export default function MisPublicacionesPage() {
  const { usuario } = useAuth();
  const allPubs = usuario ? getListingsBySeller(usuario.id) : [];
  const [publicaciones, setPublicaciones] = useState<Listing[]>(allPubs);
  const [tab, setTab] = useState<"activas" | "pausadas">("activas");

  const activas = publicaciones.filter((p) => p.active);
  const pausadas = publicaciones.filter((p) => !p.active);
  const displayed = tab === "activas" ? activas : pausadas;

  const toggleActiva = (id: number) =>
    setPublicaciones((prev) => prev.map((p) => p.id === id ? { ...p, active: !p.active } : p));

  const eliminar = (id: number) =>
    setPublicaciones((prev) => prev.filter((p) => p.id !== id));

  return (
    <ProtectedRoute>
    <motion.div variants={pageTransition} initial="initial" animate="animate" className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mis publicaciones</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{activas.length} activas · {pausadas.length} pausadas</p>
          </div>
          <Link href="/new-listing" className="flex items-center gap-2 bg-primary text-white font-semibold px-4 py-2.5 rounded-xl text-sm hover:bg-primary-dark transition-colors">
            <Plus className="w-4 h-4" /> Nueva
          </Link>
        </div>

        <div className="flex gap-1 bg-gray-200 dark:bg-gray-800 rounded-xl p-1 mb-6 w-fit">
          {(["activas", "pausadas"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize ${tab === t ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm" : "text-gray-500 dark:text-gray-400"}`}
            >{t} ({t === "activas" ? activas.length : pausadas.length})</button>
          ))}
        </div>

        {displayed.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-3">📦</p>
            <p className="text-gray-500 dark:text-gray-400 font-medium">No tienes publicaciones {tab}</p>
            {tab === "activas" && (
              <Link href="/new-listing" className="mt-4 inline-flex items-center gap-2 bg-primary text-white font-semibold px-5 py-2.5 rounded-xl text-sm">
                <Plus className="w-4 h-4" /> Publicar ahora
              </Link>
            )}
          </div>
        ) : (
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-3">
            {displayed.map((p) => (
              <motion.div key={p.id} variants={cardItem}>
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 flex gap-4 items-start">
                  <Link href={`/listing/${p.id}`}>
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-800">
                      <Image src={p.imageUrl ?? ""} alt={p.title} fill className="object-cover" sizes="80px" />
                    </div>
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/listing/${p.id}`}>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm truncate hover:text-primary">{p.title}</p>
                    </Link>
                    <p className="text-primary font-bold text-lg">Q{p.price.toLocaleString()}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <ConditionBadge condition={p.itemCondition} size="xs" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <button onClick={() => toggleActiva(p.id)} className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-primary transition-colors" title={p.active ? "Pausar" : "Activar"}>
                      {p.active ? <ToggleRight className="w-4 h-4 text-emerald-500" /> : <ToggleLeft className="w-4 h-4" />}
                      {p.active ? "Activa" : "Pausada"}
                    </button>
                    <Link href="/new-listing" className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">
                      <Pencil className="w-3.5 h-3.5" /> Editar
                    </Link>
                    <button onClick={() => eliminar(p.id)} className="flex items-center gap-1 text-xs text-red-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" /> Eliminar
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
    </ProtectedRoute>
  );
}
