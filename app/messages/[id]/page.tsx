"use client";

import { useState, useRef, useEffect } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Send, Check, CheckCheck } from "lucide-react";
import { VerifiedBadge } from "@/components/ui/Badge";
import { useAuth } from "@/context/AuthContext";
import { conversations, getUserById } from "@/lib/mock-data";
import { pageTransition } from "@/lib/animations";
import type { Message } from "@/lib/mock-data";

function timeLabel(date: Date): string {
  const secs = (Date.now() - date.getTime()) / 1000;
  if (secs < 60) return "ahora";
  if (secs < 3600) return `${Math.floor(secs / 60)} min`;
  return date.toLocaleTimeString("es-GT", { hour: "2-digit", minute: "2-digit" });
}

export default function ChatPage() {
  const params = useParams<{ id: string }>();
  const { usuario } = useAuth();
  const conv = conversations.find((c) => c.id === params.id);
  if (!conv) return notFound();

  const otroId = conv.participants.find((id) => id !== String(usuario?.id))!;
  const otro = getUserById(otroId);
  if (!otro) return notFound();

  const [mensajes, setMensajes] = useState<Message[]>(conv.messages);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [mensajes]);

  const enviar = () => {
    const text = input.trim();
    if (!text || !usuario) return;
    const nuevo: Message = {
      id: `m-${Date.now()}`,
      conversationId: conv.id,
      senderId: String(usuario.id),
      content: text,
      sentAt: new Date(),
      read: false,
    };
    setMensajes((prev) => [...prev, nuevo]);
    setInput("");
  };

  const isPropio = (m: Message) => m.senderId === String(usuario?.id);

  return (
    <ProtectedRoute>
    <motion.div variants={pageTransition} initial="initial" animate="animate" className="h-[calc(100vh-64px)] flex flex-col bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center gap-3 flex-shrink-0">
        <Link href="/messages" className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <ArrowLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </Link>
        <Link href={`/profile/${otro.id}`} className="flex items-center gap-2.5 group">
          <Image src={otro.avatar} alt={otro.name} width={36} height={36} className="rounded-full" />
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors">{otro.name}</p>
            <VerifiedBadge universidad={otro.universityShort} size="xs" />
          </div>
        </Link>
        {conv.listingTitle && (
          <div className="ml-auto hidden sm:block">
            <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full">
              {conv.listingTitle}
            </span>
          </div>
        )}
      </div>

      {/* Mensajes */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
        {mensajes.map((m) => {
          const propio = isPropio(m);
          return (
            <div key={m.id} className={`flex ${propio ? "justify-end" : "justify-start"}`}>
              {!propio && (
                <Image src={otro.avatar} alt={otro.name} width={28} height={28} className="rounded-full mr-2 flex-shrink-0 self-end" />
              )}
              <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm shadow-sm ${
                propio
                  ? "bg-primary text-white rounded-br-sm"
                  : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-100 dark:border-gray-700 rounded-bl-sm"
              }`}>
                <p className="leading-snug">{m.content}</p>
                <div className={`flex items-center gap-1 mt-1 ${propio ? "justify-end" : "justify-start"}`}>
                  <span className={`text-[10px] ${propio ? "text-white/70" : "text-gray-400"}`}>{timeLabel(m.sentAt)}</span>
                  {propio && (m.read ? <CheckCheck className="w-3 h-3 text-white/70" /> : <Check className="w-3 h-3 text-white/50" />)}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-4 py-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && enviar()}
            placeholder="Escribe un mensaje..."
            className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <motion.button
            onClick={enviar}
            disabled={!input.trim()}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
    </ProtectedRoute>
  );
}
