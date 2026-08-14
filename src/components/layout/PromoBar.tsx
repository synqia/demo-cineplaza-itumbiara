"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { promoBarCopy } from "@/data/promotions";

const SESSION_KEY = "cineplaza-promo-bar-dismissed";

export default function PromoBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        if (sessionStorage.getItem(SESSION_KEY) === "1") return;
        setVisible(true);
      } catch {
        setVisible(true);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // ignore
    }
  };

  if (!visible) return null;

  return (
    <div className="relative z-60 border-b border-border bg-surface-elevated">
      <div className="container-cine flex items-center justify-center gap-3 py-2.5 pr-10 text-center text-xs text-foreground sm:text-sm">
        <p>
          {promoBarCopy.text}{" "}
          <Link
            href={promoBarCopy.linkHref}
            className="font-semibold text-accent underline-offset-2 hover:underline"
          >
            {promoBarCopy.linkLabel}
          </Link>
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="absolute right-3 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Fechar barra promocional"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
