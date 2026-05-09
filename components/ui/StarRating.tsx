"use client";

import { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  max?: number;
  count?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}

const starSizes = {
  xs: "w-3 h-3",
  sm: "w-3.5 h-3.5",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

export function StarRating({
  rating,
  max = 5,
  count,
  interactive = false,
  onChange,
  size = "sm",
  className = "",
}: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const displayed = hovered ?? rating;
  const sz = starSizes[size];

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex gap-0.5">
        {Array.from({ length: max }, (_, i) => {
          const filled = i < displayed;
          return (
            <Star
              key={i}
              className={`${sz} transition-colors ${
                filled
                  ? "fill-amber-400 text-amber-400"
                  : "fill-gray-200 text-gray-200 dark:fill-gray-600 dark:text-gray-600"
              } ${interactive ? "cursor-pointer hover:scale-110 transition-transform" : ""}`}
              onMouseEnter={() => interactive && setHovered(i + 1)}
              onMouseLeave={() => interactive && setHovered(null)}
              onClick={() => interactive && onChange?.(i + 1)}
            />
          );
        })}
      </div>
      {count !== undefined && (
        <span className="text-xs text-gray-500 dark:text-gray-400">
          ({count})
        </span>
      )}
    </div>
  );
}
