"use client";

import { useState } from "react";

export default function DisclaimerBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso sobre protótipo de apresentação"
      className="fixed inset-0 z-90 flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/70" aria-hidden />
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-(--shadow-card)">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
            Protótipo de apresentação
          </p>
          <p className="text-sm leading-relaxed text-foreground">
            Este site é um material demonstrativo do{" "}
            <span className="font-semibold text-primary">Cineplaza</span>.
            Programação, filmes, preços, promoções e fluxos de compra são
            ilustrativos e serão validados antes de uma publicação oficial.
          </p>
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => setVisible(false)}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-hover"
            >
              Entendi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
