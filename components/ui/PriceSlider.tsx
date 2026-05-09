"use client";

import * as Slider from "@radix-ui/react-slider";

interface PriceSliderProps {
  min?: number;
  max?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  step?: number;
}

export function PriceSlider({
  min = 0,
  max = 10000,
  value,
  onChange,
  step = 50,
}: PriceSliderProps) {
  return (
    <div className="px-1">
      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
        <span className="font-semibold text-gray-900 dark:text-white">
          Q{value[0].toLocaleString()}
        </span>
        <span className="font-semibold text-gray-900 dark:text-white">
          Q{value[1].toLocaleString()}
        </span>
      </div>
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={(v) => onChange(v as [number, number])}
      >
        <Slider.Track className="bg-gray-200 dark:bg-gray-600 relative grow rounded-full h-1.5">
          <Slider.Range className="absolute bg-primary rounded-full h-full" />
        </Slider.Track>
        {value.map((_, i) => (
          <Slider.Thumb
            key={i}
            className="block w-4 h-4 bg-white border-2 border-primary rounded-full shadow focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer hover:scale-110 transition-transform"
            aria-label={i === 0 ? "Precio mínimo" : "Precio máximo"}
          />
        ))}
      </Slider.Root>
    </div>
  );
}
