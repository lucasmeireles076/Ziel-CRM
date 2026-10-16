# Entrega da Plataforma CRM Unificada: ZielHub + Vitgold + RD Station + Chatfor

Plataforma de CRM comercial e inteligência omnichannel desenvolvida e integrada para a **Vitgold**, com o sistema visual e tipográfico auditado e extraído diretamente do site oficial da **ZielHub** (`https://zielhub.com/`), atendendo à diretriz de **eliminar qualquer tonalidade de roxo/violeta** e aplicar a paleta autêntica de **Ciano Elétrico**, **Azul Técnico** e **Obsidian Espacial**.

---

## 1. Auditoria e Extração do Design System da ZielHub (`zielhub.com`)

Através de inspeção direta dos tokens do site oficial da ZielHub, foram identificadas as variáveis de CSS e regras tipográficas nativas:

| Token Semântico | Valor Hex / RGB | Papel no Hub Vitgold |
| :--- | :--- | :--- |
| `--brand-cyan` | `#4EC5E8` | Ações primárias, botões CTA com glow, badges ativos e destaque de IA |
| `--brand-highlight`| `#6DD3F5` | Estados de hover e foco em botões e gráficos |
| `--brand-blue` | `#2E86D0` | Acentos secundários, linhas de spline do gráfico, ícones analíticos |
| `--brand-navy` | `#0B2A4A` | Superfícies profundas de cards e fatias de menor volume no Donut SVG |
| `--background` | `#030711` | Fundo principal da aplicação (Obsidian Profundo) |
| `--surface-card`| `#0A1322` | Cards escuros, cabeçalho e barras de navegação |
| `--line` | `rgba(255,255,255,0.08)` | Divisores e bordas ultrafinas |
| `--text-dark-cta`| `#03111C` | Tipografia em preto contrastante sobre botões e badges ciano |

> [!IMPORTANT]
> **Zero Roxo / Violeta**: Toda e qualquer ocorrência de roxo (`#7C6BF5`, `#7B2CBF`, `#4F46E5`, lilás e violeta) foi 100% eliminada do código, sendo substituída pelo contraste característico da ZielHub entre **Ciano Elétrico** e **Azul Técnico**.

### Tipografia Oficial Incorporada
- **Sans-serif Principal**: `Geist` (pesos 300 a 800) combinada com `Inter`, carregada via Google Fonts.
- **Serif Editorial Itálico**: `Newsreader` para termos de ênfase técnica e sofisticação institucional.
- **Monospaçada**: `'JetBrains Mono', 'Fira Code', monospace` para SLAs, valores e moedas.

---

## 2. Módulos Atualizados na Nova IDV

1. **Sidebar Vertical em Grupos Semânticos:**
   - Active state com fundo `--brand-cyan` (`#4EC5E8`), texto `--text-dark-cta` (`#03111C`) e sombra glow ciano.
   - Logo Z em gradiente suave `--brand-blue` (`#2E86D0`) para `--brand-cyan` (`#4EC5E8`).
   - Seletor de Perfil (Admin, Vitgold, Geral) padronizado.

2. **Pipeline Kanban ZielHub:**
   - Etapas sem roxo: `Novo Lead` (`#2E86D0`), `Atendimento IA` (`#4EC5E8`), `Qualificado` (`#10B981`), `Carrinho Iniciado` (`#F59E0B`), `Pedido Faturado` (`#06B6D4`).
   - Alerta de No-Show do Chatfor preservado em vermelho de alta atenção para estagnações acima de 24h.

3. **Painel de BI & Forecast (Gráficos SVG Originais):**
   - **Donut Chart SVG**: WhatsApp ZielHub (`#4EC5E8`), Meta Ads (`#2E86D0`), Loja VTEX (`#0B2A4A`) e Marketplaces (`#6DD3F5`).
   - **Heatmap de Horários**: Escala térmica em azul e ciano de alta legibilidade.

4. **Gráfico de E-commerce RD Station:**
   - Spline temporal recalculada com traçado em `#2E86D0`, preenchimento gradiente ciano suave e tooltips obsidian com borda sutil.

5. **Equipe Vitgold & Importador de Planilhas:**
   - Tags de função e botões de carregamento atualizados no padrão visual da ZielHub.

---

## 3. Registro Visual Atualizado (Sem Roxo)

````carousel
![Pipeline Kanban ZielHub](/C:/Users/user/.gemini/antigravity/brain/077447e2-1eec-482b-9f38-251b708b46fe/preview_pipeline_kanban.png)
<!-- slide -->
![Painel BI & Forecast ZielHub](/C:/Users/user/.gemini/antigravity/brain/077447e2-1eec-482b-9f38-251b708b46fe/preview_bi_forecast.png)
<!-- slide -->
![Análise de E-commerce Spline Azul](/C:/Users/user/.gemini/antigravity/brain/077447e2-1eec-482b-9f38-251b708b46fe/preview_ecommerce_rd.png)
<!-- slide -->
![Equipe Vitgold (Uso, Tempo & Tags)](/C:/Users/user/.gemini/antigravity/brain/077447e2-1eec-482b-9f38-251b708b46fe/preview_equipe_vitgold.png)
<!-- slide -->
![Importador Inteligente de Planilhas](/C:/Users/user/.gemini/antigravity/brain/077447e2-1eec-482b-9f38-251b708b46fe/preview_importador_planilha.png)
<!-- slide -->
![Disparos & Campanhas Meta](/C:/Users/user/.gemini/antigravity/brain/077447e2-1eec-482b-9f38-251b708b46fe/preview_campanhas_meta.png)
<!-- slide -->
![Central de Conversas Omnichannel](/C:/Users/user/.gemini/antigravity/brain/077447e2-1eec-482b-9f38-251b708b46fe/preview_conversas.png)
````

---

## 4. Instruções de Execução

```powershell
# Diretório do projeto
cd C:\Users\user\.gemini\antigravity\scratch\vitgold-crm

# Executar servidor local
npm.cmd run dev

# Compilar para produção
npm.cmd run build
```
