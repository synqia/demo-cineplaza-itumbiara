import type {
  AgeRating,
  Movie,
  Product,
  Promotion,
  Session,
  SessionFormat,
  SessionLanguage,
} from "@/types/cinema";

export type AdminMovieStatus =
  | "now-showing"
  | "coming-soon"
  | "pre-sale"
  | "archived"
  | "draft";

export interface AdminMovie extends Omit<Movie, "status"> {
  status: AdminMovieStatus;
  year: number;
  country: string;
  endDate?: string;
  ageRatingNote?: string;
  metaTitle?: string;
  metaDescription?: string;
  ticketsSold: number;
  futureSessions: number;
  allowPresale: boolean;
}

export interface AdminRoom {
  id: string;
  name: string;
  shortName: string;
  capacity: number;
  features: string[];
  formats: SessionFormat[];
  status: "active" | "maintenance";
  occupancyToday: number;
}

export interface AdminSession extends Session {
  sold: number;
  capacity: number;
  occupancy: number;
  cancelled?: boolean;
}

export type SaleChannel = "site" | "box-office" | "totem" | "app";
export type SaleStatus = "paid" | "pending" | "cancelled" | "refunded";

export interface AdminSaleItem {
  label: string;
  quantity: number;
  unitPrice: number;
}

export interface AdminSale {
  id: string;
  code: string;
  createdAt: string;
  channel: SaleChannel;
  status: SaleStatus;
  customer: string;
  email: string;
  movieTitle: string;
  sessionLabel: string;
  items: AdminSaleItem[];
  subtotal: number;
  fee: number;
  total: number;
  paymentMethod: string;
}

export interface AdminPromotion extends Promotion {
  status: "active" | "scheduled" | "ended" | "draft";
  startsAt: string;
  endsAt: string;
  discountLabel: string;
  scope: string;
  redemptions: number;
}

export interface AdminProduct extends Product {
  stock: number;
  soldPeriod: number;
  revenuePeriod: number;
  lowStock: boolean;
}

export interface AdminSettings {
  name: string;
  tagline: string;
  email: string;
  phone: string;
  whatsapp: string;
  businessHours: string;
  address: string;
  parking: string;
  accessibility: string;
  fullPrice: number;
  halfPrice: number;
  promoPrice: number;
  serviceFee: number;
}

export type PeriodKey = "today" | "7d" | "month" | "prev-month" | "custom";

export interface KpiMetric {
  current: number;
  previous: number;
  change: number;
}

export interface DashboardKpis {
  grossRevenue: KpiMetric;
  ticketsSold: KpiMetric;
  averageTicket: KpiMetric;
  occupancy: KpiMetric;
  concessionRevenue: KpiMetric;
  sessionsHeld: KpiMetric;
}

export interface RevenuePoint {
  date: string;
  tickets: number;
  concession: number;
}

export interface ChannelShare {
  id: SaleChannel;
  label: string;
  value: number;
}

export interface OccupancySlot {
  id: string;
  label: string;
  value: number;
}

export interface TopMovie {
  id: string;
  title: string;
  posterUrl: string;
  ticketsSold: number;
  revenue: number;
  occupancy: number;
  trend: number;
}

export type AlertSeverity = "critical" | "warning" | "info";

export interface AdminAlert {
  id: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  time: string;
  href: string;
  actionLabel: string;
}

export interface UpcomingSessionRow {
  id: string;
  time: string;
  movieTitle: string;
  room: string;
  format: SessionFormat;
  language: SessionLanguage;
  sold: number;
  capacity: number;
  occupancy: number;
  status: Session["status"];
}

export type AgeRatingValue = AgeRating;
