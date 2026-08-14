"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { blogPosts } from "@/data/blogData";
import { images } from "@/data/imagesData";

export default function ContentTeaserSection() {
  const { ref, isVisible } = useScrollAnimation();
  const post = blogPosts[0];
  const cover = images[post.coverImageKey];

  return (
    <section
      id="conteudos"
      className="py-14 md:py-22 bg-bg-base"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="max-w-300 mx-auto px-4 sm:px-6">
        <div
          className={`flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="max-w-xl">
            <h2
              className="font-heading font-semibold text-text-primary mb-3 leading-[1.2]"
              style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}
            >
              Conteúdo para tutores que querem entender antes de agendar
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold font-body text-primary hover:underline shrink-0"
          >
            Ver todos os conteúdos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className={`group grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden rounded-2xl border border-border-default bg-bg-section transition-all duration-500 hover:shadow-card-hover ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="relative aspect-16/10 md:aspect-auto md:min-h-72">
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="p-6 sm:p-8 flex flex-col justify-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary font-body mb-3">
              {post.category}
            </span>
            <h3 className="font-heading font-semibold text-text-primary text-xl sm:text-2xl mb-3 leading-snug">
              {post.title}
            </h3>
            <p className="text-text-muted text-sm font-body leading-relaxed mb-5">
              {post.excerpt}
            </p>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold font-body text-primary">
              Ler artigo
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
