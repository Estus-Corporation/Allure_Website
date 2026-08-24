"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";

interface Project {
  src: string;
  alt: string;
}

const projects: Project[] = [
  { src: "/images/ii1.png", alt: "Instalação de painéis solares comercial" },
  { src: "/images/i2.png", alt: "Instalação de painéis solares residencial" },
  { src: "/images/i3.png", alt: "Instalação de painéis solares comercial" },
  { src: "/images/i4.png", alt: "Instalação de painéis solares residencial" },
];

// Renderizado 2x: com só 4 fotos reais e ~3 visíveis por vez no desktop, o embla
// não tem slides suficientes pra centralizar corretamente em loop mode (o slide
// ativo ficava colado na esquerda em vez de centralizado). Duplicar dá buffer
// suficiente pro loop sem precisar aumentar o tamanho dos cards.
const slides: Project[] = [...projects, ...projects];

export default function ProjectsCarousel() {
  const { ref, isVisible } = useScrollAnimation();
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!api) return;
    setActiveIndex(api.selectedScrollSnap());
    api.on("select", () => setActiveIndex(api.selectedScrollSnap()));
  }, [api]);

  return (
    <section className="relative section-py bg-muted bg-dots overflow-hidden">
      {/* Planta técnica — grid de "papel milimetrado" + anotações de projeto (círculos
          tracejados, mira, linha de cota), como um desenho de engenharia marcando os
          telhados do carrossel. Só desktop. */}
      <div className="hidden lg:block pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {/* Grid fininho, esmaece de cima pra baixo */}
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "linear-gradient(rgba(37,99,235,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.07) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "linear-gradient(to bottom, black 0%, transparent 65%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 65%)",
          }}
        />

        {/* Círculo tracejado grande, tipo raio de medição em torno do card central */}
        <div className="absolute left-1/2 top-[19rem] -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] rounded-full border border-dashed border-brand-2/25" />

        {/* Mira no canto superior esquerdo */}
        <div className="absolute left-[8%] top-16 w-16 h-16 opacity-40">
          <div className="absolute inset-y-0 left-1/2 w-px bg-brand-2/50" />
          <div className="absolute inset-x-0 top-1/2 h-px bg-brand-2/50" />
          <div className="absolute inset-2 rounded-full border border-brand-2/40" />
        </div>

        {/* Linha de cota no canto superior direito, com pingente na ponta */}
        <div className="absolute right-[10%] top-24 flex items-center gap-2 opacity-45">
          <span className="w-20 h-px bg-brand-3" />
          <span className="w-2 h-2 rounded-full bg-brand-3" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div
          ref={ref}
          className={`px-5 sm:px-6 lg:px-8 text-center max-w-2xl mx-auto mb-8 lg:mb-10 scroll-animate ${isVisible ? "visible" : ""}`}
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-brand-2 mb-3">
            Nossas parcerias
          </span>
          <h2 className="font-display font-bold tracking-tight text-3xl sm:text-4xl lg:text-5xl text-foreground text-pretty">
            Projetos que já entregamos
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed text-pretty">
            Uma amostra das instalações realizadas em parceria com quem confiou na Allure.
          </p>
        </div>

        {/* Carrossel "coverflow": o card central fica maior, os vizinhos menores/apagados.
            loop + align center deixam arrastar pra qualquer lado sem fim, sempre recentralizando. */}
        <div className="relative">
          <Carousel setApi={setApi} opts={{ align: "center", loop: true }}>
            <CarouselContent className="-ml-3 sm:-ml-4 py-8 sm:py-10 lg:py-12">
              {slides.map((p, i) => (
                <CarouselItem key={i} className="pl-3 sm:pl-4 basis-[64%] sm:basis-[42%] lg:basis-[31%]">
                  <div
                    className={`relative mx-auto aspect-[9/16] lg:aspect-[3/4] w-[92%] rounded-2xl overflow-hidden border border-border bg-card card-shadow-sm transition-all duration-500 ease-out ${
                      i === activeIndex ? "scale-110 opacity-100 z-10" : "scale-90 opacity-45"
                    }`}
                  >
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      sizes="(max-width: 640px) 65vw, (max-width: 1024px) 42vw, 31vw"
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Setas de navegação */}
          <button
            type="button"
            onClick={() => api?.scrollPrev()}
            aria-label="Projeto anterior"
            className="absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur border border-border text-foreground shadow-md hover:bg-white hover:scale-105 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => api?.scrollNext()}
            aria-label="Próximo projeto"
            className="absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur border border-border text-foreground shadow-md hover:bg-white hover:scale-105 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Indicadores */}
        <div className="mt-2 flex items-center justify-center gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => api?.scrollTo(i)}
              aria-label={`Ir para o projeto ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex % projects.length ? "w-6 bg-brand" : "w-1.5 bg-border hover:bg-brand/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
