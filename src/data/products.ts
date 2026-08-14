import type { Product } from "@/types/cinema";

export const products: Product[] = [
  {
    id: "p1",
    slug: "combo-classico",
    name: "Combo Clássico",
    description: "Pipoca média, refrigerante 500 ml e uma sobremesa surpresa.",
    imageUrl:
      "https://images.unsplash.com/photo-1585647347483-22b66260dfff?auto=format&fit=crop&w=800&q=80",
    category: "combos",
    priceFrom: 32.9,
    badge: "Mais pedido",
    variants: [
      { id: "p1-sal", name: "Pipoca salgada", price: 32.9 },
      { id: "p1-doce", name: "Pipoca doce", price: 34.9 },
      { id: "p1-mista", name: "Pipoca mista", price: 35.9 },
    ],
  },
  {
    id: "p2",
    slug: "combo-dupla",
    name: "Combo Dupla",
    description: "Pipoca grande para dividir, dois refrigerantes e nachos.",
    imageUrl:
      "https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=800&q=80",
    category: "combos",
    priceFrom: 49.9,
    badge: "Para dois",
    variants: [
      { id: "p2-refri", name: "Com refrigerante", price: 49.9 },
      { id: "p2-suco", name: "Com suco", price: 52.9 },
    ],
  },
  {
    id: "p3",
    slug: "balde-colecionavel",
    name: "Balde Colecionável",
    description: "Balde temático da temporada com pipoca grande inclusa.",
    imageUrl:
      "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?auto=format&fit=crop&w=800&q=80",
    category: "colecionaveis",
    priceFrom: 44.9,
    badge: "Edição limitada",
    variants: [
      { id: "p3-sal", name: "Salgada", price: 44.9 },
      { id: "p3-caramelo", name: "Caramelo", price: 47.9 },
    ],
  },
  {
    id: "p4",
    slug: "pipoca-caramelo",
    name: "Pipoca Caramelo",
    description: "Pipoca crocante com cobertura de caramelo artesanal.",
    imageUrl:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
    category: "pipocas",
    priceFrom: 22.9,
    variants: [
      { id: "p4-m", name: "Média", price: 22.9 },
      { id: "p4-g", name: "Grande", price: 28.9 },
    ],
  },
  {
    id: "p5",
    slug: "refrigerante-gelado",
    name: "Refrigerante Gelado",
    description: "Opções de cola, guaraná e limão em copo ou garrafa.",
    imageUrl:
      "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80",
    category: "bebidas",
    priceFrom: 12.9,
    variants: [
      { id: "p5-500", name: "500 ml", price: 12.9 },
      { id: "p5-700", name: "700 ml", price: 15.9 },
    ],
  },
  {
    id: "p6",
    slug: "milkshake-cinema",
    name: "Milkshake Cinema",
    description: "Chocolate, baunilha ou morango — cremoso e bem gelado.",
    imageUrl:
      "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
    category: "bebidas",
    priceFrom: 19.9,
  },
  {
    id: "p7",
    slug: "chocolate-premium",
    name: "Chocolate Premium",
    description: "Barrinhas e bombons para acompanhar a sessão.",
    imageUrl:
      "https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=800&q=80",
    category: "doces",
    priceFrom: 9.9,
  },
  {
    id: "p8",
    slug: "bala-sortida",
    name: "Bala Sortida",
    description: "Mix de balas e gomas para petiscar sem fazer barulho.",
    imageUrl:
      "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=800&q=80",
    category: "doces",
    priceFrom: 8.5,
  },
];

export const productCategories: Array<{
  id: Product["category"];
  label: string;
}> = [
  { id: "combos", label: "Combos" },
  { id: "pipocas", label: "Pipocas" },
  { id: "bebidas", label: "Bebidas" },
  { id: "doces", label: "Doces" },
  { id: "colecionaveis", label: "Colecionáveis" },
];

export function getProductsByCategory(category: Product["category"]): Product[] {
  return products.filter((product) => product.category === category);
}

export function getFeaturedProducts(limit = 4): Product[] {
  return products.slice(0, limit);
}

export function formatPrice(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
