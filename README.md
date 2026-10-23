# Portfólio — Mardoqueu Martins

Site pessoal de **Mardoqueu Martins, desenvolvedor front-end** em Maceió/AL. Ele tem dois públicos: clientes que procuram sites e landing pages, e recrutadores avaliando candidatos para vagas de front-end.

Produção: https://portfolio.mardoqueumartins.com.br

## Stack

| Camada     | Escolha                                                                 |
| ---------- | ----------------------------------------------------------------------- |
| Base       | React 19 + TypeScript (modo estrito) + Vite                             |
| Estilo     | Tailwind CSS v4 com tokens semânticos da marca (`src/index.css`)        |
| Animação   | Motion (Framer Motion) com `LazyMotion`, vinculada ao scroll            |
| Rotas      | React Router, com páginas secundárias carregadas sob demanda            |
| Tipografia | Space Grotesk (títulos) e Inter (texto), auto-hospedadas via Fontsource |
| Qualidade  | ESLint, Prettier (com ordenação de classes do Tailwind)                 |

## Decisões que valem destacar

- **Uma rota para cada público.** O hero oferece dois caminhos: o cliente vai para Serviços e o recrutador para a seção dele, com currículo, stack e formação.
- **Projetos em trilha horizontal guiada pelo scroll.** No desktop a seção fica fixa e os cards deslizam conforme a página rola. A rolagem vertical é 1:1 com o deslocamento horizontal, então o foco por teclado também leva o card até a tela. No mobile, com tela baixa ou com `prefers-reduced-motion`, vira uma grade comum.
- **Conteúdo separado da interface.** Todos os textos ficam em `src/data`. O que ainda falta preencher está marcado como `PENDENTE` e aparece destacado na página.
- **Privacidade por padrão.** Nenhum script, fonte ou imagem de terceiros, e nenhum cookie de rastreamento. O aviso de consentimento registra a versão dos termos aceita e reaparece quando eles mudam.
- **Performance.** Imagens em WebP com dimensões explícitas, fontes variáveis com `unicode-range`, páginas legais e de case em chunks separados.

## Estrutura

```
src/
  components/
    layout/     Header, Footer, aviso de consentimento, Layout
    sections/   Seções da home (Hero, Projects, Services…)
    ui/         Botões, ícones, marcador de PENDENTE
  data/         Copy, projetos e dados de contato
  hooks/        useMediaQuery, useDocumentTitle
  lib/          Contexto de consentimento (LGPD)
  pages/        Home, Case, 404 e páginas legais
public/         Currículo, og:image, favicon, .htaccess, robots e sitemap
```

## Rodando localmente

```bash
npm install
npm run dev        # servidor de desenvolvimento
npm run build      # checagem de tipos + build de produção em dist/
npm run preview    # serve o build
npm run lint
npm run format
```

## Deploy

O build gera arquivos estáticos em `dist/`.

- **cPanel/Apache:** `.cpanel.yml` copia `dist/` para a pasta do subdomínio. Rode `npm run build` antes do deploy. O `public/.htaccess` redireciona as rotas da SPA para o `index.html`.
- **Vercel:** `vercel.json` já tem o rewrite das rotas. Basta importar o repositório.

## Antes de publicar

Os cases ficam em `src/data/projects.ts`. Campos opcionais sem informação confirmada (papel, desafio, resultado, depoimento) simplesmente não aparecem na página. A seção de depoimentos da home está oculta e volta quando houver depoimentos reais em `src/data/content.ts`.
