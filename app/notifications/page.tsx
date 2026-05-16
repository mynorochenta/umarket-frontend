"use client";

import { useState } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, BellOff, MessageSquare, Star, ShoppingBag, Heart, Check } from "lucide-react";
import { pageTransition, staggerContainer, cardItem } from "@/lib/animations";

type NotificationType = "new_message" | "new_review" | "listing_sold" | "listing_interest";

interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  read: boolean;
  createdAt: Date;
  href: string;
}

const typeConfig: Record<NotificationType, { icon: React.ElementType; iconClass: string }> = {
  new_message: {
    icon: MessageSquare,
    iconClass: "bg-blue-100 dark:bg-blue-900/30 text-blue-500",
  },
  new_review: {
    icon: Star,
    iconClass: "bg-amber-100 dark:bg-amber-900/30 text-amber-500",
  },
  listing_sold: {
    icon: ShoppingBag,
    iconClass: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500",
  },
  listing_interest: {
    icon: Heart,
    iconClass: "bg-red-100 dark:bg-red-900/30 text-red-500",
  },
};

const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: "n1",
    type: "new_message",
    title: "Nuevo mensaje de Ana González",
    body: "Hola, ¿sigue disponible la calculadora gráfica?",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 5),
    href: "/messages/c1",
  },
  {
    id: "n2",
    type: "listing_interest",
    title: "Alguien guardó tu publicación",
    body: "Carlos Mendoza guardó \"Calculadora Texas TI-84 Plus\" en sus favoritos.",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    href: "/listing/1",
  },
  {
    id: "n3",
    type: "new_review",
    title: "Nueva reseña recibida",
    body: "María López te dejó una reseña de 5 estrellas. ¡Excelente vendedor!",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    href: "/profile/1",
  },
  {
    id: "n4",
    type: "listing_sold",
    title: "¡Publicación marcada como vendida!",
    body: "Tu publicación \"Libro de Cálculo Stewart 8va edición\" fue marcada como vendida.",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    href: "/my-listings",
  },
  {
    id: "n5",
    type: "new_message",
    title: "Nuevo mensaje de Carlos Mendoza",
    body: "¿Puedes hacer un descuento si compro los dos libros juntos?",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    href: "/messages/c2",
  },
  {
    id: "n6",
    type: "listing_interest",
    title: "Alguien guardó tu publicación",
    body: "Un estudiante guardó \"Auriculares Sony WH-1000XM4\" en sus favoritos.",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
    href: "/listing/2",
  },
  {
    id: "n7",
    type: "new_review",
    title: "Nueva reseña recibida",
    body: "Diego Ramírez te dejó una reseña de 4 estrellas: \"Producto en perfecto estado, entrega rápida.\"",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72),
    href: "/profile/1",
  },
];

function timeAgo(date: Date): string {
  const secs = Math.floor((Date.now() - date.getTime()) / 1000);
  if (secs < 60) return "ahora";
  if (secs < 3600) return `hace ${Math.floor(secs / 60)} min`;
  if (secs < 86400) return `hace ${Math.floor(secs / 3600)} h`;
  return `hace ${Math.floor(secs / 86400)} días`;
}

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState<AppNotification[]>(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifs.filter((n) => !n.read).length;
  const displayed = filter === "unread" ? notifs.filter((n) => !n.read) : notifs;

  const markRead = (id: string) =>
    setNotifs((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));

  const markAllRead = () =>
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));

  return (
    <ProtectedRoute>
      <motion.div variants={pageTransition} initial="initial" animate="animate" className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="max-w-2xl mx-auto px-4 py-10">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 flex items-center justify-center relative">
                <Bell className="w-5 h-5 text-cyan-500" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notificaciones</h1>
                {unreadCount > 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">{unreadCount} sin leer</p>
                )}
              </div>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="flex items-center gap-1.5 text-sm text-cyan-500 hover:text-cyan-400 font-medium transition-colors"
              >
                <Check className="w-3.5 h-3.5" /> Marcar todas
              </button>
            )}
          </div>

          {/* Filter tabs */}
          <div className="flex gap-1 bg-gray-200 dark:bg-gray-800 rounded-xl p-1 mb-6 w-fit">
            {([
              { key: "all" as const, label: "Todas" },
              { key: "unread" as const, label: "No leídas" },
            ]).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filter === key
                    ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {label}
                {key === "unread" && unreadCount > 0 && (
                  <span className="ml-1.5 bg-cyan-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Notification list with tab switching animation */}
          <AnimatePresence mode="wait">
            {displayed.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="text-center py-20"
              >
                <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800/60 flex items-center justify-center mx-auto mb-4">
                  <BellOff className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                </div>
                <p className="text-gray-500 dark:text-gray-400 font-medium">
                  {filter === "unread"
                    ? "No tienes notificaciones sin leer"
                    : "No tienes notificaciones"}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={filter}
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="space-y-2"
              >
                {displayed.map((n) => {
                  const { icon: Icon, iconClass } = typeConfig[n.type];
                  return (
                    <motion.div key={n.id} variants={cardItem}>
                      <Link
                        href={n.href}
                        onClick={() => markRead(n.id)}
                        className={`flex items-start gap-3 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 border-l-4 transition-all hover:shadow-sm ${
                          n.read
                            ? "bg-white dark:bg-gray-900 border-l-transparent"
                            : "bg-cyan-50/50 dark:bg-cyan-900/10 border-l-cyan-500"
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${iconClass}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-semibold ${
                            n.read ? "text-gray-700 dark:text-gray-300" : "text-gray-900 dark:text-white"
                          }`}>
                            {n.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
                            {n.body}
                          </p>
                          <p className="text-[10px] text-gray-400 mt-1">{timeAgo(n.createdAt)}</p>
                        </div>
                        {!n.read && (
                          <div className="w-2 h-2 bg-cyan-500 rounded-full flex-shrink-0 mt-1.5" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.div>
    </ProtectedRoute>
  );
}
