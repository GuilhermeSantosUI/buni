# b.Uni — Livro de marca

Site do livro de marca b.Uni. Vite + React + TypeScript + Tailwind v4 + shadcn/ui + GSAP (ScrollTrigger) + Lenis.

```bash
npm install
npm run dev
npm run build
```

## Estrutura

- `src/components/chapters/` um componente por capítulo (Plataforma, Público, Logo, Cor, Tipografia, Linguagem visual, Voz, Imagem, Produto, Movimento, Aplicações, Recursos)
- `src/components/brand/` Logo vetorial, Lockup, TopBar, Intro, Chapter/Block, SplitReveal, Reveal, FlowLines
- `src/components/product/` componentes de interface e o app mock
- `src/components/ui/` shadcn/ui (button, tabs, dialog, accordion, table, tooltip, sonner, input, badge, card)
- `src/lib/` gsap, motion tokens, lenis, color (contraste WCAG, escalas, CMYK)
- `public/assets/` logos em SVG (reconstruídos da geometria) e imagens de referência

Tokens de marca e tema em `src/index.css`. A versão estática anterior está em `_legacy/` (ignorada pelo git).

## Páginas

- `/` livro de marca (`index.html`)
- `/landing.html` landing page (`src/landing/`). Configure link do app, lojas e dados legais em `src/landing/config.ts`.
