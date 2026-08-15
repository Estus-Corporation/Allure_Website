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
    image: "/images/lulu-1.png",
    imageAlt: "Painel solar captando energia do sol",
    title: "Captação inteligente",
    description: "Painéis de alta eficiência convertem a luz do sol em energia limpa para sua casa.",
  },
  {
    num: 2,
    Icon: Cpu,
    image: "/images/lulu-2.png",
    imageAlt: "Inversor convertendo e gerenciando a energia gerada",
    title: "Conversão e gestão",
    description: "Inversores premium otimizam a energia gerada, com monitoramento em tempo real.",
  },
  {
    num: 3,
    Icon: TrendingDown,
    image: "/images/lulu-3.png",
    imageAlt: "Residência economizando com energia solar",
    title: "Economia acumulada",
    description: "O excedente vira créditos na rede e reduz sua conta de luz.",
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
    <section id="como-funciona" className="relative py-10 lg:py-12 bg-gradient-to-b from-[#050e1a] via-[#071626] to-[#0a2036] overflow-hidden">

      {/* Textura — grid de pontos que esmaece no centro (onde fica o texto), pra dar
          profundidade sem brigar com o conteúdo */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(91,184,245,0.22) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 65% 55% at 50% 38%, transparent 0%, black 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 65% 55% at 50% 38%, transparent 0%, black 75%)",
        }}
        aria-hidden
      />

      {/* Glows ambiente — dão profundidade e um leve calor de cor nos cantos */}
      <div className="pointer-events-none absolute -top-32 -left-24 w-[34rem] h-[34rem] rounded-full bg-brand-3/15 blur-[140px] animate-float motion-reduce:animate-none" aria-hidden />
      <div className="pointer-events-none absolute -bottom-40 -right-24 w-[38rem] h-[30rem] rounded-full bg-brand/20 blur-[140px] animate-float motion-reduce:animate-none [animation-delay:2.5s]" aria-hidden />
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[50rem] h-[20rem] rounded-full bg-brand-2/10 blur-[160px]" aria-hidden />

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
            {steps.map(({ num, Icon, title, description }) => (
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
                  <p className="text-white/55 text-sm leading-relaxed text-pretty">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: ilustrações flutuantes conectadas por uma linha central, numeral
            grande ao lado do título — sem cards, o conteúdo respira sobre o fundo. */}
        <div className={`hidden md:block stagger-children ${isVisible ? "visible" : ""}`}>
          <div className="grid md:grid-cols-3 gap-10 lg:gap-14">
            {steps.map(({ num, image, imageAlt, title, description }, i) => (
              <div key={num} className="flex flex-col items-center text-center min-w-0">
                <div className="relative w-full max-w-[19rem] h-56 lg:h-64 mb-1">
                  <Image src={image} alt={imageAlt} fill className="object-contain" quality={95} />
                </div>

                {/* Linha conectando as 3 etapas, com nó luminoso em cada uma */}
                <div className="flex items-center w-full mb-6" aria-hidden>
                  <div className={`h-px flex-1 bg-gradient-to-r from-transparent to-brand-3/40 ${i === 0 ? "opacity-0" : ""}`} />
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-3 mx-2.5 shrink-0 shadow-[0_0_10px_2px_rgba(91,184,245,0.55)]" />
                  <div className={`h-px flex-1 bg-gradient-to-l from-transparent to-brand-3/40 ${i === 2 ? "opacity-0" : ""}`} />
                </div>

                <div className="flex items-start gap-3 text-left">
                  <span className="font-display text-3xl lg:text-4xl font-extrabold text-brand-3/50 leading-none shrink-0">
                    {String(num).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-lg lg:text-xl font-semibold tracking-tight text-white text-pretty leading-snug">
                      {title}
                    </h3>
                    <p className="mt-2 text-white/55 text-sm leading-relaxed text-pretty">
                      {description}
                    </p>
                  </div>
                </div>
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
