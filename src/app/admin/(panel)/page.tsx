"use client";

import Link from "next/link";
import {
  Clapperboard,
  Info,
  Popcorn,
  Ticket,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { useMemo, useState } from "react";

import { OccupancyBar, AreaChart, BarChart, DonutChart, TrendBadge } from "@/components/admin/charts";
import { SeverityBadge } from "@/components/admin/StatusBadges";
import { useAdmin } from "@/components/admin/AdminProvider";
import {
  channelShare,
  dashboardKpis,
  getUpcomingSessionRows,
  occupancySlots,
  revenueSeries,
  topMovies,
  initialAlerts,
} from "@/data/admin";
import { formatCurrency, formatNumber, formatPercent, periodLabels } from "@/lib/admin";
import { sessionStatusCopy } from "@/lib/cinema";
import type { PeriodKey } from "@/types/admin";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const periodOptions: PeriodKey[] = ["today", "7d", "month", "prev-month", "custom"];

const kpiMeta = [
  {
    key: "grossRevenue" as const,
    label: "Receita bruta",
    icon: Wallet,
    format: formatCurrency,
    tip: "Soma de ingressos, bomboniere e taxa de serviço no período.",
  },
  {
    key: "ticketsSold" as const,
    label: "Ingressos vendidos",
    icon: Ticket,
    format: formatNumber,
    tip: "Quantidade de ingressos pagos no período selecionado.",
  },
  {
    key: "averageTicket" as const,
    label: "Ticket médio",
    icon: TrendingUp,
    format: formatCurrency,
    tip: "Receita bruta dividida pelo número de ingressos.",
  },
  {
    key: "occupancy" as const,
    label: "Ocupação média",
    icon: Users,
    format: (value: number) => formatPercent(value),
    tip: "Média de assentos ocupados nas sessões realizadas.",
  },
  {
    key: "concessionRevenue" as const,
    label: "Receita da bomboniere",
    icon: Popcorn,
    format: formatCurrency,
    tip: "Vendas de pipoca, bebidas, doces e combos.",
  },
  {
    key: "sessionsHeld" as const,
    label: "Sessões realizadas",
    icon: Clapperboard,
    format: formatNumber,
    tip: "Sessões que já ocorreram no período.",
  },
];

export default function AdminDashboardPage() {
  const { movies, sessions } = useAdmin();
  const [period, setPeriod] = useState<PeriodKey>("month");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const kpis = dashboardKpis[period];
  const series = revenueSeries[period];
  const upcoming = useMemo(
    () => getUpcomingSessionRows(sessions, movies),
    [sessions, movies]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="font-heading text-2xl">Visão geral</h1>
          <p className="text-sm text-muted-foreground">
            Indicadores operacionais do Cineplaza Itumbiara.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {periodOptions.map((option) => (
            <Button
              key={option}
              size="sm"
              variant={period === option ? "default" : "outline"}
              onClick={() => setPeriod(option)}
            >
              {periodLabels[option]}
            </Button>
          ))}
        </div>
      </div>

      {period === "custom" && (
        <Card>
          <CardContent className="flex flex-wrap items-end gap-3 pt-0">
            <div className="space-y-1">
              <Label htmlFor="from">De</Label>
              <Input
                id="from"
                type="date"
                value={customFrom}
                onChange={(event) => setCustomFrom(event.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="to">Até</Label>
              <Input
                id="to"
                type="date"
                value={customTo}
                onChange={(event) => setCustomTo(event.target.value)}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              O recorte personalizado apenas simula a variação dos indicadores.
            </p>
          </CardContent>
        </Card>
      )}

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {kpiMeta.map((item) => {
          const metric = kpis[item.key];
          return (
            <Card key={item.key}>
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardDescription className="inline-flex items-center gap-1">
                    {item.label}
                    <Tooltip>
                      <TooltipTrigger
                        className="rounded-sm text-muted-foreground"
                        aria-label={`Sobre ${item.label}`}
                      >
                        <Info className="size-3.5" />
                      </TooltipTrigger>
                      <TooltipContent>{item.tip}</TooltipContent>
                    </Tooltip>
                  </CardDescription>
                  <CardTitle className="mt-1 font-heading text-2xl tabular-nums">
                    {item.format(metric.current)}
                  </CardTitle>
                </div>
                <span className="rounded-lg bg-muted p-2 text-muted-foreground">
                  <item.icon className="size-4" />
                </span>
              </CardHeader>
              <CardContent className="flex items-center justify-between text-xs text-muted-foreground">
                <TrendBadge value={metric.change} />
                <span>
                  vs. período anterior ({item.format(metric.previous)})
                </span>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Evolução da receita</CardTitle>
            <CardDescription>
              Ingressos e bomboniere no recorte {periodLabels[period].toLowerCase()}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AreaChart
              labels={series.map((point) =>
                new Date(`${point.date}T12:00:00`).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                })
              )}
              series={[
                {
                  id: "tickets",
                  label: "Receita de ingressos",
                  color: "#f04452",
                  values: series.map((point) => point.tickets),
                },
                {
                  id: "concession",
                  label: "Receita de bomboniere",
                  color: "#f5b942",
                  values: series.map((point) => point.concession),
                },
              ]}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Vendas por canal</CardTitle>
            <CardDescription>Participação no período.</CardDescription>
          </CardHeader>
          <CardContent>
            <DonutChart
              items={[
                { label: "Site", value: channelShare[0].value, color: "#f04452" },
                { label: "Bilheteria", value: channelShare[1].value, color: "#f5b942" },
                { label: "Totem", value: channelShare[2].value, color: "#38bdf8" },
                { label: "Aplicativo", value: channelShare[3].value, color: "#34d399" },
              ]}
            />
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Ocupação por período</CardTitle>
            <CardDescription>Comparativo das faixas de horário.</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart items={occupancySlots.map((slot) => ({ label: slot.label, value: slot.value }))} />
          </CardContent>
        </Card>
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Filmes mais vendidos</CardTitle>
            <CardDescription>Ranking do período selecionado.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {topMovies.map((movie, index) => (
              <div
                key={movie.id}
                className="flex items-center gap-3 rounded-lg border border-border/70 p-2"
              >
                <span className="w-5 text-center text-sm text-muted-foreground">
                  {index + 1}
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={movie.posterUrl}
                  alt=""
                  className="h-12 w-8 rounded object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{movie.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatNumber(movie.ticketsSold)} ingressos · {formatCurrency(movie.revenue)}
                  </p>
                </div>
                <div className="hidden text-right sm:block">
                  <p className="text-xs text-muted-foreground">
                    {formatPercent(movie.occupancy)} ocupação
                  </p>
                  <TrendBadge value={movie.trend} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-5">
        <Card className="xl:col-span-3">
          <CardHeader>
            <CardTitle>Próximas sessões</CardTitle>
            <CardDescription>Ocupação em tempo quase real da demonstração.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcoming.map((session) => (
              <div
                key={session.id}
                className="grid gap-2 rounded-lg border border-border/70 p-3 sm:grid-cols-[auto_1fr_auto]"
              >
                <div>
                  <p className="font-heading text-sm">{session.time.slice(11)}</p>
                  <p className="text-xs text-muted-foreground">{session.room}</p>
                </div>
                <div>
                  <p className="text-sm">{session.movieTitle}</p>
                  <p className="text-xs text-muted-foreground">
                    {session.format} · {session.language}
                  </p>
                </div>
                <div className="sm:text-right">
                  <p className="text-xs text-muted-foreground">
                    {session.sold}/{session.capacity}
                  </p>
                  <OccupancyBar value={session.occupancy} className="sm:ml-auto" />
                  <Badge variant="outline" className="mt-1 rounded-md">
                    {sessionStatusCopy[session.status].label}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Alertas operacionais</CardTitle>
            <CardDescription>Itens que pedem atenção da equipe.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {initialAlerts.map((alert) => (
              <div key={alert.id} className="rounded-lg border border-border/70 p-3">
                <div className="mb-1 flex items-center justify-between gap-2">
                  <SeverityBadge severity={alert.severity} />
                  <span className="text-xs text-muted-foreground">{alert.time}</span>
                </div>
                <p className="text-sm font-medium">{alert.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{alert.description}</p>
                <Button
                  variant="link"
                  size="sm"
                  className="mt-1 h-auto px-0"
                  render={<Link href={alert.href} />}
                >
                  {alert.actionLabel}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
