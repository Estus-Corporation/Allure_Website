"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { Sun, Cpu, TrendingDown, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const steps = [
  {
    num: 1,
    Icon: Sun,
    title: "Captação inteligente",
    description: "Painéis de alta eficiência convertem a luz do sol em energia limpa, dimensionados com precisão para o seu consumo real.",
    highlight: "98%",
    highlightLabel: "eficiência dos painéis",
  },
  {
    num: 2,
    Icon: Cpu,
    title: "Conversão e gestão",
    description: "Inversores premium transformam e otimizam a energia gerada, com monitoramento em tempo real direto no seu celular.",
    highlight: "24/7",
    highlightLabel: "monitoramento ativo",
  },
  {
    num: 3,
    Icon: TrendingDown,
    title: "Economia acumulada",
    description: "O excedente vira créditos na rede e abate sua conta. Retorno do investimento, em média, entre 3 e 5 anos.",
    highlight: "3–5 anos",
    highlightLabel: "retorno do investimento",
  },
];

export default function HowItWorks() {
  const { ref, isVisible } = useScrollAnimation();
  const mobileTimelineRef = useRef<HTMLDivElement>(null);
  const pathTrackRef = useRef<SVGPathElement>(null);
  const pathFillRef = useRef<SVGPathElement>(null);

  // Mobile-only scroll timeline: a single line draws itself down the rail as the
  // section scrolls, each step's icon node pops and its text fades in right behind
  // the tip of the line. No bounding cards — content floats directly on the backdrop.
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const wrap = mobileTimelineRef.current;
    const track = pathTrackRef.current;
    const fill = pathFillRef.current;
    if (!wrap || !track || !fill) return;

    const buildPath = () => {
      const d = `M 1 0 V ${wrap.offsetHeight}`;
      track.setAttribute("d", d);
      fill.setAttribute("d", d);
    };
    buildPath();
    ScrollTrigger.addEventListener("refreshInit", buildPath);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduce } = context.conditions as { reduce: boolean };

          if (reduce) {
            gsap.set(fill, { strokeDashoffset: 0 });
            gsap.utils.toArray<HTMLElement>(".how-step-mobile").forEach((item) => {
              gsap.fromTo(
                item,
                { opacity: 0 },
                {
                  opacity: 1,
                  duration: 0.6,
                  ease: "power1.out",
                  scrollTrigger: { trigger: item, start: "top 85%", once: true },
                }
              );
            });
            return;
          }

          gsap
            .timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: wrap,
                start: "top 75%",
                end: "bottom 75%",
                scrub: true,
                invalidateOnRefresh: true,
              },
            })
            .fromTo(fill, { strokeDashoffset: 1 }, { strokeDashoffset: 0 });

          gsap.utils.toArray<HTMLElement>(".how-step-mobile").forEach((item) => {
            const node = item.querySelector<HTMLElement>(".how-step-node");
            const body = item.querySelector<HTMLElement>(".how-step-body");
            if (!node || !body) return;

            gsap.set(node, { scale: 0, opacity: 0 });
            gsap.set(body, { opacity: 0, y: 16 });

            gsap
              .timeline({
                scrollTrigger: { trigger: item, start: "top 78%", once: true },
                defaults: { ease: "power3.out" },
              })
              .to(node, { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(1.7)" }, 0)
              .to(node, { filter: "drop-shadow(0 0 10px rgba(91,184,245,0.5))", duration: 0.4 }, "<0.1")
              .to(body, { opacity: 1, y: 0, duration: 0.5 }, 0.1);
          });
        }
      );
    }, mobileTimelineRef);

    return () => {
      ScrollTrigger.removeEventListener("refreshInit", buildPath);
      ctx.revert();
    };
  }, []);

  return (
    <section id="como-funciona" className="relative py-10 lg:py-12 bg-[#071626] overflow-hidden">

      {/* Imagem de fundo — cobre a section inteira, dimmed/blurred pra ler como backdrop ambiente. */}
      <div className="pointer-events-none absolute inset-0 select-none opacity-30 blur-[2px]">
        <Image
          src="/images/ceu.png"
          alt=""
          fill
          quality={95}
          className="object-cover"
        />
      </div>

      {/* Scrim — keeps panels recognizable at the edges, fully clears the copy zone for AA contrast.
          Mobile gets a vertical fade (holds up on narrow/tall viewports); md+ switches to the
          wide radial shape tuned for the desktop aspect ratio. */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] md:hidden"
        style={{
          background:
            "linear-gradient(to bottom, rgba(7,22,38,0.42) 0%, rgba(7,22,38,0.92) 30%, rgba(7,22,38,0.92) 70%, rgba(7,22,38,0.42) 100%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] hidden md:block"
        style={{
          background:
            "radial-gradient(ellipse 70% 65% at 50% 42%, rgba(7,22,38,0.9) 0%, rgba(7,22,38,0.72) 45%, rgba(7,22,38,0.45) 72%, rgba(7,22,38,0.22) 100%)",
        }}
        aria-hidden
      />

      <div
        ref={ref}
        className={`relative z-10 max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 scroll-animate ${isVisible ? "visible" : ""}`}
      >
        {/* Header */}
        <div className="text-center mb-8 lg:mb-10">
          <h2 className="font-display font-semibold tracking-tight text-3xl sm:text-4xl lg:text-5xl text-white">
            Da luz do sol à economia,<br className="hidden sm:block" /> em três etapas.
          </h2>
          <p className="mt-4 text-white/55 max-w-md mx-auto leading-relaxed">
            Engenharia transparente, do projeto à geração — sem complicações técnicas para você.
          </p>
        </div>

        {/* Mobile: scroll-drawn vertical timeline. No cards — icon nodes ride a line that
            fills in as the section scrolls, text floats directly on the backdrop. */}
        <div ref={mobileTimelineRef} className="md:hidden relative">
          <svg className="absolute left-5 top-0 h-full w-[2px] overflow-visible pointer-events-none" aria-hidden>
            <path ref={pathTrackRef} d="M 1 0 V 1" fill="none" strokeWidth={2} style={{ stroke: "rgba(255,255,255,0.15)" }} />
            <path
              ref={pathFillRef}
              d="M 1 0 V 1"
              fill="none"
              strokeWidth={2}
              strokeLinecap="round"
              pathLength={1}
              style={{ stroke: "var(--brand-3)", strokeDasharray: 1, strokeDashoffset: 1 }}
            />
          </svg>

          <div className="flex flex-col gap-10">
            {steps.map(({ num, Icon, title, description, highlight, highlightLabel }) => (
              <div key={num} className="how-step-mobile grid grid-cols-[2.5rem_1fr] gap-x-4">
                <div className="how-step-node relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-4 border-[#071626] bg-[#0c2036] ring-1 ring-white/15">
                  <Icon className="w-5 h-5 text-brand-3" strokeWidth={1.75} />
                </div>

                <div className="how-step-body pt-1">
                  <span className="block text-[0.65rem] font-semibold uppercase tracking-wider text-brand-3 mb-2">
                    Etapa {String(num).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-white mb-2 text-pretty leading-snug">
                    {title}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed mb-3 text-pretty">
                    {description}
                  </p>
                  <p className="text-sm">
                    <span className="font-display font-bold text-white">{highlight}</span>
                    <span className="text-white/45"> — {highlightLabel}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: editorial numeral rail — each column centered so it lines up
            with the centered header above instead of hugging the left edge. */}
        <div className={`hidden md:block stagger-children ${isVisible ? "visible" : ""}`}>
          <div className="grid md:grid-cols-3 gap-10 lg:gap-14">
            {steps.map(({ num, Icon, title, description, highlight, highlightLabel }) => (
              <div key={num} className="flex flex-col items-center text-center min-w-0 h-full">
                <div className="relative flex flex-1 flex-col items-center text-center w-full rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm px-6 py-5 lg:px-8 lg:py-6 transition-all duration-300 hover:bg-white/[0.06] hover:border-white/20 hover:-translate-y-1">
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-brand-3" strokeWidth={1.5} />
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-brand-3 text-[#071626] text-[0.65rem] font-bold flex items-center justify-center">
                      {num}
                    </span>
                  </div>

                  <h3 className="font-display text-lg sm:text-xl font-semibold tracking-tight text-white mb-2 text-pretty leading-snug">
                    {title}
                  </h3>

                  <p className="text-white/55 text-sm leading-relaxed text-pretty max-w-xs">
                    {description}
                  </p>
                </div>

                <p className="mt-4 text-sm">
                  <span className="font-display font-bold text-white">{highlight}</span>
                  <span className="text-white/45"> — {highlightLabel}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quiet link — primary conversion stays with hero + final CTA */}
        <div className="mt-8 lg:mt-10 flex justify-center">
          <a
            href="#contato"
            className="inline-flex items-center gap-2 justify-center rounded-full bg-white px-8 py-4 sm:px-9 sm:py-5 font-semibold text-[#071626] hover:bg-white/90 transition-all duration-300 hover:-translate-y-0.5 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.4)] hover:shadow-[0_24px_60px_-10px_rgba(0,0,0,0.5)]"
          >
            Ver simulação de economia
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
