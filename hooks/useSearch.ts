"use client";

import { useState, useEffect, useMemo } from "react";
import { publicaciones } from "@/lib/mock-data";
import type { Publicacion } from "@/lib/types";

const STORAGE_KEY = "umarket-search-history";
const MAX_HISTORY = 8;

export function useSearch() {
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) setHistory(JSON.parse(stored));
    } catch {
      // sessionStorage no disponible
    }
  }, []);

  const suggestions: Publicacion[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return publicaciones
      .filter(
        (p) =>
          p.titulo.toLowerCase().includes(q) ||
          p.categoria.toLowerCase().includes(q) ||
          p.universidadNombre.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [query]);

  const addToHistory = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    setHistory((prev) => {
      const next = [trimmed, ...prev.filter((h) => h !== trimmed)].slice(
        0,
        MAX_HISTORY
      );
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    sessionStorage.removeItem(STORAGE_KEY);
  };

  return { query, setQuery, suggestions, history, addToHistory, clearHistory };
}
