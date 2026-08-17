"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSuccess(false);

    if (!emailRegex.test(email)) {
      setError("Informe um e-mail válido.");
      return;
    }
    if (!consent) {
      setError("É necessário autorizar o recebimento de comunicações.");
      return;
    }

    setError("");
    setSuccess(true);
    setEmail("");
    setConsent(false);
  };

  return (
    <section className="section-padding">
      <div className="container-cine">
        <div className="overflow-hidden rounded-2xl border border-border bg-surface px-5 py-8 sm:px-8 sm:py-10">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-[clamp(1.5rem,3vw,2rem)] font-bold">
              Receba estreias, sessões especiais e promoções
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Cadastro demonstrativo, nenhum e-mail é enviado neste protótipo.
            </p>
          </div>
          <form
            onSubmit={onSubmit}
            className="mx-auto mt-6 flex max-w-xl flex-col gap-4"
            noValidate
          >
            <label className="block text-left text-sm">
              <span className="mb-1.5 block text-muted-foreground">E-mail</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-12 w-full rounded-xl border border-border bg-surface-elevated px-4 text-foreground"
                placeholder="seuemail@exemplo.com"
                autoComplete="email"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "newsletter-error" : undefined}
              />
            </label>
            <label className="flex items-start gap-3 text-left text-sm text-muted-foreground">
              <input
                type="checkbox"
                checked={consent}
                onChange={(event) => setConsent(event.target.checked)}
                className="mt-1"
              />
              <span>
                Autorizo o Cineplaza a enviar comunicações sobre filmes,
                promoções e experiências por e-mail.
              </span>
            </label>
            {error ? (
              <p id="newsletter-error" className="text-sm text-destructive" role="alert">
                {error}
              </p>
            ) : null}
            {success ? (
              <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300" role="status">
                Pronto! Cadastro simulado com sucesso.
              </p>
            ) : null}
            <Button type="submit" className="h-12 bg-primary hover:bg-primary-hover">
              Quero receber
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
