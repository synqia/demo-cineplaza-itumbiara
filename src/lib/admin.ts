import type { LucideIcon } from "lucide-react";
import {
  Armchair,
  BadgePercent,
  BarChart3,
  CalendarDays,
  Clapperboard,
  Clock,
  LayoutDashboard,
  Popcorn,
  Settings,
  Ticket,
  Wallet,
} from "lucide-react";

import type {
  AdminMovieStatus,
  PeriodKey,
  SaleChannel,
  SaleStatus,
} from "@/types/admin";

export const ADMIN_SIDEBAR_KEY = "cineplaza-admin-sidebar-collapsed";

export const adminNav: Array<{
  href: string;
  label: string;
  icon: LucideIcon;
}> = [
  { href: "/admin", label: "Visão geral", icon: LayoutDashboard },
  { href: "/admin/filmes", label: "Filmes", icon: Clapperboard },
  { href: "/admin/programacao", label: "Programação", icon: CalendarDays },
  { href: "/admin/sessoes", label: "Sessões", icon: Clock },
  { href: "/admin/salas", label: "Salas", icon: Armchair },
  { href: "/admin/vendas", label: "Vendas", icon: Ticket },
  { href: "/admin/financeiro", label: "Financeiro", icon: Wallet },
  { href: "/admin/bomboniere", label: "Bomboniere", icon: Popcorn },
  { href: "/admin/promocoes", label: "Promoções", icon: BadgePercent },
  { href: "/admin/relatorios", label: "Relatórios", icon: BarChart3 },
  { href: "/admin/configuracoes", label: "Configurações", icon: Settings },
];

export const movieStatusLabels: Record<AdminMovieStatus, string> = {
  "now-showing": "Em cartaz",
  "coming-soon": "Em breve",
  "pre-sale": "Pré-venda",
  archived: "Arquivado",
  draft: "Rascunho",
};

export const periodLabels: Record<PeriodKey, string> = {
  today: "Hoje",
  "7d": "Últimos 7 dias",
  month: "Este mês",
  "prev-month": "Mês anterior",
  custom: "Período personalizado",
};

export const channelLabels: Record<SaleChannel, string> = {
  site: "Site",
  "box-office": "Bilheteria",
  totem: "Totem",
  app: "Aplicativo",
};

export const saleStatusLabels: Record<SaleStatus, string> = {
  paid: "Pago",
  pending: "Pendente",
  cancelled: "Cancelado",
  refunded: "Estornado",
};

export function isAdminPath(pathname: string | null | undefined): boolean {
  return Boolean(pathname?.startsWith("/admin"));
}

export function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function formatNumber(value: number): string {
  return value.toLocaleString("pt-BR");
}

export function formatPercent(value: number, digits = 1): string {
  return `${value.toLocaleString("pt-BR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })}%`;
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatShortDate(dateKey: string): string {
  return new Date(`${dateKey}T12:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });
}

export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function isNavActive(pathname: string, href: string): boolean {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function getBreadcrumbs(pathname: string): Array<{ label: string; href?: string }> {
  const map: Record<string, string> = {
    admin: "Painel",
    filmes: "Filmes",
    novo: "Novo filme",
    programacao: "Programação",
    sessoes: "Sessões",
    salas: "Salas",
    vendas: "Vendas",
    financeiro: "Financeiro",
    bomboniere: "Bomboniere",
    promocoes: "Promoções",
    relatorios: "Relatórios",
    configuracoes: "Configurações",
  };

  const parts = pathname.split("/").filter(Boolean);
  const crumbs: Array<{ label: string; href?: string }> = [];
  let acc = "";

  parts.forEach((part, index) => {
    acc += `/${part}`;
    const isLast = index === parts.length - 1;
    const label =
      map[part] ??
      (part.startsWith("m") || part.startsWith("v") ? "Detalhe" : part);
    crumbs.push({
      label,
      href: isLast ? undefined : acc,
    });
  });

  return crumbs;
}
