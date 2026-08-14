"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  blogCategories,
  blogPosts,
  type BlogCategory,
} from "@/data/blogData";
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

export default function BlogList() {
  const [filter, setFilter] = useState<(typeof blogCategories)[number]>("Todos");
  const whatsappUrl = buildWhatsAppUrl(
    companyData.whatsapp,
    companyData.whatsappMessages.default
  );

  const filtered = useMemo(() => {
    if (filter === "Todos") return blogPosts;
    return blogPosts.filter((post) => post.category === (filter as BlogCategory));
  }, [filter]);

  return (
    <div className="max-w-300 mx-auto px-4 sm:px-6 py-10 md:py-14">
      <header className="max-w-2xl mb-10">
        <h1
          className="font-heading font-semibold text-text-primary mb-3 leading-[1.2]"
          style={{ fontSize: "clamp(28px, 3.5vw, 42px)" }}
        >
          Cuidado felino com informação clara
        </h1>
        <p className="text-text-muted text-sm md:text-[15px] font-body leading-relaxed">
          Artigos para entender sinais, reduzir ansiedade e chegar à consulta
          melhor preparado. Não substituem avaliação veterinária.
        </p>
      </header>

      <div className="flex flex-wrap gap-2 mb-10">
        {blogCategories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setFilter(category)}
            className={`rounded-lg px-3.5 py-2 text-[12px] font-body font-semibold transition-colors ${filter === category
                ? "bg-primary text-white"
                : "bg-bg-section border border-border-default text-text-secondary hover:border-primary/40"
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {filtered.length === 0 && (
            <p className="text-sm font-body text-text-muted">
              Nenhum conteúdo nesta categoria ainda — em breve.
            </p>
          )}
          {filtered.map((post) => {
            const cover = images[post.coverImageKey];
            return (
              <article
                key={post.slug}
                className="overflow-hidden rounded-2xl border border-border-default bg-bg-section"
              >
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="relative aspect-video">
                    <Image
                      src={cover.src}
                      alt={cover.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-wrap items-center gap-2 text-[11px] font-body text-text-faint mb-2">
                      <span className="font-semibold uppercase tracking-widest text-primary">
                        {post.category}
                      </span>
                      <span>·</span>
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      <span>·</span>
                      <span>{post.readingMinutes} min de leitura</span>
                    </div>
                    <h2 className="font-heading font-semibold text-text-primary text-xl mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm font-body text-text-muted leading-relaxed mb-3">
                      {post.excerpt}
                    </p>
                    <p className="text-[11px] font-body text-text-faint">
                      Autor: {companyData.brandPerson} · {post.prototypeNote}
                    </p>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-border-default bg-bg-section p-6">
            <h2 className="font-heading font-semibold text-text-primary text-lg mb-2">
              Precisa de atendimento?
            </h2>
            <p className="text-[13px] font-body text-text-muted leading-relaxed mb-5">
              Conteúdo ajuda a entender. A avaliação define o caminho certo para
              o seu gato.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 min-h-12 px-5 py-3 bg-gradient-green text-white text-sm font-semibold font-body rounded-lg hover:-translate-y-0.5 hover:shadow-green transition-all"
            >
              Agendar atendimento
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/bio"
              className="mt-3 inline-flex w-full items-center justify-center min-h-11 text-sm font-body font-medium text-primary hover:underline"
            >
              Ou escolher pelo link da bio
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
