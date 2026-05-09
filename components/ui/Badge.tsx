import { CheckCircle } from "lucide-react";

interface VerifiedBadgeProps {
  universidad: string;
  size?: "xs" | "sm" | "md";
  className?: string;
}

const sizeClasses = {
  xs: "text-[10px] px-1.5 py-0.5 gap-0.5",
  sm: "text-xs px-2 py-0.5 gap-1",
  md: "text-sm px-3 py-1 gap-1.5",
};

const iconSizes = { xs: "w-2.5 h-2.5", sm: "w-3 h-3", md: "w-3.5 h-3.5" };

export function VerifiedBadge({
  universidad,
  size = "sm",
  className = "",
}: VerifiedBadgeProps) {
  return (
    <span
      className={`inline-flex items-center bg-primary-light text-primary rounded-full font-medium ${sizeClasses[size]} ${className}`}
    >
      <CheckCircle className={`${iconSizes[size]} flex-shrink-0`} />
      {universidad}
    </span>
  );
}

/* Badge genérico de condición */
type Condicion = "nuevo" | "bueno" | "regular";

const condicionStyles: Record<
  Condicion,
  { label: string; classes: string }
> = {
  nuevo: {
    label: "Nuevo",
    classes:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  bueno: {
    label: "Buen estado",
    classes:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  regular: {
    label: "Regular",
    classes:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  },
};

export function CondicionBadge({
  condicion,
  size = "sm",
  className = "",
}: {
  condicion: Condicion;
  size?: "xs" | "sm" | "md";
  className?: string;
}) {
  const { label, classes } = condicionStyles[condicion];
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${sizeClasses[size]} ${classes} ${className}`}
    >
      {label}
    </span>
  );
}
