"use client";

import { useState } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Bell, MessageSquare, Heart, Star, ShoppingBag, CheckCircle, Check } from "lucide-react";
import { notifications as mockNotifs } from "@/lib/mock-data";
import { pageTransition, staggerContainer, cardItem } from "@/lib/animations";
import type { Notification } from "@/lib/types";

const tipoIcono: Record<Notification["type"], React.ElementType> = {
  message: MessageSquare,
  favorite: Heart,
  review: Star,
  listing: ShoppingBag,
  verification: CheckCircle,
};

const tipoColor: Record<Notification["type"], string> = {
  message: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
  favorite: "bg-red-100 dark:bg-red-900/30 text-red-500",
  review: "bg-amber-100 dark:bg-amber-900/30 text-amber-500",
  listing: "bg-primary-light dark:bg-primary/20 text-primary",
  verification: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500",
};

function timeAgo(date: Date): string {
  const secs = Math.floor((Date.now() - date.getTime()) / 1000);
  if (secs < 60) return "ahora";
  if (secs < 3600) return `hace ${Math.floor(secs / 60)} min`;
  if (secs < 86400) return `hace ${Math.floor(secs / 3600)} h`;
  return `hace ${Math.floor(secs / 86400)} días`;
}

export default function NotificacionesPage() {
  const [notifs, setNotifs] = useState(mockNotifs);
  const unread = notifs.filter((n) => !n.read).length;

  const marcarTodas = () => setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  const marcarLeida = (id: string) => setNotifs((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));

  return (
    <ProtectedRoute>
    <motion.div variants={pageTransition} initial="initial" animate="animate" className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary-light dark:bg-primary/20 flex items-center justify-center relative">
              <Bell className="w-5 h-5 text-primary" />
              {unread > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {unread}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notificaciones</h1>
              {unread > 0 && <p className="text-sm text-gray-500 dark:text-gray-400">{unread} sin leer</p>}
            </div>
          </div>
          {unread > 0 && (
            <button onClick={marcarTodas} className="flex items-center gap-1 text-sm text-primary hover:underline">
              <Check className="w-3.5 h-3.5" /> Marcar todas
            </button>
          )}
        </div>

        <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-2">
          {notifs.map((n) => {
            const Icon = tipoIcono[n.type];
            const Wrapper = n.link ? Link : "div";
            const wrapperProps = n.link ? { href: n.link, onClick: () => marcarLeida(n.id) } : {};

            return (
              <motion.div key={n.id} variants={cardItem}>
                {/* @ts-expect-error: dynamic tag */}
                <Wrapper {...wrapperProps}>
                  <div className={`flex items-start gap-3 p-4 rounded-2xl border transition-all ${
                    n.read
                      ? "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800"
                      : "bg-primary-50 dark:bg-primary/5 border-primary/20"
                  } ${n.link ? "hover:border-primary/40 hover:shadow-sm cursor-pointer" : ""}`}
                    onClick={() => marcarLeida(n.id)}
                  >
                    {/* Avatar o ícono */}
                    {n.avatar ? (
                      <Image src={n.avatar} alt="" width={40} height={40} className="rounded-full flex-shrink-0" />
                    ) : (
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${tipoColor[n.type]}`}>
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold ${n.read ? "text-gray-700 dark:text-gray-300" : "text-gray-900 dark:text-white"}`}>
                        {n.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{n.description}</p>
                      <p className="text-[10px] text-gray-400 mt-1">{timeAgo(new Date(n.createdAt))}</p>
                    </div>

                    {!n.read && (
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1.5" />
                    )}
                  </div>
                </Wrapper>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
    </ProtectedRoute>
  );
}
