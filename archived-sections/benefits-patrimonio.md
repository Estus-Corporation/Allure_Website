# Section arquivada: "Transforme sua conta de luz em patrimônio."

**Removida em**: 2026-08-14
**Motivo**: pedido explícito do usuário — tirar a section do site, guardando o código pra eventual retorno.
**Componente original**: `components/benefits.tsx` (arquivo deletado do repo; código completo abaixo).

## Como restaurar

1. Recriar `components/benefits.tsx` com o conteúdo da seção "Código completo" abaixo.
2. Em `app/page.tsx`, adicionar de volta:
   ```tsx
   import Benefits from "@/components/benefits";
   ```
   e renderizar `<Benefits />` entre `<HowItWorks />` e `<Testimonials />` (posição original na ordem da página).
3. Dependências que a section usa e que **continuam no repo** (não foram tocadas): `components/rotating-badge.tsx`, hook `useScrollAnimation` (`hooks/use-scroll-animation`), `gsap` (já é dependência do projeto).
4. Imagens usadas: `public/images/benefit-economy.jpg` (ativa no array `benefits`) e `public/images/benefit-value.jpg` (não estava mais referenciada no array no momento da remoção, mas segue em `public/images/` caso queira reaproveitar).

## O que era

Section "Benefícios" com layout 2 colunas no desktop (`lg:grid-cols-[44%_56%]`): esquerda com headline "Transforme sua conta de luz em **patrimônio**." + subtítulo, mini-features (economia/valorização/sustentabilidade) e CTA "Simular minha economia"; direita com painel de imagem (`benefit-economy.jpg`) com hover-expand via GSAP (largura animada em px) e um card flutuante "voando" no canto inferior direito. Mobile: badge rotativo no lugar dos mini-cards, painel de imagem revela texto via `IntersectionObserver` ao cruzar 55% de visibilidade.

Ficava renderizada em `app/page.tsx` nesta ordem: `Header → Hero → PartnersHero → Solutions → HowItWorks → Benefits → Testimonials → WhyAllure → SavingsCalculator → FinalCTA → FAQ → Footer`.

## Código completo (`components/benefits.tsx`)

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Calculator, Sun, Home, TrendingDown, TrendingUp, Leaf, ShieldCheck } from "lucide-react";
import { gsap } from "gsap";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import RotatingBadge from "@/components/rotating-badge";

interface Benefit {
  image: string;
  title: string;
  description: string;
  Icon: typeof Sun;
}

const benefits: Benefit[] = [
  {
    image: "/images/benefit-economy.jpg",
    title: "Reduza até 90% da conta de luz",
    description: "A economia começa já no primeiro mês e se acumula ao longo de mais de duas décadas de geração.",
    Icon: Sun,
  },
];

const miniFeatures = [
  {
    Icon: TrendingDown,
    title: "Até 90% de economia",
    description: "Reduza sua conta de luz e economize todos os meses.",
  },
  {
    Icon: Home,
    title: "Valoriza seu imóvel",
    description: "Imóveis com energia solar valem mais no mercado.",
  },
  {
    Icon: Leaf,
    title: "Energia limpa e sustentável",
    description: "Produza sua própria energia e contribua com o planeta.",
  },
];

const NARROW_WIDTH = 76;
const EXPANDED_WIDTH = 560;
// Com múltiplos painéis, os inativos ficam estreitos; com um único, ele preenche
// a coluna (o efeito de expansão é ignorado — ver guards nos effects abaixo).
const restWidth = NARROW_WIDTH;

function SimularCTA() {
  return (
    <div className="flex flex-col gap-3">
      <a
        href="#economia"
        className="group flex items-center gap-4 w-full rounded-full bg-gradient-to-r from-brand-2 to-brand px-4 py-3.5 text-white shadow-[0_20px_50px_-12px_rgba(59,130,246,0.55)] hover:shadow-[0_24px_60px_-10px_rgba(59,130,246,0.65)] transition-all duration-300 hover:-translate-y-0.5"
      >
        <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-white shrink-0">
          <Calculator className="w-6 h-6 text-brand-2" strokeWidth={2} />
        </span>
        <span className="flex-1 min-w-0 text-left">
          <span className="block font-display font-bold uppercase tracking-wide text-sm sm:text-base leading-tight">
            Simular minha economia
          </span>
          <span className="block text-xs sm:text-sm text-white/85 leading-snug mt-0.5 text-pretty">
            Descubra quanto você pode economizar
          </span>
        </span>
        <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">
          <ArrowRight className="w-5 h-5" />
        </span>
      </a>
      <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground text-center text-pretty">
        <ShieldCheck className="w-3.5 h-3.5 text-brand-2 shrink-0" strokeWidth={2} />
        Projeto personalizado • Sem compromisso • 100% online e gratuito
      </p>
    </div>
  );
}

function Panel({
  benefit,
  isActive,
  onActivate,
  panelRef,
}: {
  benefit: Benefit;
  isActive: boolean;
  onActivate: () => void;
  panelRef: (el: HTMLButtonElement | null) => void;
}) {
  const { image, title, description } = benefit;
  const [isMobileInView, setIsMobileInView] = useState(false);
  const elRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add("(max-width: 1023px)", () => {
      const observer = new IntersectionObserver(
        ([entry]) => setIsMobileInView(entry.isIntersecting),
        { threshold: 0.55 }
      );
      observer.observe(el);
      return () => {
        observer.disconnect();
        setIsMobileInView(false);
      };
    });

    return () => mm.revert();
  }, []);

  const showContent = isActive || isMobileInView;

  return (
    <button
      ref={(el) => {
        elRef.current = el;
        panelRef(el);
      }}
      type="button"
      onClick={onActivate}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      aria-expanded={showContent}
      aria-label={title}
      className="
        group relative overflow-hidden text-left rounded-2xl border border-border shrink-0
        h-96 sm:h-[28rem] lg:h-full w-full
        transition-[height] duration-500
      "
    >
      <Image
        src={image}
        alt={title}
        fill
        className={`object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${showContent ? "scale-100" : "scale-110"}`}
      />
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${showContent ? "bg-[#0E2C6B]/10" : "bg-[#0E2C6B]/55"}`}
      />
      <div
        className={`absolute inset-0 bg-gradient-to-t from-[#0E2C6B]/85 via-[#0E2C6B]/10 to-transparent transition-opacity duration-500 ${showContent ? "opacity-100" : "opacity-0"}`}
      />

      {/* Collapsed-rail vertical label — desktop only, mobile never has a narrow collapsed state */}
      <span
        className={`
          hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          text-white font-display font-semibold text-sm tracking-tight whitespace-nowrap
          transition-opacity duration-300
          ${isActive ? "opacity-0 duration-100" : "opacity-100 rotate-180 delay-500"}
        `}
        style={{ writingMode: "vertical-rl" }}
      >
        {title}
      </span>

      <div className="absolute left-5 right-5 bottom-5 lg:left-6 lg:right-6 lg:bottom-16 z-10">
        {/* Mobile: title always visible, independent of scroll-driven reveal. Desktop: title lives in the animated block below instead. */}
        <h3 className="lg:hidden font-display font-semibold tracking-tight text-white text-base text-pretty">
          {title}
        </h3>

        <div
          className={`
            transition-all duration-500
            ${showContent ? "opacity-100 translate-y-0 delay-300" : "opacity-0 translate-y-2 pointer-events-none delay-0"}
          `}
        >
          <h3 className="hidden lg:block font-display font-semibold tracking-tight text-white text-2xl mb-2 text-pretty">
            {title}
          </h3>
          <p className="text-white/80 leading-relaxed text-pretty max-w-md text-xs lg:text-base line-clamp-2 lg:line-clamp-none mt-1 lg:mt-0">
            {description}
          </p>
        </div>
      </div>
    </button>
  );
}

export default function Benefits() {
  const { ref, isVisible } = useScrollAnimation();
  const [activeIndex, setActiveIndex] = useState(0);
  const panelsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const isDesktopRef = useRef(false);

  useEffect(() => {
    if (benefits.length < 2) return; // imagem única preenche a coluna via CSS
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      isDesktopRef.current = true;
      panelsRef.current.forEach((panel, i) => {
        if (!panel) return;
        gsap.set(panel, { width: i === activeIndex ? EXPANDED_WIDTH : restWidth });
      });

      return () => {
        isDesktopRef.current = false;
        panelsRef.current.forEach((panel) => {
          if (!panel) return;
          gsap.set(panel, { clearProps: "width" });
        });
      };
    });

    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (benefits.length < 2 || !isDesktopRef.current) return;
    panelsRef.current.forEach((panel, i) => {
      if (!panel) return;
      gsap.to(panel, {
        width: i === activeIndex ? EXPANDED_WIDTH : restWidth,
        duration: 0.65,
        ease: "power3.inOut",
      });
    });
  }, [activeIndex]);

  return (
    <section className="section-py bg-background">
      <div ref={ref} className={`px-5 sm:px-6 lg:px-8 scroll-animate ${isVisible ? "visible" : ""}`}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[44%_56%] gap-8 lg:gap-8 items-stretch">
          {/* Título + descrição */}
          <div className="min-w-0 lg:col-start-1 lg:row-start-1">
            <h2 className="font-display font-bold tracking-tight text-pretty text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[1.02]">
              Transforme sua conta de luz em <span className="text-brand">patrimônio.</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mt-5">
              Valorize seu imóvel e tenha independência energética por décadas.
            </p>
          </div>

          {/* Imagem — mobile: entre a descrição e os ícones; desktop: coluna direita ocupando as duas linhas */}
          <div className="relative flex lg:justify-end min-w-0 h-full lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:min-h-[430px]">
            <div className="flex flex-col lg:flex-row items-stretch w-full gap-3 lg:gap-[14px] h-full">
              {benefits.map((benefit, i) => (
                <Panel
                  key={benefit.title}
                  benefit={benefit}
                  isActive={i === activeIndex}
                  onActivate={() => setActiveIndex(i)}
                  panelRef={(el) => {
                    panelsRef.current[i] = el;
                  }}
                />
              ))}
            </div>

            {/* Card flutuante ("voando") no canto inferior direito, saindo ~40% pra baixo */}
            <div className="hidden lg:block pointer-events-none absolute -bottom-14 -right-10 z-20 w-48 rounded-2xl bg-gradient-to-br from-brand to-brand-2 p-5 text-white shadow-2xl shadow-brand/40 ring-1 ring-white/15 animate-float motion-reduce:animate-none">
              <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/15 mb-3">
                <TrendingUp className="w-6 h-6 text-white" strokeWidth={2} />
              </span>
              <p className="text-sm font-medium leading-snug text-pretty">
                Investimento que se paga e continua gerando benefícios por mais de 25 anos.
              </p>
            </div>
          </div>

          {/* Ícones (mini-features) + CTA desktop */}
          <div className="min-w-0 lg:col-start-1 lg:row-start-2">
            {/* Rotativo — mobile only, no lugar dos 3 mini-cards */}
            <RotatingBadge
              items={miniFeatures.map(({ Icon, title }) => ({ Icon, title }))}
              className="lg:hidden flex justify-center"
              badgeClassName="bg-brand-muted"
              iconClassName="text-brand-2"
              textClassName="text-foreground"
            />

            {/* Mini feature cards — desktop only */}
            <div className="hidden lg:grid grid-cols-3 divide-x divide-border">
              {miniFeatures.map(({ Icon, title, description }) => (
                <div key={title} className="flex flex-col items-center text-center gap-1.5 px-2 sm:px-3 py-2">
                  <div className="w-12 h-12 rounded-full bg-brand-muted flex items-center justify-center mb-2 shrink-0">
                    <Icon className="w-5 h-5 text-brand-2" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-display font-semibold text-sm text-foreground leading-snug text-pretty">{title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed text-pretty">{description}</p>
                </div>
              ))}
            </div>

            {/* CTA — desktop only (mobile version fica abaixo do grid) */}
            <div className="hidden lg:block max-w-[30rem] mt-6">
              <SimularCTA />
            </div>
          </div>
        </div>

        {/* CTA — mobile only, abaixo dos cards de imagem */}
        <div className="lg:hidden mt-8 max-w-md mx-auto">
          <SimularCTA />
        </div>

      </div>
    </section>
  );
}
```
