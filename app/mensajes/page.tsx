"use client";

import Link from "next/link";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Image from "next/image";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getConversacionesPorUsuario, getUsuario } from "@/lib/mock-data";
import { pageTransition, staggerContainer, cardItem } from "@/lib/animations";

function timeShort(date: Date): string {
  const secs = Math.floor((Date.now() - date.getTime()) / 1000);
  if (secs < 60) return "ahora";
  if (secs < 3600) return `${Math.floor(secs / 60)}m`;
  if (secs < 86400) return `${Math.floor(secs / 3600)}h`;
  return `${Math.floor(secs / 86400)}d`;
}

export default function MensajesPage() {
  const { usuario } = useAuth();
  const conversaciones = usuario ? getConversacionesPorUsuario(usuario.id) : [];

  return (
    <ProtectedRoute>
    <motion.div variants={pageTransition} initial="initial" animate="animate" className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-primary-light dark:bg-primary/20 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mensajes</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{conversaciones.length} conversaciones</p>
          </div>
        </div>

        {conversaciones.length === 0 ? (
          <div className="text-center py-20">
            <MessageSquare className="w-12 h-12 text-gray-200 dark:text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">Sin mensajes aún</p>
          </div>
        ) : (
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-2">
            {conversaciones.map((conv) => {
              const otroId = conv.participantes.find((id) => id !== usuario?.id)!;
              const otro = getUsuario(otroId);
              if (!otro) return null;

              return (
                <motion.div key={conv.id} variants={cardItem}>
                  <Link href={`/mensajes/${conv.id}`}>
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 flex items-center gap-3 hover:border-primary/30 hover:shadow-sm transition-all">
                      <div className="relative flex-shrink-0">
                        <Image src={otro.avatar} alt={otro.nombre} width={48} height={48} className="rounded-full" />
                        {conv.noLeidos > 0 && (
                          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                            {conv.noLeidos}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`text-sm font-semibold truncate ${conv.noLeidos > 0 ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300"}`}>
                            {otro.nombre}
                          </p>
                          <span className="text-xs text-gray-400 flex-shrink-0 ml-2">{timeShort(conv.ultimoMensajeEn)}</span>
                        </div>
                        {conv.publicacionTitulo && (
                          <p className="text-[10px] text-primary truncate">{conv.publicacionTitulo}</p>
                        )}
                        <p className={`text-xs truncate mt-0.5 ${conv.noLeidos > 0 ? "text-gray-800 dark:text-gray-200 font-medium" : "text-gray-400"}`}>
                          {conv.ultimoMensaje}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </motion.div>
    </ProtectedRoute>
  );
}
