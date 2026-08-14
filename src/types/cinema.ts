export type MovieStatus = "now-showing" | "coming-soon" | "pre-sale";

export type AgeRating = "L" | "10" | "12" | "14" | "16" | "18";

export type SessionFormat = "2D" | "3D" | "Premium";

export type SessionLanguage = "Dublado" | "Legendado" | "Original";

export type SessionStatus =
  | "available"
  | "few-seats"
  | "sold-out"
  | "ended";

export type TicketType = "full" | "half" | "promo";

export type ProductCategory =
  | "combos"
  | "pipocas"
  | "bebidas"
  | "doces"
  | "colecionaveis";

export interface Movie {
  id: string;
  slug: string;
  title: string;
  originalTitle: string;
  synopsis: string;
  shortDescription: string;
  posterUrl: string;
  backdropUrl: string;
  trailerUrl: string;
  genre: string[];
  duration: number;
  ageRating: AgeRating;
  releaseDate: string;
  status: MovieStatus;
  director: string;
  cast: string[];
  distributor: string;
  languages: SessionLanguage[];
  formats: SessionFormat[];
  featured: boolean;
  isNewRelease?: boolean;
}

export interface Session {
  id: string;
  movieId: string;
  date: string;
  time: string;
  room: string;
  format: SessionFormat;
  language: SessionLanguage;
  status: SessionStatus;
  accessibility: boolean;
  price: number;
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  category: ProductCategory;
  priceFrom: number;
  badge?: string;
  variants?: ProductVariant[];
}

export interface Promotion {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface CinemaInfo {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  locationLabel: string;
  address: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    zip: string;
  };
  phone: string;
  whatsapp: string;
  email: string;
  businessHours: string;
  parking: string;
  accessibility: string;
  mapsUrl: string;
  social: {
    instagram?: { url: string; label: string };
    facebook?: { url: string; label: string };
    youtube?: { url: string; label: string };
  };
  rooms: Array<{
    name: string;
    capacity: number;
    features: string[];
  }>;
  experiences: Array<{
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    href: string;
  }>;
}

export interface TicketSelection {
  movieId: string;
  sessionId?: string;
  date?: string;
  quantities: Record<TicketType, number>;
  updatedAt: number;
}
