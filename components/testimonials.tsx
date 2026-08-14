"use client";

import Image from "next/image";
import { Star, BadgeCheck, ArrowUpRight } from "lucide-react";

function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-label="Google">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

interface Testimonial {
  name: string;
  city: string;
  initials: string;
  photo?: string;
  quote: string;
  highlight: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Mi Devecchi",
    city: "São Paulo, SP",
    initials: "MD",
    photo: "/images/d1.png",
    quote: "Empresa super séria e responsável, entrega rápida e o melhor: as condições de pagamento e qualidade. A economia que estou tendo é incrível, só gratidão. Super recomendo.",
    highlight: "Economia incrível",
  },
  {
    name: "Emerson Andreazi Moreira",
    city: "São Paulo, SP",
    initials: "EM",
    photo: "/images/d2.png",
    quote: "Muito profissional em todos os detalhes. Instalação realizada dentro do prazo, equipe organizada e um ótimo custo-benefício. Saí satisfeito em cada etapa do processo.",
    highlight: "Instalação no prazo",
  },
  {
    name: "Bruno Meftefundes",
    city: "São Paulo, SP",
    initials: "BM",
    photo: "/images/d3.jpg",
    quote: "Atendimento excelente desde o primeiro contato. O serviço foi executado com qualidade, organização e atenção aos detalhes. Fiquei muito satisfeito com o resultado final. Recomendo a todos!",
    highlight: "Resultado excelente",
  },
];

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="group relative flex flex-col min-w-0 shrink-0 w-[82%] snap-start md:w-auto rounded-2xl bg-card border border-border p-7 sm:p-8 lg:p-9 card-hover card-shadow-sm shadow-[0_18px_42px_-18px_rgba(14,44,107,0.28)]">
      {/* Stars + Google badge */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-accent text-accent" />
          ))}
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <GoogleLogo className="w-4 h-4" />
          <span className="text-xs font-medium">Google</span>
        </div>
      </div>

      <blockquote className="font-display text-lg sm:text-xl leading-snug tracking-tight text-foreground flex-1 text-pretty">
        {t.quote}
      </blockquote>

      {/* Highlight chip */}
      <span className="mt-7 inline-flex w-fit items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-brand-muted text-brand-2">
        <BadgeCheck className="w-3.5 h-3.5" strokeWidth={2.2} />
        {t.highlight}
      </span>

      <figcaption className="mt-6 pt-6 border-t border-border flex items-center gap-4">
        <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 bg-brand text-brand-foreground flex items-center justify-center font-semibold text-sm">
          {t.photo ? (
            <Image src={t.photo} alt={t.name} width={44} height={44} className="object-cover w-full h-full" />
          ) : (
            t.initials
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm text-foreground flex items-center gap-1.5 flex-wrap">
            <span className="truncate">{t.name}</span>
            <BadgeCheck className="w-4 h-4 text-brand-2 flex-shrink-0" strokeWidth={2.2} aria-label="Cliente verificado" />
          </p>
          <p className="text-xs text-muted-foreground">{t.city}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="section-py bg-white">
      <div ref={ref} className={`px-5 sm:px-6 lg:px-8 scroll-animate ${isVisible ? "visible" : ""}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 items-end mb-16 lg:mb-20">
            <div className="lg:col-span-8">
              <h2 className="font-display font-semibold tracking-tight text-pretty text-3xl sm:text-4xl lg:text-5xl text-foreground max-w-2xl">
                Histórias de quem já trocou a conta de luz por patrimônio.
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="text-muted-foreground leading-relaxed mb-3">
                Mais de 1.200 famílias e empresas confiam na engenharia da Allure para gerar a própria energia.
              </p>
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <GoogleLogo className="w-5 h-5 flex-shrink-0" />
                <span className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
                  ))}
                </span>
                5,0 no Google
              </div>
            </div>
          </div>

          {/* Mobile: carrossel horizontal (scroll-snap); md+: grid de 3 */}
          <div className={`flex md:grid md:grid-cols-3 gap-4 lg:gap-7 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none no-scrollbar -mr-5 pr-5 md:mx-0 md:px-0 pb-4 md:pb-0 stagger-children ${isVisible ? "visible" : ""}`}>
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </div>
          {/* Dica de arrastar — mobile */}
          <p className="md:hidden mt-4 text-center text-xs text-muted-foreground">Arraste para ver mais →</p>

          {/* Quiet link — primary conversion stays with hero + final CTA */}
          <div className="mt-14 flex justify-center">
            <a
              href="#contato"
              className="inline-flex items-center gap-2 justify-center rounded-full bg-brand px-8 py-4 sm:px-9 sm:py-5 font-semibold text-brand-foreground hover:bg-brand-2 transition-all duration-300 hover:-translate-y-0.5 shadow-[0_20px_50px_-12px_rgba(59,130,246,0.45)] hover:shadow-[0_24px_60px_-10px_rgba(59,130,246,0.55)]"
            >
              Quero economizar também
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
