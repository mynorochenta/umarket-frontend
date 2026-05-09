"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export function useInfiniteScroll<T>(items: T[], pageSize = 12) {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const displayed = items.slice(0, page * pageSize);
  const hasMore = displayed.length < items.length;

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    setTimeout(() => {
      setPage((p) => p + 1);
      setIsLoading(false);
    }, 700);
  }, [isLoading, hasMore]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { threshold: 0.1 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  /* Reiniciar al cambiar los items (p.ej. al aplicar filtros) */
  useEffect(() => {
    setPage(1);
  }, [items]);

  return { displayed, hasMore, isLoading, sentinelRef };
}
