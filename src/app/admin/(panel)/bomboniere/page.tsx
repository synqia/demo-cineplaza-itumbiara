"use client";

import { useState } from "react";

import { BarChart } from "@/components/admin/charts";
import { useAdmin } from "@/components/admin/AdminProvider";
import { formatCurrency, formatNumber } from "@/lib/admin";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { AdminProduct } from "@/types/admin";

export default function BombonierePage() {
  const { products, updateProduct } = useAdmin();
  const [editing, setEditing] = useState<AdminProduct | null>(null);
  const [stock, setStock] = useState(0);
  const revenue = products.reduce((sum, product) => sum + product.revenuePeriod, 0);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-heading text-2xl">Bomboniere</h1>
        <p className="text-sm text-muted-foreground">
          Desempenho do período · {formatCurrency(revenue)}
        </p>
      </div>
      <div className="grid gap-3 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Produtos</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead>Vendidos</TableHead>
                  <TableHead>Receita</TableHead>
                  <TableHead>Estoque</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                    </TableCell>
                    <TableCell>{formatNumber(product.soldPeriod)}</TableCell>
                    <TableCell>{formatCurrency(product.revenuePeriod)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {product.stock}
                        {product.lowStock && (
                          <Badge variant="destructive" className="rounded-md">
                            Baixo
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setEditing(product);
                          setStock(product.stock);
                        }}
                      >
                        Ajustar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Mais vendidos</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              items={products
                .slice()
                .sort((a, b) => b.soldPeriod - a.soldPeriod)
                .slice(0, 5)
                .map((product) => ({
                  label: product.name,
                  value: product.soldPeriod / 10,
                }))}
            />
          </CardContent>
        </Card>
      </div>
      <Dialog open={Boolean(editing)} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent title="Ajustar estoque">
          <DialogDescription>
            O estoque é apenas visual nesta demonstração.
          </DialogDescription>
          <div className="mt-4 space-y-3">
            <div className="space-y-1">
              <Label htmlFor="stock">Quantidade</Label>
              <Input
                id="stock"
                type="number"
                value={stock}
                onChange={(event) => setStock(Number(event.target.value))}
              />
            </div>
            <Button
              onClick={() => {
                if (!editing) return;
                updateProduct(editing.id, {
                  stock,
                  lowStock: stock <= 8,
                });
                setEditing(null);
              }}
            >
              Salvar ajuste
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
