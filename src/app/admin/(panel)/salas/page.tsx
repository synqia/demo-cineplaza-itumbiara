"use client";

import { useState } from "react";

import { useAdmin } from "@/components/admin/AdminProvider";
import { OccupancyBar } from "@/components/admin/charts";
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
import { Switch } from "@/components/ui/switch";
import type { AdminRoom } from "@/types/admin";

export default function SalasPage() {
  const { rooms, updateRoom } = useAdmin();
  const [editing, setEditing] = useState<AdminRoom | null>(null);
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [features, setFeatures] = useState("");
  const [maintenance, setMaintenance] = useState(false);

  const openEdit = (room: AdminRoom) => {
    setEditing(room);
    setName(room.name);
    setCapacity(room.capacity);
    setFeatures(room.features.join(", "));
    setMaintenance(room.status === "maintenance");
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-heading text-2xl">Salas</h1>
        <p className="text-sm text-muted-foreground">
          Capacidade, formatos e ocupação do dia.
        </p>
      </div>
      <div className="grid gap-3 lg:grid-cols-3">
        {rooms.map((room) => (
          <Card key={room.id}>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle>{room.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {room.capacity} assentos · {room.formats.join(", ")}
                </p>
              </div>
              <Badge variant="outline" className="rounded-md">
                {room.status === "maintenance" ? "Manutenção" : "Ativa"}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="mb-1 text-xs text-muted-foreground">Ocupação de hoje</p>
                <OccupancyBar value={room.occupancyToday / 100} />
              </div>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {room.features.map((feature) => (
                  <li key={feature}>· {feature}</li>
                ))}
              </ul>
              <Button variant="outline" size="sm" onClick={() => openEdit(room)}>
                Editar sala
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={Boolean(editing)} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent title="Editar sala">
          <DialogDescription>
            Ajuste demonstrativo da sala. A capacidade do site público não é alterada.
          </DialogDescription>
          <div className="mt-4 space-y-3">
            <div className="space-y-1">
              <Label htmlFor="room-name">Nome</Label>
              <Input
                id="room-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="room-capacity">Capacidade</Label>
              <Input
                id="room-capacity"
                type="number"
                value={capacity}
                onChange={(event) => setCapacity(Number(event.target.value))}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="room-features">Recursos</Label>
              <Input
                id="room-features"
                value={features}
                onChange={(event) => setFeatures(event.target.value)}
              />
            </div>
            <label className="flex items-center justify-between text-sm">
              Em manutenção
              <Switch checked={maintenance} onCheckedChange={setMaintenance} />
            </label>
            <Button
              onClick={() => {
                if (!editing) return;
                updateRoom(editing.id, {
                  name,
                  capacity,
                  features: features.split(",").map((item) => item.trim()).filter(Boolean),
                  status: maintenance ? "maintenance" : "active",
                });
                setEditing(null);
              }}
            >
              Salvar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
