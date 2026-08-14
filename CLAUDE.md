# Allure — Landing Page de Energia Solar

## O que é

Landing page de geração de leads para a Allure, empresa de engenharia solar (residencial, comercial, industrial). Objetivo de negócio único: converter visitante em lead via WhatsApp. Site em português (pt-BR), foco total em conversão — não é institucional, é página de vendas.

## Stack

- **Framework**: Next.js 15 (App Router) + React 19, TypeScript
- **Estilo**: Tailwind v4 (`@tailwindcss/postcss`, não plugin v3) + CSS vars em `app/globals.css`
- **Componentes UI base**: shadcn/ui (Radix primitives) em `components/ui/`
- **Ícones**: `lucide-react`
- **Fontes**: `next/font/google` — Inter (corpo) + Plus Jakarta Sans (display/headlines, trocado de Inter Tight nesta sessão)
- **Animação**: CSS keyframes custom (`globals.css`) + `useScrollAnimation` hook (scroll-reveal) na maioria das sections; **GSAP + ScrollTrigger** (`gsap` 3.15) só na section Diferenciais (`why-allure.tsx`), pra timeline com scrub
- **Analytics**: `@vercel/analytics`

Rodar: `npm run dev` (porta 3000, cai pra 3001 se ocupada). Typecheck: `npx tsc --noEmit`.

## Estrutura da página

`app/page.tsx` renderiza, nesta ordem:

```
Header → Hero → Solutions → HowItWorks → Testimonials
→ SavingsCalculator → WhyAllure → FinalCTA → FAQ → Footer → WhatsAppButton
```

Section "Benefícios" ("Transforme sua conta de luz em patrimônio.") foi **removida do site** em 2026-08-14 a pedido do usuário — código completo arquivado em [archived-sections/benefits-patrimonio.md](archived-sections/benefits-patrimonio.md), com instruções de como restaurar. `components/benefits.tsx` foi deletado (não é mais órfão, foi removido de fato).

Cada section é um componente próprio em `components/*.tsx`, client component (`"use client"`), a maioria usando `useScrollAnimation` pra entrada fade-in-up no scroll.

**Componentes órfãos** (existem no repo, não são importados em `page.tsx`): `equipment-kit.tsx`, `pricing.tsx`, `service-area.tsx`, `solar-kit.tsx`, `timeline.tsx`, `inverter-highlight.tsx`, `cta-banner.tsx`, `stats-bar.tsx`. Provavelmente sobras de iteração anterior — não mexer neles achando que afetam a página ao vivo.

## Design system (`app/globals.css`)

Paleta de marca já definida via CSS vars — não inventar cores novas, usar as que já existem:

- `--brand` (#3B82F6), `--brand-2` (#2563EB, mais escuro/hover), `--brand-3` (#5BB8F5, accent claro), `--brand-muted` (#E7EEFB, fundo tintado)
- `--accent` (#FBB915, amarelo, uso pontual)
- `--background` (#FBFBF8, off-white), `--foreground` (#0C0F0D, quase preto)
- Radius scale: `--radius` base 1rem, com `sm/md/lg/xl/2xl` derivados
- Utilitário `.link-quiet`: CTA secundário discreto (texto + ícone, sem fundo) — criado nesta sessão pra substituir botões repetidos
- Utilitário `.section-py` / `.section-py-lg`: escala de padding vertical padronizada entre sections
- Utilitário `.card-hover` / `.card-shadow-sm` / `.card-shadow-md`: sombra tintada de azul (não preto puro) no hover de cards

CTA do WhatsApp usa link direto `https://wa.me/5516997650595?text=...` (mensagem pré-preenchida por section, cada uma com texto de contexto diferente) — não é modal, não é formulário embutido no link.

## Histórico desta sessão (o que já foi feito)

Branch de trabalho: `feature/redesign-visual-cta-hierarchy` (PR #2 aberto para `main`, ainda não mergeado).

1. **Auditoria de design** (skill `redesign-existing-projects`): identificou fonte genérica (Inter em tudo), 6 CTAs quase idênticos repetidos por section, sombras pretas cruas, hierarquia da hero (stats competindo com headline), FAQ com título "FAQ" gigante fora de escala.
2. **Redesign visual + consolidação de CTA**: fonte trocada pra Plus Jakarta Sans no display; CTAs reduzidos a 2 pontos fortes (hero + formulário do final-cta), todos os outros viraram `.link-quiet`; stats da hero reduzidos visualmente pra não competir com o CTA; sombras tintadas de azul; padding de section normalizado.
3. **Fix de contraste da section "Como Funciona"**: imagem de fundo sem overlay nenhum foi identificada como causa de baixo contraste — adicionado scrim gradiente (radial no desktop, linear no mobile) atrás do conteúdo, blur+opacidade na arte de fundo, `backdrop-blur` nos chips.
4. **Auditoria + fix de responsividade mobile**: `h-screen`→`dvh`, breakpoints inconsistentes entre sections (`md:` vs `lg:` pro mesmo padrão de 3 cards) alinhados, imagem de fundo da "Como Funciona" ganhou tamanho por breakpoint (estava fixo só pra desktop).
5. **Fix de overflow de texto em mobile** (bug real, visto em screenshot): CSS Grid tem `min-width: auto` por padrão — números grandes (`text-5xl`+) em cards de `why-allure.tsx` forçavam a coluna do grid a estourar a viewport em telas estreitas, cortando texto na borda. Corrigido com `min-w-0` + `text-pretty` em todos os componentes de card que seguem o padrão ícone+número+título+descrição (`why-allure`, `benefits`, `how-it-works`, `solutions`, `testimonials`, e os órfãos `equipment-kit`/`pricing` por consistência).
6. **Plano seção-por-seção de colunas mobile** (aprovado via plan mode): decidiu manter a maioria das sections em 1 coluna no mobile (texto longo demais pra 2 colunas a 360px), com 2 exceções que viraram 2/3 colunas: outputs do simulador de economia, e os 3 botões de "tipo de imóvel" no formulário final.
7. **Troca de imagem de fundo**: `paineis1.png` → `solar.png` na section "Como Funciona".
8. **Remodelagem mobile section-a-section + fix de scroll horizontal** (esta sessão, plano em `C:\Users\Gusatvo\.claude\plans\analise-o-claude-md-para-humming-beacon.md`):
   - **Bug de scroll horizontal (raiz)**: `ElectricBorder` (usado no `savings-calculator.tsx`) é `overflow-visible` + glow `scale-110`, sangrava pra fora da tela e, como nem a section nem `html`/`body` clipavam, virava scrollbar da página inteira. Corrigido com (a) clamp global `html, body { overflow-x: hidden; max-width: 100% }` em `globals.css` e (b) `overflow-hidden` na `<section>` do savings-calculator.
   - **Reversão da decisão de 1-coluna**: o usuário achou o empilhamento vertical feio/comprido e pediu colunas/carrossel. Aplicado: **Soluções** e **Depoimentos** viraram carrossel horizontal (scroll-snap, `.no-scrollbar`, hint "Arraste →"); **Como Funciona** virou 3 colunas compactas no mobile (descrição escondida via `hidden sm:block`, linha conectora reativada); **Benefícios** virou bento 1 grande + 2 lado a lado; **Diferenciais** (`why-allure`) virou 2 colunas desde 320px.
   - Utilitário novo `.no-scrollbar` em `globals.css` (esconde scrollbar dos carrosséis). Padrão de carrossel: container `flex md:grid md:grid-cols-3 ... overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-5 px-5 md:mx-0 md:px-0`, card `shrink-0 w-[82%] snap-start md:w-auto`.
9. **Diferenciais → roadmap animado GSAP** (FEITO — `why-allure.tsx` reescrito, commit `4aede5e`): grid de 6 cards virou timeline vertical. Linha central (track `bg-border` + fill `bg-brand`) que cresce por scrub no scroll; cada nó faz fade+rise ao entrar (`toggleActions: "play none none reverse"`). Desktop zigue-zague em torno da linha central; mobile 1-coluna com a linha à `left-5`. Featured (7 dias) = card `bg-brand` + badge "Destaque" com `Flame`. `gsap.matchMedia()` respeita `prefers-reduced-motion` (tudo visível, linha cheia, sem scrub); `gsap.context()` + `ctx.revert()` no cleanup evita ScrollTriggers duplicados no HMR. `npm i gsap` (3.15.0) instalado. Substituiu o `useScrollAnimation` só nesta section. **Nota**: isto reverteu o sub-bullet do item 8 que dizia "Diferenciais virou 2 colunas desde 320px" — agora é a timeline.
10. **Upgrade premium da timeline GSAP + ajustes de hero** (esta sessão):
   - `why-allure.tsx` (iteração final — **avião no path SVG**): linha virou SVG com path reto vertical (`M 1 0 V h`, `d` medido do container e re-medido em `refreshInit` do ScrollTrigger). Track cinza + fill azul desenhado por `pathLength={1}` + `strokeDashoffset 1→0`. Elemento "avião" (círculo `bg-brand` + ícone `Send` com `rotate-45` interno pra apontar pra baixo) voa pelo path via **MotionPathPlugin** (`align` + `alignOrigin:[0.5,0.5]` + `autoRotate`), no MESMO timeline scrubado do fill (`start/end` a 70% da viewport, `invalidateOnRefresh`) — ponta da linha e avião sempre na marca de 70% da viewport. Cards: `opacity:0, scale:0.8, rotate leve` → pop `scale 1.08` + tilt quando o avião passa (trigger `center 70%` = exatamente o ponto do avião), depois settle `scale:1, rotate:0`; nó pop `back.out(1.7)` + glow `drop-shadow` (filter, NÃO box-shadow — clobberaria `ring-*`). Tudo `once: true`. Branch `reduce`: linha cheia, avião escondido (`autoAlpha:0`), fade opacity-only por item. SVG sem `viewBox` de propósito (user units = px, senão MotionPath/autoRotate distorcem).
   - `hero.tsx` mobile: section virou `flex flex-col min-h-[100dvh] sm:min-h-0`; conteúdo usa `justify-between` no mobile (eyebrow+headline agrupados / subtítulo / CTAs espalhados pra preencher a hero) e volta a `justify-center` + `sm:min-h-[calc(78dvh+10px)]` no `sm+`.
   - `hero.tsx` desktop: estrelas do Google amarelas (`fill-accent text-accent`) e centralizadas com o texto (`items-center` + `text-center`).
   - **Ainda não verificado em browser real** (scrub, reveals once, hero mobile 360/390) — pendente checar ao vivo.
   - **Pegadinha da máquina do usuário**: Windows 11 dele está com "Efeitos de animação" DESLIGADO → browser reporta `prefers-reduced-motion: reduce` → branch `reduce` do GSAP deixa tudo estático e parece que "a animação quebrou". Antes de debugar animação "que não roda", checar isso. Branch `reduce` agora faz fade opacity-only (não fica 100% estático).
11. **Fix de responsividade da final-cta ("Fale com a Allure")** (esta sessão): section saía do esquadro no mobile — causa raiz era o `Button` shadcn (`whitespace-nowrap` + `shrink-0`) com label longo + ícones + `text-lg` = min-content ~400px, somado a `p-8` do card e grid sem `min-w-0` → coluna não encolhia → section mais larga que a viewport, clipada pelo `overflow-x: hidden` global. Fixes: `min-w-0` nos 2 filhos do grid, botão de submit com `whitespace-normal h-auto min-h-14 sm:min-h-16 py-3 text-base sm:text-lg`, card `p-6 sm:p-10`, linha "Prefere falar agora?" com `flex-wrap`. Preventivo no CTA da hero (`text-base sm:text-lg px-6 sm:px-10`). Radios "Tipo de imóvel" no mobile: círculo do radio escondido (`before:hidden sm:before:flex`, estado marcado = fundo azul) + `text-xs sm:text-sm` pra caber 3 colunas até 320px.
12. **Pendente / próximo passo discutido**: captura de leads do formulário — hoje só abre WhatsApp, lead se perde se a pessoa não enviar. Plano combinado: route handler `app/api/lead/route.ts` (fire-and-forget no submit, UX igual) → Google Sheets via Apps Script Web App primeiro, CRM da Allure depois (perguntar qual usam; RD Station/Kommo/Pipedrive têm API de lead). Segredos só no servidor. Ainda NÃO implementado.
13. **`benefits.tsx` reescrito do zero** (esta sessão, várias iterações): layout viu 2 colunas fixas (`lg:grid-cols-[42%_58%]`) — esquerda só texto (label/headline/subtítulo, sem imagem nenhuma), direita bloco de cards compacto colado na direita (`justify-end` + `max-w` cap, não `flex-grow` sozinho — grow sem cap preenche a linha toda e ignora `justify-end`).
   - **Desktop (≥1024px)**: 1 card grande (440px) + 2 estreitos (90px), gap 14px, hover expande via **GSAP width tween em px** (`power3.inOut`, 0.65s) — não Tailwind `flex-grow` (não dava o efeito "quase um bloco só" pedido). Ativo mostra ícone+título+descrição por cima da imagem (scrim gradiente); inativo mostra só label rotacionado (`writingMode: vertical-rl`) centralizado no rail estreito.
   - **Mobile (<1024px)**: sem hover, sem grid de 2 colunas — cards empilham 1 coluna, texto sempre horizontal (nunca rotacionado). Título fica sempre visível; descrição/ícone/badge "Destaque" aparecem via fade (`opacity+translate-y`) quando o card cruza 55% de visibilidade no viewport (`IntersectionObserver` por card, scoped a mobile via `gsap.matchMedia("(max-width: 1023px)")`) — soma ou sai de novo ao rolar pra cima/baixo, não é one-shot.
   - **Bug real encontrado e corrigido**: ao trocar de mobile→desktop sem reload (resize de viewport), o estado `isMobileInView` ficava preso em `true` — o cleanup do `gsap.matchMedia` desconectava o observer mas nunca resetava o state, então cards "colapsados" no desktop continuavam renderizando o texto full (título+descrição) por cima do label vertical, sobrepondo tudo. Fix: cleanup do `mm.add` agora chama `setIsMobileInView(false)` também.
   - Timing de fade sincronizado ao tween de largura pra evitar texto "bugado" no meio da transição: label vertical (rail estreito) só aparece com `delay-500` (depois que a largura já encolheu a maior parte), overlay ativo some com `delay-0`/`duration-100` (instantâneo) — se os dois usam a mesma velocidade de opacity (300ms) enquanto a largura anima em 650ms, os dois textos ficam visíveis ao mesmo tempo no card ainda largo.

## Convenções aprendidas (seguir daqui pra frente)

- **CTA do WhatsApp**: só 2 pontos de destaque máximo por página (hero + final-cta) — qualquer novo CTA de seção deve ser `.link-quiet`, não botão cheio. Header fica de fora dessa regra (é navegação persistente).
- **Cards com número grande + texto**: sempre `min-w-0` no grid item + `text-pretty` no texto, senão risco de overflow real em mobile (não é hipotético, já aconteceu).
- **Botão shadcn com label longo = bomba de largura**: o `Button` base tem `whitespace-nowrap` + `shrink-0` — label longo + ícones + `text-lg` vira min-content de ~400px que NUNCA quebra, estoura o grid pai (que também precisa de `min-w-0`) e desalinha a section inteira (aconteceu na final-cta). Fix: `min-w-0` nos grid items + no botão `whitespace-normal h-auto min-h-* py-*` (ou `text-base sm:text-lg` + padding menor no mobile, como no CTA da hero).
- **Scroll horizontal é bug, nunca aceitar** — `html, body` têm `overflow-x: hidden` global como rede de segurança, mas isso NÃO é desculpa pra deixar elemento vazar. Qualquer coisa `overflow-visible`/`scale-*`/canvas que sangra (ex: `ElectricBorder`) tem que ser contida na section (`overflow-hidden`) na origem. Testar sempre 320/360/390/430px.
- **Mobile agora usa colunas/carrossel, NÃO empilha tudo** (revisão da regra antiga): a decisão anterior de "manter 1-coluna" foi revertida nesta sessão — o usuário quer aproveitar a tela. Texto longo por card → **carrossel** horizontal (padrão de Soluções/Depoimentos). Texto curto (números/stats) → **grid de 2 colunas**. Passos/etapas → 3 colunas compactas escondendo descrição via `hidden sm:block`. Só cair pra 1-coluna quando realmente não couber e não fizer sentido carrossel (ex: formulário do final-cta, accordion do FAQ).
- **Esconder ≠ deletar**: onde o mobile omite texto (ex: descrição em 3-col), usar `hidden sm:block` — o desktop mantém tudo. Nunca remover copy do array de dados.
- **Preservar copy e paleta existentes** — este projeto é redesign incremental, não reescrita. Mudanças de conteúdo (texto visível) só quando pedido explicitamente, e mesmo assim confirmar antes (ex: "FAQ" → "Perguntas frequentes" foi confirmado com o usuário antes de aplicar).
- **GSAP (quando usar animação por scroll com scrub)**: registrar `ScrollTrigger` client-side dentro do effect (nunca no topo do módulo — quebra SSR). Sempre `gsap.context(() => {...}, ref)` + `return () => ctx.revert()` no cleanup (senão ScrollTriggers duplicam no HMR/re-render). `prefers-reduced-motion` via `gsap.matchMedia()` — no branch `reduce`, deixar tudo visível/estático. Padrão de referência: `why-allure.tsx`.
- **`gsap.matchMedia()` + React state combinados**: se o callback do breakpoint seta um `useState` (ex: resultado de um `IntersectionObserver` só-mobile), o cleanup do `mm.add(...)` PRECISA resetar esse state pro valor "desligado" — senão, ao cruzar o breakpoint sem reload (resize de janela), o state fica preso no valor antigo e a UI mistura comportamento mobile com desktop. Aconteceu no `benefits.tsx`.
- **Timing de fade em textos sobre elemento que também anima tamanho (width/height)**: se dois textos alternam opacity no mesmo elemento (um saindo, um entrando) enquanto o container anima largura/altura mais devagar, sincronizar os delays de opacity com a duração do tween de tamanho — senão os dois textos ficam visíveis ao mesmo tempo no meio da transição ("bugado"/sobreposto). Regra usada: o texto que sai some rápido (`delay-0`, duration curta), o que entra espera (`delay` ≈ duração do tween de tamanho) antes de aparecer.
- **Commit pelo Bash tool**: NÃO usar heredoc PowerShell `@'...'@` (o Bash é POSIX sh, mete `@` literal na mensagem). Escrever a mensagem num arquivo e `git commit -F <arquivo>`.
