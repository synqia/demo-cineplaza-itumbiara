"use client";

import { useMemo, useState } from "react";

import { OccupancyBar } from "@/components/admin/charts";
import { useAdmin } from "@/components/admin/AdminProvider";
import { formatDateLabel, sessionStatusCopy } from "@/lib/cinema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
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

export default function SessoesPage() {
  const { movies, sessions, rooms, cancelSession } = useAdmin();
  const [query, setQuery] = useState("");
  const [room, setRoom] = useState("all");
  const [cancelId, setCancelId] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      sessions.filter((session) => {
        const movie = movies.find((item) => item.id === session.movieId);
        if (query && !movie?.title.toLowerCase().includes(query.toLowerCase())) {
          return false;
        }
        if (room !== "all" && session.room !== room) return false;
        return true;
      }),
    [sessions, movies, query, room]
  );

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-heading text-2xl">Sessões</h1>
        <p className="text-sm text-muted-foreground">
          {filtered.length} sessões na grade demonstrativa.
        </p>
      </div>
      <div className="grid gap-2 md:grid-cols-3">
        <Input
          placeholder="Filtrar por filme"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <Select value={room} onValueChange={(value) => value && setRoom(value)}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as salas</SelectItem>
            {rooms.map((item) => (
              <SelectItem key={item.id} value={item.shortName}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Horário</TableHead>
              <TableHead>Filme</TableHead>
              <TableHead>Sala</TableHead>
              <TableHead>Formato</TableHead>
              <TableHead>Ocupação</TableHead>
              <TableHead>Status</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.slice(0, 24).map((session) => {
              const movie = movies.find((item) => item.id === session.movieId);
              const date = formatDateLabel(session.date);
              return (
                <TableRow key={session.id} className={session.cancelled ? "opacity-50" : ""}>
                  <TableCell>
                    {date.day}/{date.month} · {session.time}
                  </TableCell>
                  <TableCell>{movie?.title}</TableCell>
                  <TableCell>{session.room}</TableCell>
                  <TableCell>
                    {session.format} · {session.language}
                  </TableCell>
                  <TableCell>
                    <div>
                      <span className="text-xs text-muted-foreground">
                        {session.sold}/{session.capacity}
                      </span>
                      <OccupancyBar value={session.occupancy} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="rounded-md">
                      {session.cancelled
                        ? "Cancelada"
                        : sessionStatusCopy[session.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={session.cancelled}
                      onClick={() => setCancelId(session.id)}
                    >
                      Cancelar
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <Dialog open={Boolean(cancelId)} onOpenChange={(open) => !open && setCancelId(null)}>
        <DialogContent title="Cancelar sessão">
          <DialogDescription>
            A sessão deixa de aparecer como disponível nesta demonstração. Nenhuma
            comunicação real será enviada aos espectadores.
          </DialogDescription>
          <div className="mt-6 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setCancelId(null)}>
              Voltar
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (cancelId) cancelSession(cancelId);
                setCancelId(null);
              }}
            >
              Confirmar cancelamento
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
