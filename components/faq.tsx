"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { ArrowUpRight, Headphones, Zap } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { faqItems } from "@/lib/site";

export default function FAQ() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative section-py bg-muted bg-dots overflow-hidden">
      {/* Glow ambiente — mesma linguagem do savings-calculator, dá profundidade ao fundo pontilhado */}
      <div className="pointer-events-none absolute -top-24 -left-32 w-[30rem] h-[30rem] rounded-full bg-brand/15 blur-[130px] animate-float motion-reduce:animate-none" aria-hidden />
      <div className="pointer-events-none absolute -bottom-24 -right-20 w-[26rem] h-[26rem] rounded-full bg-brand-3/20 blur-[130px] animate-float motion-reduce:animate-none [animation-delay:2.5s]" aria-hidden />

      <div
        ref={ref}
        className={`relative px-5 sm:px-6 lg:px-8 scroll-animate ${isVisible ? "visible" : ""}`}
      >
        <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div className="max-w-3xl mx-auto lg:mx-0 lg:max-w-none lg:order-2">
            {/* Header — centralizado, alinhado com os cards das perguntas */}
            <div className="text-center mb-8 lg:mb-12">
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-brand-2 mb-3">
                Suporte Allure
              </span>
              <h2 className="font-display font-semibold tracking-tight text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">
                Perguntas frequentes
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
                Ainda com dúvidas? Nossa equipe técnica responde em minutos pelo WhatsApp.
              </p>
            </div>

            {/* Accordion */}
            <Accordion type="single" collapsible className="w-full space-y-3 sm:space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="group bg-card rounded-2xl border border-border px-5 sm:px-7 transition-all duration-300 data-[state=open]:border-brand/30 data-[state=open]:shadow-xl data-[state=open]:shadow-brand/10"
                >
                  <AccordionTrigger className="text-left font-display text-foreground py-5 sm:py-6 text-base sm:text-lg font-medium hover:no-underline">
                    <span className="flex items-center gap-4">
                      <span className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-brand-muted text-brand-2 text-xs sm:text-sm font-bold shrink-0 transition-colors duration-300 group-data-[state=open]:bg-brand group-data-[state=open]:text-white">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="group-hover:text-brand-2 transition-colors">{item.question}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm sm:text-base leading-relaxed pb-5 sm:pb-6 pl-12 sm:pl-[3.25rem]">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-10 flex justify-center">
              <a
                href="#contato"
                className="inline-flex items-center gap-2 justify-center rounded-full bg-brand px-8 py-4 sm:px-9 sm:py-5 font-semibold text-brand-foreground hover:bg-brand-2 transition-all duration-300 hover:-translate-y-0.5 shadow-[0_20px_50px_-12px_rgba(59,130,246,0.45)] hover:shadow-[0_24px_60px_-10px_rgba(59,130,246,0.55)]"
              >
                Tirar minha dúvida
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Imagem + card de suporte — só no desktop, do lado esquerdo */}
          <div className="hidden lg:block relative mt-16 lg:mt-0 lg:order-1">
            <div className="relative w-full">
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-border shadow-[0_35px_80px_-24px_rgba(59,130,246,0.4)] ring-1 ring-white/40">
                <Image
                  src="/images/benefit-value.jpg"
                  alt="Residência com energia solar instalada pela Allure"
                  fill
                  quality={95}
                  sizes="(max-width: 1280px) 45vw, 600px"
                  className="object-cover"
                />

                {/* Selo estilo anúncio, no canto — ponto "ao vivo" com ping duplo */}
                <span className="absolute top-5 left-5 inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur px-3.5 py-1.5 text-xs font-semibold text-brand-2 shadow-md">
                  <span className="relative flex w-1.5 h-1.5">
                    <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 animate-ping opacity-75" />
                    <span className="relative w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </span>
                  Projeto real Allure
                </span>

                {/* Scrim + headline sobreposta, tipo peça publicitária — fica acima da faixa onde
                    o card de suporte abaixo sobrepõe a imagem (-mt-8), pra não cortar o texto. */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                <div className="absolute bottom-16 left-6 right-6">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm px-3 py-1 text-[11px] font-semibold text-white/90 mb-3">
                    <Zap className="w-3 h-3" strokeWidth={2.5} />
                    9,8 kWp instalados nesse projeto
                  </span>
                  <p className="font-display font-bold text-2xl sm:text-3xl text-white leading-tight text-pretty drop-shadow-sm">
                    Sua energia.{" "}
                    <span className="text-brand-3">Seu patrimônio.</span>
                  </p>
                </div>
              </div>

              {/* Card de suporte, encaixado por baixo da imagem — reforça o "responde em minutos" do texto ao lado */}
              <div className="relative z-10 -mt-8 mx-6 flex items-center gap-4 rounded-2xl border border-border bg-white px-5 py-4 shadow-lg">
                <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-muted shrink-0">
                  <Headphones className="w-6 h-6 text-brand-2" strokeWidth={1.8} />
                </span>
                <div className="min-w-0">
                  <p className="font-display font-semibold text-sm text-foreground leading-snug">Sem robô, sem fila</p>
                  <p className="text-xs text-muted-foreground leading-snug mt-0.5">Você fala direto com quem entende de energia solar.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
