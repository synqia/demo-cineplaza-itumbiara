import { Accessibility, Car, Clock3, MapPin, MessageCircle, Phone } from "lucide-react";
import { cinemaInfo, fullAddress } from "@/data/cinema";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default function LocationCard() {
  return (
    <section id="localizacao" className="section-padding">
      <div className="container-cine grid gap-6 lg:grid-cols-2">
        <div className="space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Como chegar
            </p>
            <h2 className="mt-3 font-heading text-[clamp(1.6rem,3vw,2.25rem)] font-bold">
              Estamos no coração da cidade
            </h2>
          </div>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
              <span>{fullAddress} · CEP {cinemaInfo.address.zip}</span>
            </li>
            <li className="flex gap-3">
              <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
              <span>{cinemaInfo.businessHours}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
              <span>{cinemaInfo.phone}</span>
            </li>
            <li className="flex gap-3">
              <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
              <span>WhatsApp: {cinemaInfo.phone}</span>
            </li>
            <li className="flex gap-3">
              <Car className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
              <span>{cinemaInfo.parking}</span>
            </li>
            <li className="flex gap-3">
              <Accessibility className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
              <span>{cinemaInfo.accessibility}</span>
            </li>
          </ul>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={cinemaInfo.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-hover"
            >
              Abrir no Google Maps
            </a>
            <a
              href={buildWhatsAppUrl(
                cinemaInfo.whatsapp,
                "Olá! Gostaria de informações sobre como chegar ao Cineplaza."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-surface px-5 text-sm font-semibold text-foreground hover:bg-surface-elevated"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>

        <div
          className="relative min-h-80 overflow-hidden rounded-2xl border border-border bg-surface-elevated"
          aria-label="Mapa ilustrativo da localização do Cineplaza"
          role="img"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(240,68,82,0.22),transparent_45%),radial-gradient(circle_at_70%_60%,rgba(245,185,66,0.18),transparent_40%),linear-gradient(160deg,#101827,#182235)]" />
          <div className="absolute inset-6 rounded-xl border border-dashed border-white/15" />
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/40">
              <MapPin className="h-6 w-6" aria-hidden />
            </span>
            <p className="rounded-lg bg-background/80 px-3 py-1.5 text-sm font-medium backdrop-blur-sm">
              {cinemaInfo.locationLabel}
            </p>
          </div>
          <p className="absolute bottom-4 left-4 right-4 text-center text-xs text-muted-foreground">
            Representação visual do mapa. Use o botão acima para abrir a rota real.
          </p>
        </div>
      </div>
    </section>
  );
}
