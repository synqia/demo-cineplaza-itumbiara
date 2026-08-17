"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";

import {
  initialAdminMovies,
  initialAdminProducts,
  initialAdminPromotions,
  initialAdminRooms,
  initialAdminSales,
  initialAdminSessions,
  initialAdminSettings,
  initialAlerts,
} from "@/data/admin";
import { movieStatusLabels, slugify } from "@/lib/admin";
import type {
  AdminMovie,
  AdminMovieStatus,
  AdminProduct,
  AdminPromotion,
  AdminRoom,
  AdminSale,
  AdminSession,
  AdminSettings,
} from "@/types/admin";

interface AdminContextValue {
  movies: AdminMovie[];
  sessions: AdminSession[];
  rooms: AdminRoom[];
  sales: AdminSale[];
  promotions: AdminPromotion[];
  products: AdminProduct[];
  settings: AdminSettings;
  getMovie: (id: string) => AdminMovie | undefined;
  getSale: (id: string) => AdminSale | undefined;
  addMovie: (movie: Omit<AdminMovie, "id" | "ticketsSold" | "futureSessions">) => string;
  updateMovie: (id: string, patch: Partial<AdminMovie>) => void;
  duplicateMovie: (id: string) => void;
  archiveMovie: (id: string) => void;
  setMovieStatus: (id: string, status: AdminMovieStatus) => void;
  addSession: (session: Omit<AdminSession, "id">) => void;
  updateSession: (id: string, patch: Partial<AdminSession>) => void;
  cancelSession: (id: string) => void;
  updateRoom: (id: string, patch: Partial<AdminRoom>) => void;
  updatePromotion: (id: string, patch: Partial<AdminPromotion>) => void;
  addPromotion: (promotion: Omit<AdminPromotion, "id" | "redemptions">) => void;
  updateProduct: (id: string, patch: Partial<AdminProduct>) => void;
  updateSettings: (patch: Partial<AdminSettings>) => void;
}

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [movies, setMovies] = useState(initialAdminMovies);
  const [sessions, setSessions] = useState(initialAdminSessions);
  const [rooms, setRooms] = useState(initialAdminRooms);
  const [sales] = useState(initialAdminSales);
  const [promotions, setPromotions] = useState(initialAdminPromotions);
  const [products, setProducts] = useState(initialAdminProducts);
  const [settings, setSettings] = useState(initialAdminSettings);

  const getMovie = useCallback(
    (id: string) => movies.find((movie) => movie.id === id),
    [movies]
  );
  const getSale = useCallback(
    (id: string) => sales.find((sale) => sale.id === id),
    [sales]
  );

  const addMovie: AdminContextValue["addMovie"] = useCallback((movie) => {
    const id = `m${Date.now()}`;
    setMovies((current) => [
      {
        ...movie,
        id,
        slug: movie.slug || slugify(movie.title),
        ticketsSold: 0,
        futureSessions: 0,
      },
      ...current,
    ]);
    toast.success("Filme cadastrado na demonstração.");
    return id;
  }, []);

  const updateMovie = useCallback((id: string, patch: Partial<AdminMovie>) => {
    setMovies((current) =>
      current.map((movie) => (movie.id === id ? { ...movie, ...patch } : movie))
    );
    toast.success("Alterações do filme aplicadas nesta sessão.");
  }, []);

  const duplicateMovie = useCallback((id: string) => {
    setMovies((current) => {
      const movie = current.find((item) => item.id === id);
      if (!movie) return current;
      const copy: AdminMovie = {
        ...movie,
        id: `m${Date.now()}`,
        title: `${movie.title} (cópia)`,
        slug: `${movie.slug}-copia`,
        status: "draft",
        featured: false,
        ticketsSold: 0,
        futureSessions: 0,
      };
      toast.success("Filme duplicado como rascunho.");
      return [copy, ...current];
    });
  }, []);

  const archiveMovie = useCallback((id: string) => {
    setMovies((current) =>
      current.map((movie) =>
        movie.id === id ? { ...movie, status: "archived", featured: false } : movie
      )
    );
    toast.success("Filme arquivado nesta demonstração.");
  }, []);

  const setMovieStatus = useCallback((id: string, status: AdminMovieStatus) => {
    setMovies((current) =>
      current.map((movie) => (movie.id === id ? { ...movie, status } : movie))
    );
    toast.success(`Status alterado para ${movieStatusLabels[status]}.`);
  }, []);

  const addSession = useCallback((session: Omit<AdminSession, "id">) => {
    setSessions((current) => [
      { ...session, id: `s${Date.now()}` },
      ...current,
    ]);
    toast.success("Sessão adicionada à programação demonstrativa.");
  }, []);

  const updateSession = useCallback((id: string, patch: Partial<AdminSession>) => {
    setSessions((current) =>
      current.map((session) =>
        session.id === id ? { ...session, ...patch } : session
      )
    );
    toast.success("Sessão atualizada.");
  }, []);

  const cancelSession = useCallback((id: string) => {
    setSessions((current) =>
      current.map((session) =>
        session.id === id
          ? { ...session, cancelled: true, status: "ended" }
          : session
      )
    );
    toast.success("Sessão cancelada nesta demonstração.");
  }, []);

  const updateRoom = useCallback((id: string, patch: Partial<AdminRoom>) => {
    setRooms((current) =>
      current.map((room) => (room.id === id ? { ...room, ...patch } : room))
    );
    toast.success("Sala atualizada.");
  }, []);

  const updatePromotion = useCallback(
    (id: string, patch: Partial<AdminPromotion>) => {
      setPromotions((current) =>
        current.map((promo) => (promo.id === id ? { ...promo, ...patch } : promo))
      );
      toast.success("Promoção atualizada.");
    },
    []
  );

  const addPromotion = useCallback(
    (promotion: Omit<AdminPromotion, "id" | "redemptions">) => {
      setPromotions((current) => [
        { ...promotion, id: `promo-${Date.now()}`, redemptions: 0 },
        ...current,
      ]);
      toast.success("Promoção criada na demonstração.");
    },
    []
  );

  const updateProduct = useCallback((id: string, patch: Partial<AdminProduct>) => {
    setProducts((current) =>
      current.map((product) =>
        product.id === id ? { ...product, ...patch } : product
      )
    );
    toast.success("Produto atualizado.");
  }, []);

  const updateSettings = useCallback((patch: Partial<AdminSettings>) => {
    setSettings((current) => ({ ...current, ...patch }));
    toast.success("Configurações salvas nesta sessão.");
  }, []);

  const value = useMemo(
    () => ({
      movies,
      sessions,
      rooms,
      sales,
      promotions,
      products,
      settings,
      getMovie,
      getSale,
      addMovie,
      updateMovie,
      duplicateMovie,
      archiveMovie,
      setMovieStatus,
      addSession,
      updateSession,
      cancelSession,
      updateRoom,
      updatePromotion,
      addPromotion,
      updateProduct,
      updateSettings,
    }),
    [
      movies,
      sessions,
      rooms,
      sales,
      promotions,
      products,
      settings,
      getMovie,
      getSale,
      addMovie,
      updateMovie,
      duplicateMovie,
      archiveMovie,
      setMovieStatus,
      addSession,
      updateSession,
      cancelSession,
      updateRoom,
      updatePromotion,
      addPromotion,
      updateProduct,
      updateSettings,
    ]
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin deve ser usado dentro de AdminProvider");
  }
  return context;
}

export { initialAlerts };
