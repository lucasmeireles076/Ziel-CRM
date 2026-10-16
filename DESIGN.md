# Design System & IDV Tokens: ZielHub Authentic Identity (Vitgold CRM)

Este documento é a **Fonte da Verdade Única (Single Source of Truth)** para a identidade visual do **Vitgold CRM**, extraída e auditada diretamente do site oficial da **ZielHub** (`https://zielhub.com/`) com a diretriz explícita do usuário: **Siga as cores da ZielHub para o hub principal e EVITE ROXO (Zero Roxo / Violeta)**.

---

## 1. Paleta Semântica de Cores Oficial da ZielHub (CSS Variables)

A identidade da ZielHub é ancorada no contraste futurista entre o preto espacial/obsidian profundo (`#030711`) e acentos luminosos em **Ciano Elétrico / Aqua Blue** (`#4EC5E8`), **Azul Técnico** (`#2E86D0`) e **Azul Marinho Profundo** (`#0B2A4A`). **Não há roxo/violeta no ecossistema da ZielHub.**

### Cores da Marca (Brand Tokens Oficiais de zielhub.com)
- `--brand-cyan`: `#4EC5E8` *(Primary Action / Accent / Glow)* - RGB: `78, 197, 232`
- `--brand-highlight`: `#6DD3F5` *(Hover / Active Focus)* - RGB: `109, 211, 245`
- `--brand-blue`: `#2E86D0` *(Secondary Brand Blue)* - RGB: `46, 134, 208`
- `--brand-navy`: `#0B2A4A` *(Deep Container / Surface Accent)* - RGB: `11, 42, 74`
- `--text-dark-cta`: `#03111C` *(Cor de texto de alto contraste para botões e badges ciano)*

### Superfícies e Modo Escuro (Obsidian & Navy)
- `--background`: `#030711` *(Fundo principal da aplicação, sidebar e topo)*
- `--surface-card`: `#0A1322` *(Superfícies de cards e containers secundários)*
- `--surface-elevated`: `#0E1A2D` *(Superfícies elevadas e menus flutuantes)*
- `--line`: `rgba(255, 255, 255, 0.08)` / `#1E293B` *(Bordas suaves)*
- `--line-strong`: `rgba(255, 255, 255, 0.14)` *(Bordas ativas e divisores)*

### Superfícies Claras Analíticas (Canvas de Trabalho)
- `--color-bg-canvas-light`: `#F8FAFC` *(Área de trabalho de relatórios e tabelas)*
- `--color-surface-white`: `#FFFFFF` *(Cards de métricas e formulários)*
- `--color-border-subtle`: `#E2E8F0` *(Bordas de tabelas e grids)*

### Pipeline Kanban ZielHub (Cores Harmonizadas Sem Roxo)
- `--stage-novo`: `#2E86D0` *(Azul Técnico ZielHub - Novo Lead)*
- `--stage-ia`: `#4EC5E8` *(Ciano Elétrico ZielHub - Atendimento IA Sofia)*
- `--stage-qualificado`: `#10B981` *(Esmeralda - Qualificado Score A/B)*
- `--stage-proposta`: `#F59E0B` *(Âmbar - Carrinho / Proposta em Aberto)*
- `--stage-ganho`: `#06B6D4` *(Ciano Oceano - Pedido Faturado / Ganho)*
- `--stage-noshow`: `#EF4444` *(Vermelho Alerta - No-Show > 24h Chatfor)*

---

## 2. Tipografia Oficial (Geist & Editorial Serif)

Extraída das fontes reais utilizadas no site da ZielHub:
- **Fonte Principal (Sans)**: `Geist, 'Inter', ui-sans-serif, system-ui, sans-serif`
  - Pesos: `400` (Regular), `500` (Medium), `600` (SemiBold), `700` (Bold), `800` (ExtraBold)
- **Fonte de Acento Editorial**: `Newsreader, 'Playfair Display', Georgia, serif` *(Italic)*
  - Usada para realçar termos de alto impacto com sofisticação (ex: "*sob medida*", "*sistemas de IA em produção*").
- **Fonte Monospaçada**: `'JetBrains Mono', 'Fira Code', monospace` para SLAs, valores, moedas e horários.

---

## 3. Botões e Micro-interações (Estilo ZielHub)

- **Botão Primário (CTA ZielHub)**:
  - Fundo: `#4EC5E8` (`--brand-cyan`)
  - Texto: `#03111C` (`font-bold`)
  - Raio de curvatura: `12px` (`rounded-xl`)
  - Efeito Glow: `shadow-[0_0_20px_rgba(78,197,232,0.35)]`
  - Hover: `bg-[#6DD3F5]` com transição suave `transition-all duration-200`
- **Botão Secundário / Ghost**:
  - Fundo: `rgba(255, 255, 255, 0.03)`
  - Borda: `1px solid rgba(255, 255, 255, 0.12)`
  - Texto: `#FFFFFF`
  - Hover: `bg-white/10 text-white`
