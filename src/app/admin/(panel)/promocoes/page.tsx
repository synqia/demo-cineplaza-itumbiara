"use client";

import { useState } from "react";

import { useAdmin } from "@/components/admin/AdminProvider";
import { formatNumber } from "@/lib/admin";
import type { AdminPromotion } from "@/types/admin";
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
import { Textarea } from "@/components/ui/textarea";

const statusLabel: Record<AdminPromotion["status"], string> = {
  active: "Ativa",
  scheduled: "Agendada",
  ended: "Encerrada",
  draft: "Rascunho",
};

export default function PromocoesPage() {
  const { promotions, addPromotion, updatePromotion } = useAdmin();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [discountLabel, setDiscountLabel] = useState("");
  const [scope, setScope] = useState("");
  const [startsAt, setStartsAt] = useState("");
  const [endsAt, setEndsAt] = useState("");

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl">Promoções</h1>
          <p className="text-sm text-muted-foreground">
            Campanhas comerciais do Cineplaza, sem publicação real.
          </p>
        </div>
        <Button onClick={() => setOpen(true)}>Criar promoção</Button>
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        {promotions.map((promo) => (
          <Card key={promo.id}>
            <CardHeader className="flex flex-row items-start justify-between gap-3">
              <div>
                <CardTitle>{promo.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{promo.subtitle}</p>
              </div>
              <Badge variant="outline" className="rounded-md">
                {statusLabel[promo.status]}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>{promo.description}</p>
              <p className="text-muted-foreground">
                {promo.discountLabel} · {promo.scope}
              </p>
              <p className="text-xs text-muted-foreground">
                {promo.startsAt} a {promo.endsAt} · {formatNumber(promo.redemptions)} resgates
              </p>
              <div className="flex gap-2">
                {promo.status !== "ended" && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      updatePromotion(promo.id, {
                        status: promo.status === "active" ? "draft" : "active",
                      })
                    }
                  >
                    {promo.status === "active" ? "Pausar" : "Ativar"}
                  </Button>
                )}
                {promo.status !== "ended" && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => updatePromotion(promo.id, { status: "ended" })}
                  >
                    Encerrar
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent title="Nova promoção">
          <DialogDescription>
            A campanha fica visível só neste painel demonstrativo.
          </DialogDescription>
          <div className="mt-4 grid gap-3">
            <div className="space-y-1">
              <Label htmlFor="promo-title">Título</Label>
              <Input
                id="promo-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="promo-sub">Subtítulo</Label>
              <Input
                id="promo-sub"
                value={subtitle}
                onChange={(event) => setSubtitle(event.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="promo-desc">Descrição</Label>
              <Textarea
                id="promo-desc"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <Label htmlFor="promo-discount">Benefício</Label>
                <Input
                  id="promo-discount"
                  value={discountLabel}
                  onChange={(event) => setDiscountLabel(event.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="promo-scope">Alcance</Label>
                <Input
                  id="promo-scope"
                  value={scope}
                  onChange={(event) => setScope(event.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <Label htmlFor="promo-start">Início</Label>
                <Input
                  id="promo-start"
                  type="date"
                  value={startsAt}
                  onChange={(event) => setStartsAt(event.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="promo-end">Término</Label>
                <Input
                  id="promo-end"
                  type="date"
                  value={endsAt}
                  onChange={(event) => setEndsAt(event.target.value)}
                />
              </div>
            </div>
            <Button
              onClick={() => {
                if (!title.trim()) return;
                addPromotion({
                  title,
                  subtitle,
                  description,
                  ctaLabel: "Ver detalhes",
                  ctaHref: "/programacao",
                  status: "draft",
                  startsAt,
                  endsAt,
                  discountLabel,
                  scope,
                });
                setOpen(false);
                setTitle("");
                setSubtitle("");
                setDescription("");
                setDiscountLabel("");
                setScope("");
              }}
            >
              Criar campanha
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
