"use client";

import { useState, useEffect, useMemo } from "react";
import { listings } from "@/lib/mock-data";
import type { Listing } from "@/lib/types";

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

  const suggestions: Listing[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return listings
      .filter(
        (p: Listing) =>
          p.title.toLowerCase().includes(q) ||
          p.category.name.toLowerCase().includes(q) ||
          p.seller.university.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [query]);

  const addToHistory = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    setHistory((prev) => {
      const next = [trimmed, ...prev.filter((h) => h !== trimmed)].slice(0, MAX_HISTORY);
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
