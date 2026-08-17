import type { AgeRating, SessionStatus, TicketType } from "@/types/cinema";
import { ticketPrices } from "@/data/cinema";

export const ageRatingLabels: Record<AgeRating, string> = {
  L: "Livre",
  "10": "10 anos",
  "12": "12 anos",
  "14": "14 anos",
  "16": "16 anos",
  "18": "18 anos",
};

export const ageRatingColors: Record<AgeRating, string> = {
  L: "bg-emerald-600 text-white",
  "10": "bg-sky-500 text-white",
  "12": "bg-amber-500 text-black",
  "14": "bg-orange-500 text-white",
  "16": "bg-red-600 text-white",
  "18": "bg-black text-white border border-white/40",
};

export function getAgeRatingAriaLabel(rating: AgeRating): string {
  return `Classificação: ${ageRatingLabels[rating]}`;
}

export const sessionStatusCopy: Record<
  SessionStatus,
  { label: string; description: string }
> = {
  available: { label: "Disponível", description: "Ingressos disponíveis" },
  "few-seats": {
    label: "Poucos lugares",
    description: "Restam poucos assentos",
  },
  "sold-out": { label: "Esgotado", description: "Sessão esgotada" },
  ended: { label: "Encerrada", description: "Sessão encerrada" },
};

export const ticketTypeLabels: Record<TicketType, string> = {
  full: "Inteira",
  half: "Meia-entrada",
  promo: "Quarta promocional",
};

export function calculateTicketTotal(
  quantities: Record<TicketType, number>
): { subtotal: number; fee: number; total: number; count: number } {
  const count =
    quantities.full + quantities.half + quantities.promo;
  const subtotal =
    quantities.full * ticketPrices.full +
    quantities.half * ticketPrices.half +
    quantities.promo * ticketPrices.promo;
  const fee = count > 0 ? ticketPrices.serviceFee * count : 0;
  return { subtotal, fee, total: subtotal + fee, count };
}

export function formatDateLabel(dateKey: string): {
  weekday: string;
  day: string;
  month: string;
  full: string;
  isToday: boolean;
  isTomorrow: boolean;
} {
  const date = new Date(`${dateKey}T12:00:00`);
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const isToday = dateKey === toDateKey(today);
  const isTomorrow = dateKey === toDateKey(tomorrow);

  const weekday = date.toLocaleDateString("pt-BR", { weekday: "short" });
  const day = date.toLocaleDateString("pt-BR", { day: "2-digit" });
  const month = date.toLocaleDateString("pt-BR", { month: "short" });
  const full = date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });

  return {
    weekday: weekday.replace(".", ""),
    day,
    month: month.replace(".", ""),
    full,
    isToday,
    isTomorrow,
  };
}

function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatReleaseDate(dateKey: string): string {
  const date = new Date(`${dateKey}T12:00:00`);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
