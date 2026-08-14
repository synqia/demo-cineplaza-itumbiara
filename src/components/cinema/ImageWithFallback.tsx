"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { Film } from "lucide-react";
import { cn } from "@/lib/utils";

type ImageWithFallbackProps = Omit<ImageProps, "onError"> & {
  fallbackLabel?: string;
};

export default function ImageWithFallback({
  alt,
  className,
  fallbackLabel = "Imagem indisponível",
  ...props
}: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          "flex h-full w-full flex-col items-center justify-center gap-2 bg-surface-elevated text-muted-foreground",
          className
        )}
        role="img"
        aria-label={alt || fallbackLabel}
      >
        <Film className="h-8 w-8 opacity-60" aria-hidden />
        <span className="px-3 text-center text-xs">{fallbackLabel}</span>
      </div>
    );
  }

  return (
    <Image
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
      {...props}
    />
  );
}
