"use client";

import Link from "next/link";
import {
  getComingSoonMovies,
  getFeaturedMovies,
  getNowShowingMovies,
} from "@/data/movies";
import { cinemaInfo } from "@/data/cinema";
import { getFeaturedProducts } from "@/data/products";
import HeroCarousel from "@/components/cinema/HeroCarousel";
import SessionFinder from "@/components/cinema/SessionFinder";
import SectionHeader from "@/components/cinema/SectionHeader";
import MovieCarousel from "@/components/cinema/MovieCarousel";
import ScheduleSection from "@/components/cinema/ScheduleSection";
import PromoBanner from "@/components/cinema/PromoBanner";
import ExperienceCards from "@/components/cinema/ExperienceCard";
import ProductCard from "@/components/cinema/ProductCard";
import LocationCard from "@/components/cinema/LocationCard";
import NewsletterForm from "@/components/cinema/NewsletterForm";
import ImageWithFallback from "@/components/cinema/ImageWithFallback";
import AgeRatingBadge from "@/components/cinema/AgeRatingBadge";
import { formatReleaseDate } from "@/lib/cinema";
import { useTicketPurchase } from "@/components/providers/TicketProvider";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const featured = getFeaturedMovies().slice(0, 3);
  const nowShowing = getNowShowingMovies();
  const comingSoon = getComingSoonMovies();
  const products = getFeaturedProducts(4);
  const { openPurchase } = useTicketPurchase();

  return (
    <main>
      <HeroCarousel movies={featured.length ? featured : nowShowing} />
      <SessionFinder />

      <section className="section-padding">
        <div className="container-cine">
          <SectionHeader
            eyebrow="Em cartaz"
            title="Em cartaz no Cineplaza"
            description="Escolha o filme, encontre a sessão e prepare a pipoca."
            href="/programacao"
            linkLabel="Ver programação completa"
          />
          <MovieCarousel
            movies={nowShowing}
            onBuyTickets={(movieId) => openPurchase({ movieId })}
          />
        </div>
      </section>

      <div className="bg-surface/30">
        <ScheduleSection movies={nowShowing} />
      </div>

      <PromoBanner />

      <section className="section-padding pt-0">
        <div className="container-cine">
          <SectionHeader
            eyebrow="Agenda"
            title="Em breve"
            description="Pré-vendas e próximos lançamentos para você se programar."
            href="/filmes?status=em-breve"
            linkLabel="Ver todos"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {comingSoon.map((movie) => (
              <article
                key={movie.id}
                className="overflow-hidden rounded-2xl border border-border bg-surface"
              >
                <Link
                  href={`/filmes/${movie.slug}`}
                  className="relative block poster-aspect"
                >
                  <ImageWithFallback
                    src={movie.posterUrl}
                    alt={`Pôster de ${movie.title}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                  {movie.status === "pre-sale" ? (
                    <span className="absolute left-2 top-2 rounded-md bg-primary px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                      Pré-venda
                    </span>
                  ) : null}
                </Link>
                <div className="space-y-2 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                    Estreia {formatReleaseDate(movie.releaseDate)}
                  </p>
                  <h3 className="font-heading text-lg font-semibold">
                    <Link href={`/filmes/${movie.slug}`}>{movie.title}</Link>
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <AgeRatingBadge rating={movie.ageRating} />
                    <span>{movie.genre[0]}</span>
                  </div>
                  <div className="flex flex-col gap-2 pt-2">
                    <Link
                      href={`/filmes/${movie.slug}`}
                      className="inline-flex h-10 items-center justify-center rounded-xl border border-border text-sm font-medium hover:bg-surface-elevated"
                    >
                      Ver detalhes
                    </Link>
                    {movie.status === "pre-sale" ? (
                      <Button
                        type="button"
                        className="h-10"
                        onClick={() => openPurchase({ movieId: movie.id })}
                      >
                        Ver sessões
                      </Button>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ExperienceCards experiences={cinemaInfo.experiences} />

      <section className="section-padding">
        <div className="container-cine">
          <SectionHeader
            eyebrow="Cardápio"
            title="A sessão começa no cardápio"
            description="Combos e clássicos para deixar a experiência completa. Compra online simulada neste protótipo."
            href="/cardapio"
            linkLabel="Ver cardápio"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface/40">
        <div className="container-cine grid items-center gap-8 lg:grid-cols-2">
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=80"
              alt="Interior de sala de cinema do Cineplaza"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              O cinema da cidade
            </p>
            <h2 className="font-heading text-[clamp(1.6rem,3vw,2.4rem)] font-bold">
              Seu cinema, bem no coração da cidade
            </h2>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                O Cineplaza Itumbiara nasceu para aproximar grandes histórias da
                comunidade local, no Shopping Center Plaza. Aqui você encontra
                conforto, tecnologia e uma programação pensada para famílias,
                casais e quem só quer viver uma boa sessão.
              </p>
            <ul className="space-y-2 text-sm text-foreground">
              <li>• Salas modernas com som calibrado</li>
              <li>• Atendimento próximo e acolhedor</li>
              <li>• Localização central e fácil acesso</li>
            </ul>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Link
                href="/o-cineplaza"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-hover"
              >
                Conheça o Cineplaza
              </Link>
              <Link
                href="/o-cineplaza#localizacao"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-border px-5 text-sm font-semibold hover:bg-surface"
              >
                Como chegar
              </Link>
            </div>
          </div>
        </div>
      </section>

      <LocationCard />
      <NewsletterForm />
    </main>
  );
}
