"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogPortal,
  DialogPopup,
  DialogTitle,
  DialogViewport,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getMovieById, getNowShowingMovies, movies } from "@/data/movies";
import { getSessionById, getSessionsByMovie, getScheduleDates } from "@/data/sessions";
import { ticketPrices } from "@/data/cinema";
import {
  calculateTicketTotal,
  formatDateLabel,
  ticketTypeLabels,
} from "@/lib/cinema";
import { formatPrice } from "@/data/products";
import {
  clearTicketSelection,
  emptyQuantities,
  loadTicketSelection,
  saveTicketSelection,
} from "@/lib/ticket-storage";
import type { Session, TicketType } from "@/types/cinema";
import { Minus, Plus, X } from "lucide-react";
import DateSelector from "@/components/cinema/DateSelector";
import SessionTimeButton from "@/components/cinema/SessionTimeButton";

interface TicketPurchaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  movieId?: string;
  sessionId?: string;
}

type Step = "movie" | "session" | "tickets" | "summary" | "done";

export default function TicketPurchaseDialog({
  open,
  onOpenChange,
  movieId,
  sessionId,
}: TicketPurchaseDialogProps) {
  const dates = useMemo(() => getScheduleDates(7), []);
  const purchasableMovies = useMemo(
    () =>
      movies.filter(
        (item) => item.status === "now-showing" || item.status === "pre-sale"
      ),
    []
  );
  const [step, setStep] = useState<Step>("movie");
  const [selectedMovieId, setSelectedMovieId] = useState(movieId ?? "");
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedSessionId, setSelectedSessionId] = useState(sessionId ?? "");
  const [quantities, setQuantities] =
    useState<Record<TicketType, number>>(emptyQuantities);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => {
      const stored = loadTicketSelection();
      const nextMovieId = movieId || stored?.movieId || "";
      setSelectedMovieId(nextMovieId);
      setSelectedSessionId(sessionId || stored?.sessionId || "");
      setSelectedDate(stored?.date || dates[0]);
      setQuantities(stored?.quantities || emptyQuantities);
      if (sessionId) setStep("tickets");
      else if (nextMovieId) setStep("session");
      else setStep("movie");
    }, 0);
    return () => window.clearTimeout(timer);
  }, [open, movieId, sessionId, dates]);

  useEffect(() => {
    if (!open || !selectedMovieId) return;
    saveTicketSelection({
      movieId: selectedMovieId,
      sessionId: selectedSessionId || undefined,
      date: selectedDate,
      quantities,
      updatedAt: Date.now(),
    });
  }, [open, selectedMovieId, selectedSessionId, selectedDate, quantities]);

  const movie = selectedMovieId ? getMovieById(selectedMovieId) : undefined;
  const session = selectedSessionId
    ? getSessionById(selectedSessionId)
    : undefined;
  const daySessions = selectedMovieId
    ? getSessionsByMovie(selectedMovieId, selectedDate)
    : [];
  const totals = calculateTicketTotal(quantities);

  const updateQuantity = (type: TicketType, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [type]: Math.max(0, Math.min(10, prev[type] + delta)),
    }));
  };

  const handleSelectSession = (next: Session) => {
    setSelectedSessionId(next.id);
    setSelectedDate(next.date);
    setStep("tickets");
  };

  const handleClose = (nextOpen: boolean) => {
    onOpenChange(nextOpen);
    if (!nextOpen && step === "done") {
      clearTicketSelection();
      setQuantities(emptyQuantities);
      setSelectedSessionId("");
      setStep("session");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogPortal>
        <DialogBackdrop />
        <DialogViewport className="max-w-lg sm:max-w-160">
          <DialogPopup className="max-h-[min(88dvh,100%)] border-border bg-surface p-4 text-foreground sm:max-h-[85vh] sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <DialogTitle className="text-base text-foreground sm:text-lg">
                  {step === "done" ? "Protótipo" : "Comprar ingressos"}
                </DialogTitle>
                <p className="mt-0.5 text-xs text-muted-foreground sm:mt-1 sm:text-sm">
                  {movie?.title ?? "Selecione filme e sessão"}
                </p>
              </div>
              <DialogClose
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="Fechar"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </DialogClose>
            </div>

            <div className="mt-4 space-y-4 sm:mt-6 sm:space-y-6">
              {step === "movie" ? (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Escolha o filme para continuar.
                  </p>
                  <div className="max-h-56 space-y-2 overflow-y-auto pr-1 sm:max-h-72">
                    {(purchasableMovies.length
                      ? purchasableMovies
                      : getNowShowingMovies()
                    ).map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className="flex w-full items-center justify-between rounded-lg border border-border bg-surface-elevated px-3 py-2.5 text-left text-sm hover:border-primary sm:rounded-xl sm:px-4 sm:py-3"
                        onClick={() => {
                          setSelectedMovieId(item.id);
                          setSelectedSessionId("");
                          setStep("session");
                        }}
                      >
                        <span className="font-medium text-foreground">
                          {item.title}
                        </span>
                        {/* <span className="text-xs uppercase tracking-wide text-muted-foreground">
                          {item.status === "pre-sale" ? "Pré-venda" : "Em cartaz"}
                        </span> */}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              {step === "session" && movie ? (
                <>
                  <button
                    type="button"
                    className="text-sm font-medium text-primary hover:text-primary-hover"
                    onClick={() => setStep("movie")}
                  >
                    Trocar filme
                  </button>
                  <DateSelector
                    dates={dates}
                    selected={selectedDate}
                    onChange={setSelectedDate}
                  />
                  {daySessions.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      Não há sessões para esta data. Escolha outro dia.
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {daySessions.map((item) => (
                        <SessionTimeButton
                          key={item.id}
                          session={item}
                          onSelect={handleSelectSession}
                        />
                      ))}
                    </div>
                  )}
                </>
              ) : null}

              {step === "tickets" && session ? (
                <>
                  <div className="rounded-xl border border-border bg-surface-elevated p-4 text-sm">
                    <p className="font-semibold text-foreground">{movie?.title}</p>
                    <p className="mt-1 text-muted-foreground">
                      {formatDateLabel(session.date).full} · {session.time} ·{" "}
                      {session.room} · {session.format} · {session.language}
                    </p>
                  </div>
                  <div className="space-y-3">
                    {(Object.keys(ticketTypeLabels) as TicketType[]).map(
                      (type) => (
                        <div
                          key={type}
                          className="flex items-center justify-between rounded-lg border border-border bg-surface-elevated px-3 py-2.5 sm:rounded-xl sm:px-4 sm:py-3"
                        >
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {ticketTypeLabels[type]}
                            </p>
                            <p className="text-xs text-muted-foreground sm:text-sm">
                              {formatPrice(ticketPrices[type])}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 sm:gap-3">
                            <button
                              type="button"
                              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border sm:h-10 sm:w-10"
                              aria-label={`Diminuir ${ticketTypeLabels[type]}`}
                              onClick={() => updateQuantity(type, -1)}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-5 text-center font-heading text-base sm:w-6 sm:text-lg">
                              {quantities[type]}
                            </span>
                            <button
                              type="button"
                              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border sm:h-10 sm:w-10"
                              aria-label={`Aumentar ${ticketTypeLabels[type]}`}
                              onClick={() => updateQuantity(type, 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">
                      {formatPrice(totals.subtotal)}
                    </span>
                  </div>
                  <Button
                    type="button"
                    className="h-10 w-full bg-primary hover:bg-primary-hover sm:h-11"
                    disabled={totals.count === 0}
                    onClick={() => setStep("summary")}
                  >
                    Ver resumo
                  </Button>
                </>
              ) : null}

              {step === "summary" && session && movie ? (
                <>
                  <dl className="space-y-3 rounded-xl border border-border bg-surface-elevated p-4 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">Filme</dt>
                      <dd className="text-right font-medium">{movie.title}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">Data</dt>
                      <dd className="text-right">
                        {formatDateLabel(session.date).full}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">Sessão</dt>
                      <dd className="text-right">{session.time}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">Sala</dt>
                      <dd className="text-right">{session.room}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">Formato</dt>
                      <dd className="text-right">
                        {session.format} · {session.language}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">Quantidade</dt>
                      <dd className="text-right">{totals.count}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">Taxa de serviço</dt>
                      <dd className="text-right">{formatPrice(totals.fee)}</dd>
                    </div>
                    <div className="flex justify-between gap-4 border-t border-border pt-3">
                      <dt className="font-semibold">Total</dt>
                      <dd className="font-heading text-lg font-bold text-accent">
                        {formatPrice(totals.total)}
                      </dd>
                    </div>
                  </dl>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Button
                      type="button"
                      variant="outline"
                      className="h-10 flex-1 sm:h-11"
                      onClick={() => setStep("tickets")}
                    >
                      Voltar
                    </Button>
                    <Button
                      type="button"
                      className="h-10 flex-1 bg-primary hover:bg-primary-hover sm:h-11"
                      onClick={() => setStep("done")}
                    >
                      Continuar para pagamento
                    </Button>
                  </div>
                </>
              ) : null}

              {step === "done" ? (
                <div className="rounded-xl border border-accent/30 bg-accent/10 p-5 text-sm leading-relaxed text-foreground">
                  <p className="font-heading text-lg font-semibold text-accent">
                    Quase lá!
                  </p>
                  <p className="mt-2">
                    Este é um protótipo demonstrativo. A integração com pagamento
                    será adicionada em uma próxima etapa.
                  </p>
                  <Button
                    type="button"
                    className="mt-4 h-10 w-full sm:mt-5 sm:h-11"
                    onClick={() => handleClose(false)}
                  >
                    Entendi
                  </Button>
                </div>
              ) : null}
            </div>
          </DialogPopup>
        </DialogViewport>
      </DialogPortal>
    </Dialog>
  );
}
