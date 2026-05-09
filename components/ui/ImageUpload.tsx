"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { Upload, X, ImageIcon } from "lucide-react";

interface ImageUploadProps {
  images: string[];
  onAdd: (dataUrl: string) => void;
  onRemove: (index: number) => void;
  max?: number;
}

export function ImageUpload({
  images,
  onAdd,
  onRemove,
  max = 5,
}: ImageUploadProps) {
  const [dragOver, setDragOver] = useState(false);

  const processFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
      if (images.length >= max) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === "string") onAdd(result);
      };
      reader.readAsDataURL(file);
    },
    [images.length, max, onAdd]
  );

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach(processFile);
  };

  return (
    <div className="space-y-3">
      {/* Drop zone */}
      {images.length < max && (
        <label
          className={`flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-2xl cursor-pointer transition-colors ${
            dragOver
              ? "border-primary bg-primary-50 dark:bg-primary/10"
              : "border-gray-300 dark:border-gray-600 hover:border-primary hover:bg-gray-50 dark:hover:bg-gray-800"
          }`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            handleFiles(e.dataTransfer.files);
          }}
        >
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <Upload className="w-6 h-6 text-gray-400 mb-2" />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Arrastra fotos aquí o{" "}
            <span className="text-primary font-medium">selecciona</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {images.length}/{max} fotos · JPG, PNG, WEBP
          </p>
        </label>
      )}

      {/* Preview grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {images.map((src, i) => (
            <div key={i} className="relative aspect-square group rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700">
              <Image src={src} alt={`Foto ${i + 1}`} fill className="object-cover" />
              {/* Overlay al hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => onRemove(i)}
                  className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow"
                >
                  <X className="w-3.5 h-3.5 text-gray-700" />
                </button>
              </div>
              {i === 0 && (
                <div className="absolute bottom-1 left-1 bg-primary text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                  <ImageIcon className="w-2.5 h-2.5" />
                  Principal
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
