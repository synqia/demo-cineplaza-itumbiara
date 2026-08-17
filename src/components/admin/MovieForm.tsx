"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import AgeRatingBadge from "@/components/cinema/AgeRatingBadge";
import { useAdmin } from "@/components/admin/AdminProvider";
import { movieStatusLabels, slugify } from "@/lib/admin";
import type { AdminMovie, AdminMovieStatus } from "@/types/admin";
import type { AgeRating, SessionFormat, SessionLanguage } from "@/types/cinema";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const emptyMovie: Omit<AdminMovie, "id" | "ticketsSold" | "futureSessions"> = {
  slug: "",
  title: "",
  originalTitle: "",
  synopsis: "",
  shortDescription: "",
  posterUrl: "",
  backdropUrl: "",
  trailerUrl: "",
  genre: [],
  duration: 100,
  ageRating: "12",
  releaseDate: "",
  status: "draft",
  director: "",
  cast: [],
  distributor: "",
  languages: ["Dublado"],
  formats: ["2D"],
  featured: false,
  year: 2026,
  country: "Brasil",
  endDate: "",
  ageRatingNote: "",
  metaTitle: "",
  metaDescription: "",
  allowPresale: false,
};

export default function MovieForm({ movieId }: { movieId?: string }) {
  const router = useRouter();
  const { getMovie, addMovie, updateMovie } = useAdmin();
  const existing = movieId ? getMovie(movieId) : undefined;
  const [form, setForm] = useState(emptyMovie);
  const [genreText, setGenreText] = useState("");
  const [castText, setCastText] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [posterPreview, setPosterPreview] = useState("");
  const [backdropPreview, setBackdropPreview] = useState("");

  useEffect(() => {
    if (!existing) return;
    setForm({
      ...existing,
      genre: existing.genre,
      cast: existing.cast,
    });
    setGenreText(existing.genre.join(", "));
    setCastText(existing.cast.join(", "));
    setPosterPreview(existing.posterUrl);
    setBackdropPreview(existing.backdropUrl);
  }, [existing]);

  const previewSlug = form.slug || slugify(form.title);
  const metaTitle = form.metaTitle || `${form.title || "Novo filme"} | Cineplaza`;
  const metaDescription =
    form.metaDescription || form.shortDescription || "Sinopse ainda não informada.";

  const patch = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const onFile = (
    file: File | undefined,
    kind: "poster" | "backdrop"
  ) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    if (kind === "poster") {
      setPosterPreview(url);
      patch("posterUrl", url);
    } else {
      setBackdropPreview(url);
      patch("backdropUrl", url);
    }
  };

  const save = (asDraft = false) => {
    const nextErrors: Record<string, string> = {};
    if (!form.title.trim()) nextErrors.title = "Informe o título.";
    if (!form.duration) nextErrors.duration = "Informe a duração.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const payload = {
      ...form,
      status: asDraft ? "draft" : form.status,
      slug: previewSlug,
      genre: genreText
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      cast: castText
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      metaTitle,
      metaDescription,
    };

    if (movieId && existing) {
      updateMovie(movieId, payload);
    } else {
      addMovie(payload);
    }
    router.push("/admin/filmes");
  };

  const languages = useMemo(() => form.languages, [form.languages]);
  const formats = useMemo(() => form.formats, [form.formats]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl">
            {movieId ? "Editar filme" : "Novo filme"}
          </h1>
          <p className="text-sm text-muted-foreground">
            Cadastro demonstrativo. Nada é enviado a um servidor.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/admin/filmes" className={buttonVariants({ variant: "outline" })}>
            Cancelar
          </Link>
          {!movieId && (
            <Button variant="secondary" onClick={() => save(true)}>
              Salvar como rascunho
            </Button>
          )}
          <Button onClick={() => save(false)}>Salvar</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações principais</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          <Field label="Título" error={errors.title}>
            <Input
              value={form.title}
              onChange={(event) => patch("title", event.target.value)}
              aria-invalid={Boolean(errors.title)}
            />
          </Field>
          <Field label="Título original">
            <Input
              value={form.originalTitle}
              onChange={(event) => patch("originalTitle", event.target.value)}
            />
          </Field>
          <Field label="Sinopse curta" className="md:col-span-2">
            <Textarea
              value={form.shortDescription}
              onChange={(event) => patch("shortDescription", event.target.value)}
            />
          </Field>
          <Field label="Sinopse completa" className="md:col-span-2">
            <Textarea
              value={form.synopsis}
              onChange={(event) => patch("synopsis", event.target.value)}
              className="min-h-28"
            />
          </Field>
          <Field label="Gêneros">
            <Input
              value={genreText}
              onChange={(event) => setGenreText(event.target.value)}
              placeholder="Ação, Aventura"
            />
          </Field>
          <Field label="Duração em minutos" error={errors.duration}>
            <Input
              type="number"
              min={1}
              value={form.duration}
              onChange={(event) => patch("duration", Number(event.target.value))}
            />
          </Field>
          <Field label="Ano">
            <Input
              type="number"
              value={form.year}
              onChange={(event) => patch("year", Number(event.target.value))}
            />
          </Field>
          <Field label="País">
            <Input
              value={form.country}
              onChange={(event) => patch("country", event.target.value)}
            />
          </Field>
          <Field label="Distribuidora">
            <Input
              value={form.distributor}
              onChange={(event) => patch("distributor", event.target.value)}
            />
          </Field>
          <Field label="Diretor">
            <Input
              value={form.director}
              onChange={(event) => patch("director", event.target.value)}
            />
          </Field>
          <Field label="Elenco" className="md:col-span-2">
            <Input
              value={castText}
              onChange={(event) => setCastText(event.target.value)}
              placeholder="Nomes separados por vírgula"
            />
          </Field>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Exibição</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          <Field label="Status">
            <Select
              value={form.status}
              onValueChange={(value) =>
                value && patch("status", value as AdminMovieStatus)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(movieStatusLabels) as AdminMovieStatus[]).map((item) => (
                  <SelectItem key={item} value={item}>
                    {movieStatusLabels[item]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Data de estreia">
            <Input
              type="date"
              value={form.releaseDate}
              onChange={(event) => patch("releaseDate", event.target.value)}
            />
          </Field>
          <Field label="Data final de exibição">
            <Input
              type="date"
              value={form.endDate ?? ""}
              onChange={(event) => patch("endDate", event.target.value)}
            />
          </Field>
          <div className="space-y-2">
            <Label>Idiomas</Label>
            {(["Dublado", "Legendado", "Original"] as SessionLanguage[]).map((item) => (
              <label key={item} className="flex items-center gap-2 text-sm">
                <Checkbox
                  checked={languages.includes(item)}
                  onCheckedChange={(checked) => {
                    patch(
                      "languages",
                      checked === true
                        ? [...languages, item]
                        : languages.filter((language) => language !== item)
                    );
                  }}
                />
                {item}
              </label>
            ))}
          </div>
          <div className="space-y-2">
            <Label>Formatos</Label>
            {(["2D", "3D", "Premium"] as SessionFormat[]).map((item) => (
              <label key={item} className="flex items-center gap-2 text-sm">
                <Checkbox
                  checked={formats.includes(item)}
                  onCheckedChange={(checked) => {
                    patch(
                      "formats",
                      checked === true
                        ? [...formats, item]
                        : formats.filter((format) => format !== item)
                    );
                  }}
                />
                {item}
              </label>
            ))}
          </div>
          <label className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-sm">
            Destaque na página inicial
            <Switch
              checked={form.featured}
              onCheckedChange={(checked) => patch("featured", checked)}
            />
          </label>
          <label className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-sm">
            Permitir pré-venda
            <Switch
              checked={form.allowPresale}
              onCheckedChange={(checked) => patch("allowPresale", checked)}
            />
          </label>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Classificação indicativa</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-[auto_1fr]">
          <div className="space-y-2">
            <Label>Classificação</Label>
            <Select
              value={form.ageRating}
              onValueChange={(value) => value && patch("ageRating", value as AgeRating)}
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(["L", "10", "12", "14", "16", "18"] as AgeRating[]).map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <AgeRatingBadge rating={form.ageRating} size="md" />
          </div>
          <Field label="Descrição ou observação">
            <Textarea
              value={form.ageRatingNote ?? ""}
              onChange={(event) => patch("ageRatingNote", event.target.value)}
            />
          </Field>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mídia</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          <Field label="URL do pôster">
            <Input
              value={form.posterUrl}
              onChange={(event) => {
                patch("posterUrl", event.target.value);
                setPosterPreview(event.target.value);
              }}
            />
          </Field>
          <Field label="URL do backdrop">
            <Input
              value={form.backdropUrl}
              onChange={(event) => {
                patch("backdropUrl", event.target.value);
                setBackdropPreview(event.target.value);
              }}
            />
          </Field>
          <Field label="URL do trailer" className="md:col-span-2">
            <Input
              value={form.trailerUrl}
              onChange={(event) => patch("trailerUrl", event.target.value)}
            />
          </Field>
          <div className="space-y-2">
            <Label htmlFor="poster-file">Upload simulado do pôster</Label>
            <Input
              id="poster-file"
              type="file"
              accept="image/*"
              onChange={(event) => onFile(event.target.files?.[0], "poster")}
            />
            <p className="text-xs text-muted-foreground">
              O arquivo não será enviado. Apenas um preview local é exibido.
            </p>
            {posterPreview && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={posterPreview} alt="Prévia do pôster" className="h-40 rounded object-cover" />
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="backdrop-file">Upload simulado do backdrop</Label>
            <Input
              id="backdrop-file"
              type="file"
              accept="image/*"
              onChange={(event) => onFile(event.target.files?.[0], "backdrop")}
            />
            <p className="text-xs text-muted-foreground">
              O arquivo não será enviado. Apenas um preview local é exibido.
            </p>
            {backdropPreview && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={backdropPreview}
                alt="Prévia do backdrop"
                className="h-40 w-full rounded object-cover"
              />
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>SEO</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          <Field label="Slug">
            <Input
              value={form.slug}
              onChange={(event) => patch("slug", event.target.value)}
              placeholder={previewSlug}
            />
          </Field>
          <Field label="Meta title">
            <Input
              value={form.metaTitle ?? ""}
              onChange={(event) => patch("metaTitle", event.target.value)}
            />
          </Field>
          <Field label="Meta description" className="md:col-span-2">
            <Textarea
              value={form.metaDescription ?? ""}
              onChange={(event) => patch("metaDescription", event.target.value)}
            />
          </Field>
          <div className="md:col-span-2 rounded-lg border border-border bg-background p-4">
            <p className="text-xs text-muted-foreground">Preview simplificado</p>
            <p className="mt-2 text-sm text-sky-400">{metaTitle}</p>
            <p className="text-xs text-emerald-500">
              cineplaza.com.br/filmes/{previewSlug || "slug"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{metaDescription}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Field({
  label,
  children,
  error,
  className,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label className="mb-1.5">{label}</Label>
      {children}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
