"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Clock, X, TrendingUp } from "lucide-react";
import { useSearch } from "@/hooks/useSearch";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  compact?: boolean;
}

export function SearchBar({
  placeholder = "Buscar en UMarket...",
  className = "",
  compact = false,
}: SearchBarProps) {
  const router = useRouter();
  const { query, setQuery, suggestions, history, addToHistory, clearHistory } =
    useSearch();
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  /* Cerrar dropdown al click fuera */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const submit = (term?: string) => {
    const q = (term ?? query).trim();
    if (!q) return;
    addToHistory(q);
    setOpen(false);
    setQuery(q);
    router.push(`/buscar?q=${encodeURIComponent(q)}`);
  };

  const showDropdown =
    open && (suggestions.length > 0 || history.length > 0);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div
        className={`flex items-center gap-2 bg-gray-100 dark:bg-gray-800 border border-transparent focus-within:border-primary focus-within:bg-white dark:focus-within:bg-gray-700 rounded-xl transition-all ${
          compact ? "px-3 py-2" : "px-4 py-2.5"
        }`}
      >
        <Search className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
            if (e.key === "Escape") setOpen(false);
          }}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none min-w-0"
        />
        {query && (
          <button
            onClick={() => { setQuery(""); inputRef.current?.focus(); }}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden z-50">
          {/* Sugerencias de publicaciones */}
          {suggestions.length > 0 && (
            <div>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-4 pt-3 pb-1">
                Resultados
              </p>
              {suggestions.map((s) => (
                <button
                  key={s.id}
                  onClick={() => submit(s.titulo)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 text-left transition-colors"
                >
                  <TrendingUp className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm text-gray-900 dark:text-white truncate">
                      {s.titulo}
                    </p>
                    <p className="text-xs text-gray-400">
                      {s.categoria} · Q{s.precio}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Historial */}
          {history.length > 0 && suggestions.length === 0 && (
            <div>
              <div className="flex items-center justify-between px-4 pt-3 pb-1">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                  Búsquedas recientes
                </p>
                <button
                  onClick={clearHistory}
                  className="text-[10px] text-primary hover:underline"
                >
                  Limpiar
                </button>
              </div>
              {history.map((h) => (
                <button
                  key={h}
                  onClick={() => submit(h)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 text-left transition-colors"
                >
                  <Clock className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {h}
                  </span>
                </button>
              ))}
            </div>
          )}
          <div className="h-2" />
        </div>
      )}
    </div>
  );
}
