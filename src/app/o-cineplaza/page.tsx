import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/layout/SiteShell";
import LocationCard from "@/components/cinema/LocationCard";
import ImageWithFallback from "@/components/cinema/ImageWithFallback";
import ExperienceCards from "@/components/cinema/ExperienceCard";
import { cinemaInfo } from "@/data/cinema";
import { faqs } from "@/data/faqData";
import { JsonLdBreadcrumb } from "@/components/seo/JsonLdMovieTheater";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "O Cineplaza",
  description:
    "Conheça a história, as salas, as tecnologias e a acessibilidade do Cineplaza.",
  alternates: { canonical: "/o-cineplaza" },
};

const gallery = [
  {
    src: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1000&q=80",
    alt: "Poltronas da sala Premium",
  },
  {
    src: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1000&q=80",
    alt: "Tela iluminada antes da sessão",
  },
  {
    src: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1000&q=80",
    alt: "Ambiente do foyer do cinema",
  },
];

export default function OCineplazaPage() {
  return (
    <SiteShell>
      <JsonLdBreadcrumb
        items={[
          { name: "Início", path: "/" },
          { name: "O Cineplaza", path: "/o-cineplaza" },
        ]}
      />
      <main>
        <section className="section-padding">
          <div className="container-cine grid items-center gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                Institucional
              </p>
              <h1 className="font-heading text-[clamp(1.9rem,4vw,3rem)] font-bold">
                Uma casa de cinema para a cidade
              </h1>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  O Cineplaza Itumbiara fica no Shopping Center Plaza com a
                  missão de oferecer entretenimento de qualidade perto de casa.
                  Com três salas modernas, atendimento acolhedor e uma
                  programação variada, queremos que cada visita seja simples,
                  confortável e memorável.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                Nossa missão é aproximar grandes histórias da comunidade local —
                com tecnologia, conforto e preços justos.
              </p>
            </div>
            <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1485095329183-d0797cdc5676?auto=format&fit=crop&w=1200&q=80"
                alt="Fachada e atmosfera do Cineplaza"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        <section id="estrutura" className="section-padding bg-surface/40">
          <div className="container-cine">
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">
              Estrutura e salas
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
              Três salas pensadas para diferentes momentos: conforto premium,
              imersão 3D e a experiência clássica da tela grande.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {cinemaInfo.rooms.map((room) => (
                <article
                  key={room.name}
                  className="rounded-2xl border border-border bg-surface p-5"
                >
                  <h3 className="font-heading text-xl font-semibold">
                    {room.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Capacidade: {room.capacity} lugares
                  </p>
                  <ul className="mt-3 space-y-1 text-sm text-foreground">
                    {room.features.map((feature) => (
                      <li key={feature}>• {feature}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div id="experiencias">
          <ExperienceCards experiences={cinemaInfo.experiences} />
        </div>

        <section id="acessibilidade" className="section-padding">
          <div className="container-cine max-w-3xl">
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">
              Acessibilidade
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {cinemaInfo.accessibility}. Sessões com recursos de acessibilidade
              aparecem sinalizadas na programação.
            </p>
          </div>
        </section>

        <section className="section-padding pt-0">
          <div className="container-cine">
            <h2 className="mb-6 font-heading text-2xl font-bold">
              Fotos do espaço
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {gallery.map((item) => (
                <div
                  key={item.src}
                  className="relative aspect-4/3 overflow-hidden rounded-2xl"
                >
                  <ImageWithFallback
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <LocationCard />

        <section id="faq" className="section-padding pt-0">
          <div className="container-cine max-w-3xl">
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">
              Perguntas frequentes
            </h2>
            <div className="mt-6 rounded-2xl border border-border bg-surface px-4">
              <Accordion>
                {faqs.map((item, index) => (
                  <AccordionItem key={item.question} value={`item-${index}`}>
                    <AccordionTrigger className="py-4 text-left text-base text-foreground hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-sm text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Ainda com dúvidas?{" "}
              <Link href="/programacao" className="font-semibold text-primary">
                Veja a programação
              </Link>{" "}
              ou fale com a gente pelo WhatsApp.
            </p>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
