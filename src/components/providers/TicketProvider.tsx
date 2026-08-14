"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import TicketPurchaseDialog from "@/components/cinema/TicketPurchaseDialog";

interface TicketContextValue {
  openPurchase: (options?: { movieId?: string; sessionId?: string }) => void;
}

const TicketContext = createContext<TicketContextValue | null>(null);

export function TicketProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [movieId, setMovieId] = useState<string | undefined>();
  const [sessionId, setSessionId] = useState<string | undefined>();

  const openPurchase = useCallback(
    (options?: { movieId?: string; sessionId?: string }) => {
      setMovieId(options?.movieId);
      setSessionId(options?.sessionId);
      setOpen(true);
    },
    []
  );

  const value = useMemo(() => ({ openPurchase }), [openPurchase]);

  return (
    <TicketContext.Provider value={value}>
      {children}
      <TicketPurchaseDialog
        open={open}
        onOpenChange={setOpen}
        movieId={movieId}
        sessionId={sessionId}
      />
    </TicketContext.Provider>
  );
}

export function useTicketPurchase() {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error("useTicketPurchase deve ser usado dentro de TicketProvider");
  }
  return context;
}
