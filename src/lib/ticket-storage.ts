import type { TicketSelection, TicketType } from "@/types/cinema";

const STORAGE_KEY = "cineplaza-ticket-selection";

export const emptyQuantities: Record<TicketType, number> = {
  full: 0,
  half: 0,
  promo: 0,
};

export function loadTicketSelection(): TicketSelection | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as TicketSelection;
  } catch {
    return null;
  }
}

export function saveTicketSelection(selection: TicketSelection): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(selection));
  } catch {
    // ignore
  }
}

export function clearTicketSelection(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
