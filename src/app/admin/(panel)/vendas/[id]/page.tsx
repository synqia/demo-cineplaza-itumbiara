"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";

import { SaleStatusBadge } from "@/components/admin/StatusBadges";
import { useAdmin } from "@/components/admin/AdminProvider";
import { channelLabels, formatCurrency, formatDateTime } from "@/lib/admin";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function VendaDetalhePage() {
  const params = useParams<{ id: string }>();
  const { getSale } = useAdmin();
  const sale = getSale(params.id);

  if (!sale) {
    return (
      <div className="rounded-xl border border-border bg-card p-6">
        <h1 className="font-heading text-xl">Venda não encontrada</h1>
        <Link href="/admin/vendas" className={buttonVariants({ variant: "outline", className: "mt-4" })}>
          Voltar
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl">{sale.code}</h1>
          <p className="text-sm text-muted-foreground">
            {formatDateTime(sale.createdAt)} · {channelLabels[sale.channel]}
          </p>
        </div>
        <SaleStatusBadge status={sale.status} />
      </div>
      <div className="grid gap-3 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Itens</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm">
              {sale.movieTitle}
              <span className="block text-muted-foreground">{sale.sessionLabel}</span>
            </p>
            {sale.items.map((item) => (
              <div key={item.label} className="flex justify-between text-sm">
                <span>
                  {item.quantity}× {item.label}
                </span>
                <span>{formatCurrency(item.quantity * item.unitPrice)}</span>
              </div>
            ))}
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Taxa de serviço</span>
              <span>{formatCurrency(sale.fee)}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>{formatCurrency(sale.total)}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Cliente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>{sale.customer}</p>
            <p className="text-muted-foreground">{sale.email}</p>
            <p>Pagamento: {sale.paymentMethod}</p>
            <div className="flex flex-col gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() =>
                  toast.message("Reenvio simulado", {
                    description: "Nenhum e-mail real foi enviado.",
                  })
                }
              >
                Reenviar comprovante
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  toast.message("Estorno simulado", {
                    description: "Nenhuma transação financeira foi alterada.",
                  })
                }
              >
                Simular estorno
              </Button>
              <Link href="/admin/vendas" className={buttonVariants({ variant: "ghost" })}>
                Voltar à lista
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
