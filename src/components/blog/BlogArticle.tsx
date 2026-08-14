"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/data/blogData";
import { companyData } from "@/data/companyData";
import { images } from "@/data/imagesData";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function BlogArticle({ post }: { post: BlogPost }) {
  const cover = images[post.coverImageKey];
  const whatsappUrl = buildWhatsAppUrl(
    companyData.whatsapp,
    companyData.whatsappMessages.blog
  );

  return (
    <article className="max-w-300 mx-auto px-4 sm:px-6 py-10 md:py-14">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm font-body font-medium text-primary mb-8 hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar aos conteúdos
      </Link>

      <header className="max-w-3xl mb-8">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-body text-text-faint mb-3">
          <span className="font-semibold uppercase tracking-widest text-primary">
            {post.category}
          </span>
          <span>·</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>·</span>
          <span>{post.readingMinutes} min de leitura</span>
        </div>
        <h1
          className="font-heading font-semibold text-text-primary leading-[1.15] mb-4"
          style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
        >
          {post.title}
        </h1>
        <p className="text-[12px] font-body text-text-faint leading-relaxed">
          {post.prototypeNote}
        </p>
      </header>

      <div className="relative aspect-video max-w-4xl rounded-2xl overflow-hidden mb-10">
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 900px"
          className="object-cover"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 prose-none space-y-8">
          {post.sections.map((section, index) => (
            <section key={index} className="space-y-4">
              {section.heading && (
                <h2 className="font-heading font-semibold text-text-primary text-2xl">
                  {section.heading}
                </h2>
              )}
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-[15px] font-body text-text-secondary leading-[1.75]"
                >
                  {paragraph}
                </p>
              ))}
              {section.list && (
                <ul className="space-y-2 pl-1">
                  {section.list.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-[15px] font-body text-text-secondary leading-relaxed"
                    >
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {section.imageKey && (
                <div className="relative aspect-16/10 rounded-xl overflow-hidden my-6">
                  <Image
                    src={images[section.imageKey].src}
                    alt={images[section.imageKey].alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 700px"
                    className="object-cover"
                  />
                </div>
              )}
              {section.notice && (
                <p className="rounded-xl border border-border-default bg-bg-section-mid/60 px-4 py-3 text-[13px] font-body text-text-muted leading-relaxed">
                  {section.notice}
                </p>
              )}
            </section>
          ))}

          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8">
            <h2 className="font-heading font-semibold text-text-primary text-xl mb-2">
              Avaliar a saúde oral do seu gato
            </h2>
            <p className="text-sm font-body text-text-muted mb-5 leading-relaxed">
              Se você notou sinais de desconforto na boca, converse sobre uma
              avaliação odontológica felina.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-12 px-5 py-3 bg-gradient-green text-white text-sm font-semibold font-body rounded-lg"
              >
                Avaliar saúde oral
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/#odontologia"
                className="inline-flex items-center justify-center min-h-12 px-5 py-3 border border-border-default rounded-lg text-sm font-semibold font-body text-text-primary hover:border-primary hover:text-primary"
              >
                Ver odontologia no site
              </Link>
            </div>
          </div>

          <div className="flex gap-4 items-start border-t border-border-subtle pt-8">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-white font-heading font-semibold text-lg">
              ES
            </div>
            <div>
              <p className="font-heading font-semibold text-text-primary">
                {companyData.brandPerson}
              </p>
              <p className="text-[13px] font-body text-text-muted leading-relaxed mt-1">
                Medicina e odontologia felina · {companyData.locationLabel}
              </p>
              <div className="flex flex-wrap gap-3 mt-3 text-[12px] font-body">
                <Link href="/#consultorias" className="text-primary hover:underline">
                  Consultorias
                </Link>
                <Link href="/bio" className="text-primary hover:underline">
                  Link da bio
                </Link>
              </div>
            </div>
          </div>
        </div>

        <aside>
          <div className="sticky top-24 rounded-2xl border border-border-default bg-bg-section p-5">
            <p className="text-[12px] font-body text-text-muted leading-relaxed mb-4">
              Artigo educativo. Sem diagnóstico à distância.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 min-h-11 px-4 py-2.5 bg-gradient-green text-white text-sm font-semibold font-body rounded-lg"
            >
              Falar no WhatsApp
            </a>
          </div>
        </aside>
      </div>
    </article>
  );
}
