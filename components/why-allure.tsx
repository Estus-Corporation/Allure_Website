"use client";

import { useRef, useLayoutEffect } from "react";
import { ShieldCheck, Zap, Headphones, Award, Wrench, Users, ArrowUpRight, Flame, Send } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

const differentials = [
  {
    Icon: Zap,
    stat: "10",
    unit: "dias",
    title: "Entrega dos painéis",
    description: "Seus painéis entregues em até 10 dias — com equipe própria, sem terceiros e sem atrasos.",
    featured: true,
  },
  {
    Icon: ShieldCheck,
    stat: "25",
    unit: "anos",
    title: "Garantia total",
    description: "25 anos nos painéis e 10 anos na mão de obra. Seu investimento protegido por décadas.",
    featured: false,
  },
  {
    Icon: Headphones,
    stat: "24/7",
    unit: "",
    title: "Suporte permanente",
    description: "Monitoramento remoto e suporte técnico disponível a qualquer hora, todos os dias do ano.",
    featured: false,
  },
  {
    Icon: Users,
    stat: "+1.200",
    unit: "",
    title: "Projetos entregues",
    description: "Mais de mil famílias e empresas já geram a própria energia com a engenharia da Allure.",
    featured: false,
  },
  {
    Icon: Award,
    stat: "98%",
    unit: "",
    title: "Eficiência dos painéis",
    description: "Equipamentos Tier-1 certificados com a maior taxa de conversão de energia do mercado.",
    featured: false,
  },
  {
    Icon: Wrench,
    stat: "100%",
    unit: "",
    title: "Equipe própria",
    description: "Nenhum serviço terceirizado. Da venda à manutenção, tudo é responsabilidade da Allure.",
    featured: false,
  },
];

export default function WhyAllure() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const pathTrackRef = useRef<SVGPathElement>(null);
  const pathFillRef = useRef<SVGPathElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    const wrap = timelineRef.current;
    const track = pathTrackRef.current;
    const fill = pathFillRef.current;
    const plane = planeRef.current;
    if (!wrap || !track || !fill || !plane) return;

    // Straight vertical path sized to the timeline's rendered height; re-measured
    // before every ScrollTrigger refresh (resize, font load, etc.).
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
            // Reduced motion: line fully drawn, no plane, opacity-only card fade.
            gsap.set(fill, { strokeDashoffset: 0 });
            gsap.set(plane, { autoAlpha: 0 });
            gsap.utils.toArray<HTMLElement>(".roadmap-item").forEach((item) => {
              gsap.fromTo(
                item,
                { opacity: 0 },
                {
                  opacity: 1,
                  duration: 0.6,
                  ease: "power1.out",
                  scrollTrigger: { trigger: item, start: "top 85%", toggleActions: "play none none reverse" },
                }
              );
            });
            return;
          }

          // Line draw + plane flight share one scrubbed timeline, so the tip of
          // the drawn line and the plane always ride the same 70%-viewport mark.
          // The fill path has pathLength=1, so dashoffset 1→0 draws it end to end.
          gsap.set(plane, { autoAlpha: 1 });
          const iconEl = plane.querySelector("svg");
          if (iconEl) gsap.set(iconEl, { rotation: 135 });

          gsap
            .timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: wrap,
                start: "top 70%",
                end: "bottom 70%",
                scrub: true,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                  if (iconEl) {
                    gsap.set(iconEl, { rotation: self.direction === -1 ? -45 : 135 });
                  }
                },
              },
            })
            .fromTo(fill, { strokeDashoffset: 1 }, { strokeDashoffset: 0 }, 0)
            .to(
              plane,
              {
                motionPath: {
                  path: track,
                  align: track,
                  alignOrigin: [0.5, 0.5],
                  autoRotate: false,
                },
              },
              0
            );

          // Cards pop exactly when the plane passes them: each item's center
          // crosses the same 70%-viewport line the plane rides on.
          gsap.utils.toArray<HTMLElement>(".roadmap-item").forEach((item, i) => {
            const card = item.querySelector<HTMLElement>(".roadmap-card");
            const node = item.querySelector<HTMLElement>(".roadmap-node");
            if (!card || !node) return;

            const tilt = i % 2 === 1 ? 1.5 : -1.5;
            gsap.set(card, {
              opacity: 0,
              scale: 0.8,
              rotate: tilt * 2,
              willChange: "transform, opacity",
            });
            gsap.set(node, { scale: 0, opacity: 0 });

            gsap
              .timeline({
                scrollTrigger: { trigger: item, start: "center 70%", toggleActions: "play none none reverse" },
                defaults: { ease: "power3.out" },
              })
              .to(node, { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(1.7)" }, 0)
              // drop-shadow (not box-shadow) so Tailwind's ring utilities stay intact
              .to(node, { filter: "drop-shadow(0 0 12px rgba(59,130,246,0.4))", duration: 0.4, ease: "power2.out" }, "<0.2")
              .to(card, { opacity: 1, scale: 1.08, rotate: tilt, duration: 0.5 }, 0.05)
              .to(card, { scale: 1, rotate: 0, duration: 0.4, ease: "power2.out" }, ">")
              .set(card, { clearProps: "willChange" });
          });
        }
      );
    }, timelineRef);

    return () => {
      ScrollTrigger.removeEventListener("refreshInit", buildPath);
      ctx.revert();
    };
  }, []);

  return (
    <section id="por-que-allure" className="section-py bg-muted bg-dots lg:hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-8 items-end mb-10 lg:mb-12">
          <div className="lg:col-span-7">
            <h2 className="font-display font-semibold tracking-tight text-3xl sm:text-4xl lg:text-5xl text-foreground text-pretty">
              Números que provam o que a Allure entrega.
            </h2>
          </div>
          <p className="lg:col-span-5 text-muted-foreground leading-relaxed lg:pb-1">
            Não são promessas — são resultados. Cada número representa projetos reais, clientes satisfeitos e uma engenharia que não aceita mediocridade.
          </p>
        </div>

        {/* Roadmap timeline */}
        <div ref={timelineRef} className="relative mx-auto max-w-3xl mt-4">
          {/* SVG rail: gray track + brand fill (drawn via dashoffset). The plane
              rides the same path with MotionPathPlugin, scrubbed to scroll. */}
          <svg
            className="absolute left-5 lg:left-1/2 lg:-translate-x-1/2 top-0 h-full w-[2px] overflow-visible pointer-events-none"
            aria-hidden
          >
            <path
              ref={pathTrackRef}
              d="M 1 0 V 1"
              fill="none"
              strokeWidth={2}
              style={{ stroke: "var(--border)" }}
            />
            <path
              ref={pathFillRef}
              d="M 1 0 V 1"
              fill="none"
              strokeWidth={2}
              strokeLinecap="round"
              pathLength={1}
              style={{ stroke: "var(--brand)", strokeDasharray: 1, strokeDashoffset: 1 }}
            />
          </svg>

          {/* Plane that flies down the rail at the tip of the drawn line */}
          <div
            ref={planeRef}
            className="absolute top-0 left-0 z-20 w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center shadow-lg shadow-brand/40 opacity-0 will-change-transform"
            aria-hidden
          >
            <Send className="w-4 h-4" strokeWidth={2} />
          </div>

          <div className="flex flex-col gap-10 sm:gap-14">
            {differentials.map(({ Icon, stat, unit, title, description, featured }, i) => {
              const rightSide = i % 2 === 1;
              return (
                <div
                  key={title}
                  className={`roadmap-item relative grid grid-cols-[2.5rem_1fr] lg:grid-cols-2 items-center gap-x-4 lg:gap-x-12`}
                >
                  {/* Node / icon on the central line */}
                  <div className="lg:col-span-2 lg:row-start-1 lg:col-start-1 lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:top-1/2 lg:-translate-y-1/2 z-10 flex justify-center">
                    <div
                      className={`roadmap-node w-12 h-12 rounded-full flex items-center justify-center border-4 border-muted ${
                        featured ? "bg-brand shadow-lg shadow-brand/30" : "bg-white ring-1 ring-border"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${featured ? "text-white" : "text-brand-2"}`}
                        strokeWidth={1.8}
                      />
                    </div>
                  </div>

                  {/* Content card */}
                  <div
                    className={`lg:row-start-1 ${
                      rightSide ? "lg:col-start-2 lg:pl-8" : "lg:col-start-1 lg:pr-8 lg:text-right"
                    }`}
                  >
                    <div
                      className={`roadmap-card relative rounded-2xl border p-6 ${
                        featured
                          ? "bg-brand border-brand text-white shadow-xl shadow-brand/20"
                          : "bg-white border-border shadow-[0_8px_20px_-8px_rgba(14,44,107,0.28)]"
                      }`}
                    >
                      {featured && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-white mb-3">
                          <Flame className="w-3 h-3" strokeWidth={2} />
                          Destaque
                        </span>
                      )}

                      {/* Stat */}
                      <div
                        className={`flex flex-wrap items-baseline gap-1.5 mb-2 ${
                          rightSide ? "" : "lg:justify-end"
                        }`}
                      >
                        <span
                          className={`font-display font-bold tracking-tight leading-none text-4xl sm:text-5xl ${
                            featured ? "text-white" : "text-brand"
                          }`}
                        >
                          {stat}
                        </span>
                        {unit && (
                          <span
                            className={`font-display font-semibold text-base sm:text-xl ${
                              featured ? "text-white/70" : "text-brand/60"
                            }`}
                          >
                            {unit}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3
                        className={`font-display font-semibold text-lg tracking-tight mb-1.5 text-pretty ${
                          featured ? "text-white" : "text-foreground"
                        }`}
                      >
                        {title}
                      </h3>

                      {/* Description */}
                      <p
                        className={`text-sm leading-relaxed text-pretty ${
                          featured ? "text-white/70" : "text-muted-foreground"
                        }`}
                      >
                        {description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quiet link — primary conversion stays with hero + final CTA */}
        <div className="mt-14 flex justify-center">
          <a
            href="#contato"
            className="inline-flex items-center gap-2 justify-center rounded-full bg-brand px-8 py-4 sm:px-9 sm:py-5 font-semibold text-brand-foreground hover:bg-brand-2 transition-all duration-300 hover:-translate-y-0.5 shadow-[0_20px_50px_-12px_rgba(59,130,246,0.45)] hover:shadow-[0_24px_60px_-10px_rgba(59,130,246,0.55)]"
          >
            Falar com um especialista
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
