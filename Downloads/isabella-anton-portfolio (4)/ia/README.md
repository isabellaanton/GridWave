# ia — portfólio de Isabella Anton

Next.js 15 (App Router) + TypeScript + Tailwind CSS 3. Quadrilíngue (PT · EN · FR · DE), pronto para a Vercel.

## Rodar localmente

```bash
npm install
npm run dev        # http://localhost:3000  (redireciona para /pt, /en, /fr ou /de)
npm run build && npm start   # versão de produção
```

## Editar o conteúdo

Tudo fica em **`content/content.ts`**. Procure por `[TODO]` e troque pelos seus dados
(bio, projetos, experiência, links, e-mail, domínio em `site.url`).
`t('português', 'english', 'français', 'deutsch')` escreve o mesmo texto nos 4 idiomas.
Para adicionar um idioma, inclua-o em `content/i18n.ts` (`LANGS`) e em `middleware.ts`.

## Currículo (PDF)

Coloque o seu PDF em `public/` (ex.: `Curriculo_Isabella_Anton.pdf`) e troque `resume.href` por `/Curriculo_Isabella_Anton.pdf` em `content/content.ts`. Hoje o botão aponta para o PDF do site antigo.
Para um arquivo por idioma, edite `resume.href` em `content/content.ts`.
O botão aparece na navbar, no hero (pílula "currículo"), em Sobre e em Contato.

## Deploy na Vercel

1. Suba a pasta para um repositório no GitHub.
2. Em vercel.com → **Add New → Project** → importe o repositório (nenhuma configuração extra).
3. (Opcional) Em Settings → Environment Variables: `NEXT_PUBLIC_SITE_URL` = seu domínio.
4. Troque `site.url` em `content/content.ts` pelo domínio final (usado em OG, sitemap e robots).

## Estrutura

```
app/
  layout.tsx            html, metadados base, fundo, script anti-flash do dock
  [lang]/page.tsx       página única por idioma (SEO, hreflang, JSON-LD)
  not-found.tsx         404 "Essa página alucinou"
  icon.svg              favicon "ia"
  opengraph-image.tsx   imagem de compartilhamento
  globals.css           tokens (paleta, fontes, raio, brilho), grid, animações, modo debug
components/             Hero, Navbar, Dock, Sections, StatusChips, ...
content/                content.ts (seus dados) + i18n.ts
middleware.ts           "/" → idioma do navegador
```

## O jogo com o "IA" (versão sóbria)

- **IA = ?** Passe o mouse (ou toque) no "i" ou no "a" grandes do wordmark, ou no botão abaixo da frase:
  alterna entre Isabella Anton, Interfaces Acessíveis, Inovação Aplicada, Imaginação Aplicada,
  Impacto Social e Inteligência Aplicada (edite em `hero.ia`).
- **Logo e favicon:** "ia" em lilás e laranja.
- **Rodapé:** "IA: Isabella Anton. Interfaces Acessíveis, Inovação Aplicada."
- **Aba do navegador:** muda para "ia · até já" quando você sai da aba.
- **Letras reagem às pílulas:** hover/foco numa pílula acende a linha e faz a letra pular e brilhar.
- **Topo:** cidade e hora local de Fortaleza.
- **Dock:** paleta, fonte, espaçamento, raio, brilho e modo debug (tecla D). Tudo persiste no localStorage.
- **Grid interativo** que reage ao mouse; `prefers-reduced-motion` desliga as animações.

## Ideias para depois

Konami code que troca a paleta para neon, contador de "alucinações evitadas", modo claro,
página /uses, RSS para a seção de escrita.
