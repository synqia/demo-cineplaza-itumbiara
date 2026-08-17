"use client";

import { BarChart, DonutChart } from "@/components/admin/charts";
import { financeBreakdown, paymentMethods } from "@/data/admin";
import { formatCurrency } from "@/lib/admin";
import { toast } from "sonner";
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

const dailyClose = [
  { date: "17/08", box: 8420.5, concession: 2310.0, difference: 0 },
  { date: "16/08", box: 7910.0, concession: 1980.4, difference: -42 },
  { date: "15/08", box: 8640.2, concession: 2540.8, difference: 0 },
  { date: "14/08", box: 6120.0, concession: 1710.0, difference: 12 },
];

export default function FinanceiroPage() {
  const net = financeBreakdown.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl">Financeiro</h1>
          <p className="text-sm text-muted-foreground">
            Resultado demonstrativo do mês · líquido {formatCurrency(net)}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() =>
            toast.success("Fechamento simulado", {
              description: "Nenhum caixa real foi consolidado.",
            })
          }
        >
          Simular fechamento
        </Button>
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Composição da receita</CardTitle>
            <CardDescription>Valores do mês corrente na demonstração.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {financeBreakdown.map((item) => (
              <div key={item.label} className="flex items-center justify-between text-sm">
                <span>{item.label}</span>
                <span className="tabular-nums">{formatCurrency(item.value)}</span>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Meios de pagamento</CardTitle>
          </CardHeader>
          <CardContent>
            <DonutChart
              items={[
                { label: "Pix", value: paymentMethods[0].value, color: "#34d399" },
                { label: "Crédito", value: paymentMethods[1].value, color: "#f04452" },
                { label: "Débito", value: paymentMethods[2].value, color: "#38bdf8" },
                { label: "Dinheiro", value: paymentMethods[3].value, color: "#f5b942" },
              ]}
            />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Fechamento diário</CardTitle>
          <CardDescription>Divergências são simuladas para o protótipo.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Bilheteria</TableHead>
                <TableHead>Bomboniere</TableHead>
                <TableHead>Divergência</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dailyClose.map((row) => (
                <TableRow key={row.date}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{formatCurrency(row.box)}</TableCell>
                  <TableCell>{formatCurrency(row.concession)}</TableCell>
                  <TableCell className={row.difference !== 0 ? "text-primary" : ""}>
                    {formatCurrency(row.difference)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Participação por origem</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart
            items={[
              { label: "Ingressos", value: 71 },
              { label: "Bomboniere", value: 20 },
              { label: "Taxa de serviço", value: 9 },
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
}
