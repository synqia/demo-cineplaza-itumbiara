"use client";

import { useState } from "react";

import { useAdmin } from "@/components/admin/AdminProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ConfiguracoesPage() {
  const { settings, updateSettings } = useAdmin();
  const [form, setForm] = useState(settings);

  const patch = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl">Configurações</h1>
          <p className="text-sm text-muted-foreground">
            Informações básicas do cinema. Alterações valem só nesta sessão.
          </p>
        </div>
        <Button onClick={() => updateSettings(form)}>Salvar alterações</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Identidade e contato</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          <Field label="Nome">
            <Input value={form.name} onChange={(event) => patch("name", event.target.value)} />
          </Field>
          <Field label="Tagline">
            <Input value={form.tagline} onChange={(event) => patch("tagline", event.target.value)} />
          </Field>
          <Field label="E-mail">
            <Input value={form.email} onChange={(event) => patch("email", event.target.value)} />
          </Field>
          <Field label="Telefone">
            <Input value={form.phone} onChange={(event) => patch("phone", event.target.value)} />
          </Field>
          <Field label="WhatsApp">
            <Input value={form.whatsapp} onChange={(event) => patch("whatsapp", event.target.value)} />
          </Field>
          <Field label="Endereço" className="md:col-span-2">
            <Input value={form.address} onChange={(event) => patch("address", event.target.value)} />
          </Field>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Operação</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          <Field label="Horário de funcionamento">
            <Textarea
              value={form.businessHours}
              onChange={(event) => patch("businessHours", event.target.value)}
            />
          </Field>
          <Field label="Estacionamento">
            <Textarea
              value={form.parking}
              onChange={(event) => patch("parking", event.target.value)}
            />
          </Field>
          <Field label="Acessibilidade">
            <Textarea
              value={form.accessibility}
              onChange={(event) => patch("accessibility", event.target.value)}
            />
          </Field>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Preços-base</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-4">
          <Field label="Inteira">
            <Input
              type="number"
              value={form.fullPrice}
              onChange={(event) => patch("fullPrice", Number(event.target.value))}
            />
          </Field>
          <Field label="Meia">
            <Input
              type="number"
              value={form.halfPrice}
              onChange={(event) => patch("halfPrice", Number(event.target.value))}
            />
          </Field>
          <Field label="Promocional">
            <Input
              type="number"
              value={form.promoPrice}
              onChange={(event) => patch("promoPrice", Number(event.target.value))}
            />
          </Field>
          <Field label="Taxa de serviço">
            <Input
              type="number"
              value={form.serviceFee}
              onChange={(event) => patch("serviceFee", Number(event.target.value))}
            />
          </Field>
        </CardContent>
      </Card>
    </div>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label className="mb-1.5">{label}</Label>
      {children}
    </div>
  );
}
