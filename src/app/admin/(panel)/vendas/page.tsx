"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { SaleStatusBadge } from "@/components/admin/StatusBadges";
import { useAdmin } from "@/components/admin/AdminProvider";
import { channelLabels, formatCurrency, formatDateTime, saleStatusLabels } from "@/lib/admin";
import type { SaleChannel, SaleStatus } from "@/types/admin";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function VendasPage() {
  const { sales } = useAdmin();
  const [query, setQuery] = useState("");
  const [channel, setChannel] = useState<SaleChannel | "all">("all");
  const [status, setStatus] = useState<SaleStatus | "all">("all");

  const filtered = useMemo(
    () =>
      sales.filter((sale) => {
        if (
          query &&
          !`${sale.code} ${sale.customer} ${sale.movieTitle}`
            .toLowerCase()
            .includes(query.toLowerCase())
        ) {
          return false;
        }
        if (channel !== "all" && sale.channel !== channel) return false;
        if (status !== "all" && sale.status !== status) return false;
        return true;
      }),
    [sales, query, channel, status]
  );

  const total = filtered
    .filter((sale) => sale.status === "paid")
    .reduce((sum, sale) => sum + sale.total, 0);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-heading text-2xl">Vendas</h1>
        <p className="text-sm text-muted-foreground">
          {filtered.length} pedidos · {formatCurrency(total)} pagos no recorte
        </p>
      </div>
      <div className="grid gap-2 md:grid-cols-3">
        <Input
          placeholder="Código, cliente ou filme"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <Select
          value={channel}
          onValueChange={(value) => value && setChannel(value as SaleChannel | "all")}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os canais</SelectItem>
            {Object.entries(channelLabels).map(([id, label]) => (
              <SelectItem key={id} value={id}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={status}
          onValueChange={(value) => value && setStatus(value as SaleStatus | "all")}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            {Object.entries(saleStatusLabels).map(([id, label]) => (
              <SelectItem key={id} value={id}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pedido</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Filme</TableHead>
              <TableHead>Canal</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>
                  <p className="font-medium">{sale.code}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDateTime(sale.createdAt)}
                  </p>
                </TableCell>
                <TableCell>{sale.customer}</TableCell>
                <TableCell>
                  <p>{sale.movieTitle}</p>
                  <p className="text-xs text-muted-foreground">{sale.sessionLabel}</p>
                </TableCell>
                <TableCell>{channelLabels[sale.channel]}</TableCell>
                <TableCell>
                  <SaleStatusBadge status={sale.status} />
                </TableCell>
                <TableCell>{formatCurrency(sale.total)}</TableCell>
                <TableCell>
                  <Link
                    href={`/admin/vendas/${sale.id}`}
                    className={buttonVariants({ variant: "ghost", size: "sm" })}
                  >
                    Detalhe
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
