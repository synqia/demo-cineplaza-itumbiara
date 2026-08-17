"use client";

import { useState } from "react";
import { toast } from "sonner";

import { dashboardKpis, topMovies } from "@/data/admin";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/admin";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const reports = [
  {
    id: "occupancy",
    title: "Ocupação por filme",
    description: "Assentos vendidos, capacidade e taxa média.",
  },
  {
    id: "sales",
    title: "Vendas por canal",
    description: "Site, bilheteria, totem e aplicativo.",
  },
  {
    id: "concession",
    title: "Mix da bomboniere",
    description: "Itens, estoque e contribuição na receita.",
  },
  {
    id: "promo",
    title: "Desempenho de promoções",
    description: "Resgates e impacto no ticket médio.",
  },
];

export default function RelatoriosPage() {
  const [tab, setTab] = useState("occupancy");
  const month = dashboardKpis.month;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl">Relatórios</h1>
          <p className="text-sm text-muted-foreground">
            Extrações ilustrativas para a operação do cinema.
          </p>
        </div>
        <Button
          onClick={() =>
            toast.success("Relatório gerado", {
              description: "Nenhum arquivo foi enviado ou armazenado.",
            })
          }
        >
          Gerar recorte
        </Button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {reports.map((report) => (
          <Card key={report.id}>
            <CardHeader>
              <CardTitle className="text-base">{report.title}</CardTitle>
              <CardDescription>{report.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="occupancy">Ocupação</TabsTrigger>
          <TabsTrigger value="sales">Vendas</TabsTrigger>
          <TabsTrigger value="summary">Resumo</TabsTrigger>
        </TabsList>
        <TabsContent value="occupancy">
          <Card>
            <CardContent className="pt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Filme</TableHead>
                    <TableHead>Ingressos</TableHead>
                    <TableHead>Receita</TableHead>
                    <TableHead>Ocupação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topMovies.map((movie) => (
                    <TableRow key={movie.id}>
                      <TableCell>{movie.title}</TableCell>
                      <TableCell>{formatNumber(movie.ticketsSold)}</TableCell>
                      <TableCell>{formatCurrency(movie.revenue)}</TableCell>
                      <TableCell>{formatPercent(movie.occupancy)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sales">
          <Card>
            <CardContent className="grid gap-2 pt-0 text-sm">
              <p>Site: 38% · {formatCurrency(month.grossRevenue.current * 0.38)}</p>
              <p>Bilheteria: 30% · {formatCurrency(month.grossRevenue.current * 0.3)}</p>
              <p>Totem: 19% · {formatCurrency(month.grossRevenue.current * 0.19)}</p>
              <p>Aplicativo: 13% · {formatCurrency(month.grossRevenue.current * 0.13)}</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="summary">
          <Card>
            <CardContent className="grid gap-2 pt-0 text-sm">
              <p>Receita bruta: {formatCurrency(month.grossRevenue.current)}</p>
              <p>Ingressos: {formatNumber(month.ticketsSold.current)}</p>
              <p>Ticket médio: {formatCurrency(month.averageTicket.current)}</p>
              <p>Ocupação: {formatPercent(month.occupancy.current)}</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
