import { images } from "@/data/imagesData";

export type BlogCategory =
  | "Odontologia"
  | "Medicina felina"
  | "Domiciliar"
  | "Condições específicas";

export interface BlogSection {
  heading?: string;
  paragraphs: string[];
  list?: string[];
  imageKey?: keyof typeof images;
  notice?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  date: string;
  readingMinutes: number;
  coverImageKey: keyof typeof images;
  metaTitle: string;
  metaDescription: string;
  prototypeNote: string;
  sections: BlogSection[];
}

export const blogCategories: Array<"Todos" | BlogCategory> = [
  "Todos",
  "Odontologia",
  "Medicina felina",
  "Domiciliar",
  "Condições específicas",
];

export const blogPosts: BlogPost[] = [
  {
    slug: "sinais-de-dor-dental-em-gatos",
    title: "Sinais de dor dental em gatos (e o que fazer antes da consulta)",
    excerpt:
      "Gatos raramente choram de dor. Mudança ao comer, mau hálito e isolamento podem ser o recado da boca.",
    category: "Odontologia",
    date: "2026-08-12",
    readingMinutes: 5,
    coverImageKey: "blogCover",
    metaTitle: "Sinais de dor dental em gatos | Dra. Eliane Senger",
    metaDescription:
      "Mau hálito, dificuldade para comer e isolamento podem indicar dor na boca. Veja os sinais e quando buscar avaliação odontológica felina em Joinville.",
    prototypeNote:
      "Artigo educativo de protótipo — rascunho para demonstração de SEO temático. Revisão clínica obrigatória antes da publicação.",
    sections: [
      {
        paragraphs: [
          "Gatos escondem dor. A boca é um dos lugares mais silenciosos — e um dos que mais afetam alimentação, humor e qualidade de vida.",
          "Mau hálito, dificuldade para mastigar ou mudanças sutis no comportamento podem ser o primeiro aviso de doença periodontal ou inflamação gengival. Este texto é educativo: não substitui avaliação veterinária.",
        ],
      },
      {
        heading: "O que observar em casa",
        paragraphs: [
          "Nem todo sinal aparece de uma vez. Observe o conjunto e anote há quanto tempo começou:",
        ],
        list: [
          "Mau hálito persistente",
          "Mastigar de um lado só ou deixar cair a ração",
          "Recusar ração seca ou preferir comida molhada de forma súbita",
          "Babar ou esfregar o rosto",
          "Parar de se limpar com o mesmo cuidado de antes",
          "Irritação ao toque na cabeça ou ao redor da boca",
          "Isolamento ou irritabilidade sem outro motivo aparente",
        ],
        imageKey: "blogMouth",
      },
      {
        heading: "Dor que muda o comportamento",
        paragraphs: [
          "Quando a boca dói, o gato pode comer menos, emagrecer, ficar mais retraído ou agressivo ao ser manipulado na cabeça.",
          "Em alguns casos, a inflamação oral se relaciona a condições como gengivoestomatite — um quadro que exige avaliação cuidadosa e plano individualizado. Conteúdo sobre condições específicas deve sempre vir acompanhado de aviso: informação não é diagnóstico.",
        ],
        imageKey: "blogHiding",
      },
      {
        heading: "Antes da consulta: o que não fazer",
        paragraphs: ["Três cuidados práticos enquanto organiza o atendimento:"],
        list: [
          "Não medicar por conta própria — anti-inflamatórios e antibióticos humanos (ou de outros animais) podem ser perigosos",
          "Não esperar “passar sozinho” se o gato já mudou o apetite ou o humor",
          "Não comparar o quadro com o de cães: a expressão de dor e o manejo felino são diferentes",
        ],
      },
      {
        heading: "Como a avaliação odontológica ajuda",
        paragraphs: [
          "Na avaliação, a profissional observa sinais clínicos, histórico e, quando indicado, orienta exames ou próximos passos.",
          "O objetivo é clareza: entender o que está acontecendo, o grau de urgência e qual caminho faz sentido para aquele gato — sem alarmismo e sem promessa de resultado.",
        ],
        imageKey: "blogExam",
      },
      {
        paragraphs: [
          "Se você notou algum desses sinais em Joinville e região, vale conversar sobre uma avaliação de saúde oral.",
        ],
        notice:
          "Artigo educativo. Sem diagnóstico à distância. Conduta somente após avaliação veterinária.",
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllSlugs(): string[] {
  return blogPosts.map((post) => post.slug);
}
