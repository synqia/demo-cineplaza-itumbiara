import Link from "next/link";
import { Glasses, Armchair, AudioLines, ArrowRight } from "lucide-react";
import type { CinemaInfo } from "@/types/cinema";
import ImageWithFallback from "@/components/cinema/ImageWithFallback";
import SectionHeader from "@/components/cinema/SectionHeader";

const icons = {
  "sala-3d": Glasses,
  "sala-premium": Armchair,
  "cineplaza-sound": AudioLines,
};

interface ExperienceCardProps {
  experiences: CinemaInfo["experiences"];
}

export default function ExperienceCards({ experiences }: ExperienceCardProps) {
  return (
    <section className="section-padding bg-surface/40">
      <div className="container-cine">
        <SectionHeader
          eyebrow="Experiências"
          title="Viva o cinema do seu jeito"
          description="Escolha o conforto, a tecnologia e o som que combinam com o seu momento."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {experiences.map((experience) => {
            const Icon =
              icons[experience.id as keyof typeof icons] ?? Glasses;
            return (
              <article
                key={experience.id}
                className="group overflow-hidden rounded-2xl border border-border bg-surface"
              >
                <div className="relative aspect-16/10 overflow-hidden">
                  <ImageWithFallback
                    src={experience.imageUrl}
                    alt={experience.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent" />
                  <div className="absolute left-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-background/70 text-accent backdrop-blur-sm">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                </div>
                <div className="space-y-3 p-5">
                  <h3 className="font-heading text-xl font-semibold">
                    {experience.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {experience.description}
                  </p>
                  <Link
                    href={experience.href}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-hover"
                  >
                    Conheça
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
