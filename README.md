# Landing page — Dra. Eliane Senger

Protótipo de apresentação: landing de autoridade e conversão para **medicina e odontologia felina** em Joinville/SC. Inclui rota `/bio` (hub de intenção, no lugar do Linktree), blog educativo com um artigo-exemplo, páginas legais, consentimento de cookies e analytics opcional. O CTA principal é o WhatsApp, com mensagens por intenção e UTM da URL.

Não se destina a distribuição pública nem a reutilização como template ou produto de terceiros. Parte do conteúdo (credenciais, horários, área domiciliar, consultorias e fotos) é rascunho de levantamento público e deve ser validada antes de qualquer publicação.

---

## Stack

- **Next.js** 16 (App Router) · **React** 19 · **TypeScript**
- **Tailwind CSS** 4 · **shadcn/ui** (Base UI)
- Deploy preparado para Vercel

---

## Como rodar

```bash
npm install
cp .env.example .env   # ajuste NEXT_PUBLIC_SITE_URL
npm run dev
```

Build de produção: `npm run build` · `npm start`

---

## Rotas

| Rota | Papel |
|------|--------|
| `/` | Landing única: hero, credenciais, áreas, medicina felina, odontologia, domiciliar, consultorias, processo, sobre, prova social, teaser de conteúdo, FAQ e CTA |
| `/bio` | Link in bio personalizado — triagem por necessidade e WhatsApp |
| `/blog` | Índice de conteúdos educativos |
| `/blog/sinais-de-dor-dental-em-gatos` | Artigo-exemplo do nicho (odontologia felina) |
| `/cookies`, `/politica-de-privacidade`, `/termos-de-uso` | Páginas legais (LGPD) |

Serviços não têm páginas internas: são âncoras na Home (`#atuacao`, `#medicina-felina`, `#odontologia`, `#domiciliar`, `#consultorias`, `#sobre`, `#contato`).

---

## Configuração

| O quê | Onde |
|--------|------|
| Dados da profissional (nome, WhatsApp, redes, mensagens) | `src/data/companyData.ts` |
| Áreas, FAQ, prova social, blog, textos legais, imagens | `src/data/` |
| URL canônica e analytics (GA, GTM, Meta Pixel) | `.env` — ver `.env.example` |

Analytics só carrega após consentimento de cookies. E-mail, CRMV, horário e endereço fixo ficam vazios ou “a confirmar” até validação direta.

---

## Estrutura principal

```
src/
├── app/           # Rotas (home, /bio, /blog, cookies, privacidade, termos)
├── components/    # Layout, seções, bio, blog, SEO, UI, WhatsApp, cookies
├── data/          # Conteúdo editável do protótipo
└── lib/           # env, WhatsApp (UTM), cookies, utils
docs/              # Plano de estrutura e notas do lead
```

---

## Licença e direitos de uso

Este repositório e todo o código nele contido são de **uso privado e propriedade exclusiva do titular deste repositório**. É proibida a cópia, redistribuição, modificação, publicação em outros repositórios ou qualquer forma de uso comercial por terceiros, salvo mediante autorização prévia e expressa por escrito.

Qualquer uso não previsto acima deve ser previamente acordado por escrito com o titular dos direitos.
