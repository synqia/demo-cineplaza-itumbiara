"use client";

import { useMemo, useState } from "react";

import { useAdmin } from "@/components/admin/AdminProvider";
import { OccupancyBar } from "@/components/admin/charts";
import { getScheduleDates } from "@/data/sessions";
import { formatDateLabel } from "@/lib/cinema";
import type { SessionFormat, SessionLanguage } from "@/types/cinema";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProgramacaoPage() {
  const { movies, sessions, rooms, addSession } = useAdmin();
  const dates = getScheduleDates(7);
  const [date, setDate] = useState(dates[0]);
  const [open, setOpen] = useState(false);
  const [movieId, setMovieId] = useState(movies[0]?.id ?? "");
  const [time, setTime] = useState("16:30");
  const [room, setRoom] = useState(rooms[0]?.shortName ?? "Sala 1");
  const [format, setFormat] = useState<SessionFormat>("2D");
  const [language, setLanguage] = useState<SessionLanguage>("Dublado");

  const daySessions = useMemo(
    () =>
      sessions.filter(
        (session) => session.date === date && !session.cancelled
      ),
    [sessions, date]
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl">Programação</h1>
          <p className="text-sm text-muted-foreground">
            Grade semanal demonstrativa das salas do Cineplaza.
          </p>
        </div>
        <Button onClick={() => setOpen(true)}>Nova sessão</Button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {dates.map((item) => {
          const label = formatDateLabel(item);
          return (
            <Button
              key={item}
              variant={date === item ? "default" : "outline"}
              size="sm"
              onClick={() => setDate(item)}
            >
              {label.isToday ? "Hoje" : label.weekday} {label.day}
            </Button>
          );
        })}
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        {rooms.map((item) => {
          const roomSessions = daySessions.filter(
            (session) => session.room === item.shortName
          );
          return (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle className="text-base">{item.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {roomSessions.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    Nenhuma sessão neste dia.
                  </p>
                )}
                {roomSessions.map((session) => {
                  const movie = movies.find((entry) => entry.id === session.movieId);
                  return (
                    <div
                      key={session.id}
                      className="rounded-lg border border-border/70 p-3"
                    >
                      <p className="font-heading text-sm">{session.time}</p>
                      <p className="text-sm">{movie?.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {session.format} · {session.language}
                      </p>
                      <OccupancyBar value={session.occupancy} className="mt-2" />
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent title="Adicionar sessão">
          <DialogDescription>
            A sessão entra apenas nesta navegação demonstrativa.
          </DialogDescription>
          <div className="mt-4 grid gap-3">
            <div className="space-y-1">
              <Label>Filme</Label>
              <Select value={movieId} onValueChange={(value) => value && setMovieId(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {movies.map((movie) => (
                    <SelectItem key={movie.id} value={movie.id}>
                      {movie.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="session-time">Horário</Label>
              <Input
                id="session-time"
                type="time"
                value={time}
                onChange={(event) => setTime(event.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label>Sala</Label>
              <Select value={room} onValueChange={(value) => value && setRoom(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {rooms.map((item) => (
                    <SelectItem key={item.id} value={item.shortName}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>Formato</Label>
                <Select
                  value={format}
                  onValueChange={(value) => value && setFormat(value as SessionFormat)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2D">2D</SelectItem>
                    <SelectItem value="3D">3D</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>Idioma</Label>
                <Select
                  value={language}
                  onValueChange={(value) =>
                    value && setLanguage(value as SessionLanguage)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dublado">Dublado</SelectItem>
                    <SelectItem value="Legendado">Legendado</SelectItem>
                    <SelectItem value="Original">Original</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              onClick={() => {
                const selectedRoom = rooms.find((item) => item.shortName === room);
                const capacity = selectedRoom?.capacity ?? 140;
                addSession({
                  movieId,
                  date,
                  time,
                  room,
                  format,
                  language,
                  status: "available",
                  accessibility: false,
                  price: 30,
                  sold: 0,
                  capacity,
                  occupancy: 0,
                });
                setOpen(false);
              }}
            >
              Incluir na grade
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
