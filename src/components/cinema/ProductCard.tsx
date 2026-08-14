"use client";

import { useState } from "react";
import type { Product } from "@/types/cinema";
import ImageWithFallback from "@/components/cinema/ImageWithFallback";
import { formatPrice } from "@/data/products";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogPortal,
  DialogPopup,
  DialogTitle,
  DialogViewport,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [open, setOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.[0]?.id ?? ""
  );
  const [message, setMessage] = useState("");

  const confirm = () => {
    setMessage(
      "Pedido registrado neste protótipo. A compra do cardápio será concluída presencialmente no cinema."
    );
  };

  return (
    <>
      <article className="overflow-hidden rounded-2xl border border-border bg-surface">
        <div className="relative aspect-4/3 overflow-hidden">
          <ImageWithFallback
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover"
          />
          {product.badge ? (
            <span className="absolute left-3 top-3 rounded-md bg-accent px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-accent-foreground">
              {product.badge}
            </span>
          ) : null}
        </div>
        <div className="space-y-3 p-4">
          <h3 className="font-heading text-lg font-semibold">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.description}</p>
          <p className="text-sm font-semibold text-accent">
            A partir de {formatPrice(product.priceFrom)}
          </p>
          <Button
            type="button"
            className="h-11 w-full bg-primary hover:bg-primary-hover"
            onClick={() => {
              setMessage("");
              setOpen(true);
            }}
          >
            Ver opções
          </Button>
        </div>
      </article>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogPortal>
          <DialogBackdrop />
          <DialogViewport>
            <DialogPopup className="border-border bg-surface">
              <div className="flex items-start justify-between gap-3">
                <DialogTitle className="text-foreground">{product.name}</DialogTitle>
                <DialogClose
                  className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted"
                  aria-label="Fechar"
                >
                  <X className="h-5 w-5" />
                </DialogClose>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {product.description}
              </p>
              {product.variants?.length ? (
                <fieldset className="mt-4 space-y-2">
                  <legend className="text-sm font-medium">Variações</legend>
                  {product.variants.map((variant) => (
                    <label
                      key={variant.id}
                      className="flex cursor-pointer items-center justify-between rounded-xl border border-border bg-surface-elevated px-3 py-3 text-sm"
                    >
                      <span className="inline-flex items-center gap-2">
                        <input
                          type="radio"
                          name={`variant-${product.id}`}
                          checked={selectedVariant === variant.id}
                          onChange={() => setSelectedVariant(variant.id)}
                        />
                        {variant.name}
                      </span>
                      <span className="font-semibold text-accent">
                        {formatPrice(variant.price)}
                      </span>
                    </label>
                  ))}
                </fieldset>
              ) : null}
              {message ? (
                <p className="mt-4 rounded-xl border border-accent/30 bg-accent/10 p-3 text-sm" role="status">
                  {message}
                </p>
              ) : (
                <Button
                  type="button"
                  className="mt-5 h-11 w-full"
                  onClick={confirm}
                >
                  Adicionar (simulação)
                </Button>
              )}
            </DialogPopup>
          </DialogViewport>
        </DialogPortal>
      </Dialog>
    </>
  );
}
