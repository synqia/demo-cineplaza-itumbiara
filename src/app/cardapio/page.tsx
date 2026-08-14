import type { Metadata } from "next";
import SiteShell from "@/components/layout/SiteShell";
import ProductCard from "@/components/cinema/ProductCard";
import { productCategories, products } from "@/data/products";
import { JsonLdBreadcrumb } from "@/components/seo/JsonLdMovieTheater";

export const metadata: Metadata = {
  title: "Cardápio",
  description:
    "Combos, pipocas, bebidas, doces e colecionáveis do cardápio Cineplaza Itumbiara.",
  alternates: { canonical: "/cardapio" },
};

export default function CardapioPage() {
  return (
    <SiteShell>
      <JsonLdBreadcrumb
        items={[
          { name: "Início", path: "/" },
          { name: "Cardápio", path: "/cardapio" },
        ]}
      />
      <main className="section-padding">
        <div className="container-cine">
          <div className="mb-8 max-w-2xl">
            <h1 className="font-heading text-[clamp(1.8rem,4vw,2.75rem)] font-bold">
              Cardápio
            </h1>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Monte o combo perfeito para a sessão. Neste protótipo, a seleção é
              simulada e a compra é concluída presencialmente.
            </p>
          </div>

          <div className="space-y-12">
            {productCategories.map((category) => {
              const items = products.filter(
                (product) => product.category === category.id
              );
              if (items.length === 0) return null;
              return (
                <section key={category.id} id={category.id}>
                  <h2 className="mb-5 font-heading text-2xl font-semibold">
                    {category.label}
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {items.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
