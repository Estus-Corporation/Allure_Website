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

// Placeholder — trocar pelas fotos reais 9:16 dos projetos/parcerias quando disponíveis.
const projects: Project[] = [
  { src: "/images/img-test.png", alt: "Projeto de energia solar Allure" },
  { src: "/images/img-test.png", alt: "Projeto de energia solar Allure" },
  { src: "/images/img-test.png", alt: "Projeto de energia solar Allure" },
  { src: "/images/img-test.png", alt: "Projeto de energia solar Allure" },
  { src: "/images/img-test.png", alt: "Projeto de energia solar Allure" },
  { src: "/images/img-test.png", alt: "Projeto de energia solar Allure" },
  { src: "/images/img-test.png", alt: "Projeto de energia solar Allure" },
];

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
    <section className="section-py bg-muted bg-dots overflow-hidden">
      <div className="max-w-7xl mx-auto">
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
              {projects.map((p, i) => (
                <CarouselItem key={i} className="pl-3 sm:pl-4 basis-[64%] sm:basis-[42%] lg:basis-[31%]">
                  <div
                    className={`relative mx-auto aspect-[9/16] w-[92%] rounded-2xl overflow-hidden border border-border bg-card card-shadow-sm transition-all duration-500 ease-out ${
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
                i === activeIndex ? "w-6 bg-brand" : "w-1.5 bg-border hover:bg-brand/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
