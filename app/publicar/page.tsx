"use client";

import { useState } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle, Tag, AlignLeft, DollarSign } from "lucide-react";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { pageTransition, slideInLeft, slideInRight } from "@/lib/animations";
import { universidades } from "@/lib/mock-data";
import type { Categoria, Condicion } from "@/lib/types";

const categorias: Categoria[] = [
  "Libros","Electrónica","Ropa","Deportes","Hogar",
  "Arte","Música","Transporte","Servicios","Apuntes","Comida","Otros",
];

const condiciones: { value: Condicion; label: string; desc: string }[] = [
  { value: "nuevo", label: "Nuevo", desc: "Sin uso o con empaque original" },
  { value: "bueno", label: "Buen estado", desc: "Usado pero en excelentes condiciones" },
  { value: "regular", label: "Regular", desc: "Funcional con signos de uso" },
];

export default function PublicarPage() {
  const router = useRouter();
  const [paso, setPaso] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    categoria: "" as Categoria | "",
    condicion: "" as Condicion | "",
    precio: "",
    universidadId: "",
  });
  const [imagenes, setImagenes] = useState<string[]>([]);

  const paso1Valid = form.titulo && form.descripcion && form.categoria && form.condicion && form.precio && form.universidadId;
  const paso2Valid = imagenes.length >= 1;

  const handleSubmit = async () => {
    if (!paso2Valid) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    router.push("/mis-publicaciones");
  };

  return (
    <ProtectedRoute>
    <motion.div variants={pageTransition} initial="initial" animate="animate" className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Publicar artículo</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Es gratis y solo toma unos minutos</p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-3 mb-8">
          {[1, 2].map((n) => (
            <div key={n} className="flex-1 flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-colors ${
                paso > n ? "bg-emerald-500 text-white" : paso === n ? "bg-primary text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-400"
              }`}>
                {paso > n ? <CheckCircle className="w-4 h-4" /> : n}
              </div>
              <div className={`flex-1 h-1 rounded-full transition-colors ${paso > n ? "bg-emerald-500" : "bg-gray-200 dark:bg-gray-700"}`} />
            </div>
          ))}
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-colors ${paso >= 2 ? "bg-primary text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-400"}`}>
            {submitting ? <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "2"}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {paso === 1 ? (
              /* ── PASO 1 ─────────────────────────────────────────── */
              <motion.div key="paso1" variants={slideInLeft} initial="initial" animate="animate" exit={{ opacity: 0, x: -20 }} className="space-y-5">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Información del artículo</h2>

                {/* Título */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Título</label>
                  <div className="relative">
                    <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={form.titulo}
                      onChange={(e) => setForm((f) => ({ ...f, titulo: e.target.value }))}
                      maxLength={80}
                      placeholder="ej. Calculadora Texas TI-84 Plus"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    />
                  </div>
                  <p className="text-right text-xs text-gray-400 mt-1">{form.titulo.length}/80</p>
                </div>

                {/* Descripción */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Descripción</label>
                  <div className="relative">
                    <AlignLeft className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                    <textarea
                      value={form.descripcion}
                      onChange={(e) => setForm((f) => ({ ...f, descripcion: e.target.value }))}
                      rows={4}
                      maxLength={500}
                      placeholder="Describe el estado, incluye datos relevantes..."
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
                    />
                  </div>
                  <p className="text-right text-xs text-gray-400 mt-1">{form.descripcion.length}/500</p>
                </div>

                {/* Categoría */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Categoría</label>
                  <div className="flex flex-wrap gap-2">
                    {categorias.map((cat) => (
                      <button key={cat} type="button"
                        onClick={() => setForm((f) => ({ ...f, categoria: cat }))}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                          form.categoria === cat ? "bg-primary text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary-light hover:text-primary"
                        }`}
                      >{cat}</button>
                    ))}
                  </div>
                </div>

                {/* Condición */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Condición</label>
                  <div className="grid grid-cols-3 gap-2">
                    {condiciones.map((c) => (
                      <button key={c.value} type="button"
                        onClick={() => setForm((f) => ({ ...f, condicion: c.value }))}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          form.condicion === c.value
                            ? "border-primary bg-primary-50 dark:bg-primary/10"
                            : "border-gray-200 dark:border-gray-700 hover:border-primary/50"
                        }`}
                      >
                        <p className={`text-xs font-semibold ${form.condicion === c.value ? "text-primary" : "text-gray-900 dark:text-white"}`}>{c.label}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{c.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Precio + Universidad */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Precio (Q)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="number"
                        value={form.precio}
                        onChange={(e) => setForm((f) => ({ ...f, precio: e.target.value }))}
                        min={1}
                        placeholder="0.00"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Universidad</label>
                    <select
                      value={form.universidadId}
                      onChange={(e) => setForm((f) => ({ ...f, universidadId: e.target.value }))}
                      className="w-full px-3 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    >
                      <option value="">Seleccionar</option>
                      {universidades.map((u) => <option key={u.id} value={u.id}>{u.nombreCorto}</option>)}
                    </select>
                  </div>
                </div>

                <motion.button
                  onClick={() => paso1Valid && setPaso(2)}
                  disabled={!paso1Valid}
                  whileHover={{ scale: paso1Valid ? 1.01 : 1 }}
                  whileTap={{ scale: paso1Valid ? 0.98 : 1 }}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Siguiente: Fotos <ArrowRight className="w-4 h-4" />
                </motion.button>
              </motion.div>
            ) : (
              /* ── PASO 2 ─────────────────────────────────────────── */
              <motion.div key="paso2" variants={slideInRight} initial="initial" animate="animate" exit={{ opacity: 0, x: 20 }} className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">Fotos del artículo</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Agrega al menos 1 foto. Más fotos = más ventas.</p>
                </div>

                <ImageUpload
                  images={imagenes}
                  onAdd={(url) => setImagenes((prev) => [...prev, url])}
                  onRemove={(i) => setImagenes((prev) => prev.filter((_, idx) => idx !== i))}
                  max={5}
                />

                <div className="flex gap-3">
                  <button
                    onClick={() => setPaso(1)}
                    className="flex items-center gap-2 px-5 py-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Atrás
                  </button>
                  <motion.button
                    onClick={handleSubmit}
                    disabled={!paso2Valid || submitting}
                    whileHover={{ scale: paso2Valid ? 1.01 : 1 }}
                    whileTap={{ scale: paso2Valid ? 0.98 : 1 }}
                    className="flex-1 flex items-center justify-center gap-2 bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50"
                  >
                    {submitting ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <><CheckCircle className="w-4 h-4" /> Publicar ahora</>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
    </ProtectedRoute>
  );
}
