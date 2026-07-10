"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/ui/reveal";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { whatsappHref } from "@/lib/site";

type Service = {
  index: string;
  title: string;
  description: string;
  details: readonly string[];
  tag: string;
  /* Classes completas (não interpoladas) para o JIT do Tailwind enxergar.
     Cada serviço ocupa um tom do espectro quente, de cima para baixo —
     mesmo arco vermelho→amarelo do leque do hero. */
  accent: string;
  bar: string;
  cta: string;
};

const SERVICES: readonly Service[] = [
  {
    index: "01",
    title: "Sites e landing pages de alta conversão",
    description: "Páginas rápidas e persuasivas que transformam visita em cliente.",
    details: [
      "Estrutura pensada para conversão, não só estética",
      "Performance de verdade, carrega em menos de 2s",
      "SEO técnico desde a base",
      "Medição: você sabe de onde vem cada contato",
    ],
    tag: "presença",
    accent: "text-ember",
    bar: "bg-ember",
    cta: "hover:border-ember hover:text-ember",
  },
  {
    index: "02",
    title: "Sistemas web sob medida / SaaS",
    description: "Software feito para a sua operação, do MVP ao produto completo.",
    details: [
      "MVP funcional em semanas, não meses",
      "Login, pagamentos e painel administrativo",
      "Arquitetura pronta para crescer com o negócio",
      "Você é dono do código, sem aluguel de plataforma",
    ],
    tag: "produto",
    accent: "text-tangerine",
    bar: "bg-tangerine",
    cta: "hover:border-tangerine hover:text-tangerine",
  },
  {
    index: "03",
    title: "Automações e integrações",
    description: "Processos manuais viram fluxos automáticos entre suas ferramentas.",
    details: [
      "Integração entre CRM, planilhas, WhatsApp e e-mail",
      "Relatórios que se montam sozinhos",
      "APIs e webhooks conectando o que hoje é copia-e-cola",
      "Horas de trabalho repetitivo de volta na sua semana",
    ],
    tag: "operação",
    accent: "text-amber",
    bar: "bg-amber",
    cta: "hover:border-amber hover:text-amber",
  },
  {
    index: "04",
    title: "Consultoria técnica",
    description: "Decisões de arquitetura e stack com quem já esteve do outro lado.",
    details: [
      "Revisão de arquitetura e código existente",
      "Escolha de stack sem modismo, só o que resolve",
      "Segunda opinião antes de contratar ou comprar",
      "Acompanhamento contínuo do seu time ou fornecedor",
    ],
    tag: "direção",
    accent: "text-gold",
    bar: "bg-gold",
    cta: "hover:border-gold hover:text-gold",
  },
];

export function Services() {
  const [active, setActive] = useState<Service | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  /* Escape fecha o card; scroll da página trava enquanto ele está aberto */
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActive(null);
    }
    document.body.style.overflow = active ? "hidden" : "auto";
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(cardRef, () => setActive(null));

  return (
    <section
      id="servicos"
      className="relative overflow-hidden bg-graphite py-24 sm:py-32"
    >
      {/* Overlay + card expandido — a linha clicada "vira" o card (layoutId) */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-noir/80 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 z-[100] grid place-items-center p-4 sm:p-6">
            <motion.div
              layoutId={`service-card-${active.index}`}
              ref={cardRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`service-title-${active.index}`}
              className="relative w-full max-w-xl border border-line-d bg-noir"
            >
              {/* Hairline superior no tom do serviço */}
              <span
                aria-hidden
                className={`absolute inset-x-0 top-0 h-0.5 ${active.bar}`}
              />
              <button
                type="button"
                aria-label="Fechar"
                onClick={() => setActive(null)}
                className="absolute top-4 right-5 cursor-pointer font-display text-3xl leading-none font-light text-mist transition-colors duration-200 hover:text-paper"
              >
                ×
              </button>

              <div className="p-7 sm:p-10">
                <motion.p
                  layoutId={`service-meta-${active.index}`}
                  className="font-mono text-xs uppercase"
                >
                  <span className={active.accent}>{active.index}</span>
                  <span className="text-mist"> · {active.tag}</span>
                </motion.p>
                <motion.h3
                  layoutId={`service-title-${active.index}`}
                  id={`service-title-${active.index}`}
                  className={`mt-4 font-display text-2xl leading-tight font-bold sm:text-3xl ${active.accent}`}
                >
                  {active.title}
                </motion.h3>
                <motion.p
                  layoutId={`service-desc-${active.index}`}
                  className="mt-3 text-sm leading-relaxed text-mist sm:text-base"
                >
                  {active.description}
                </motion.p>

                {/* Conteúdo extra só existe no card — entra num fade próprio */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.15 } }}
                  exit={{ opacity: 0, transition: { duration: 0.05 } }}
                >
                  <ul className="mt-8 grid gap-y-3.5 border-t border-line-d pt-8">
                    {active.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-start gap-3 text-sm leading-relaxed text-paper/80"
                      >
                        <span
                          aria-hidden
                          className={`mt-1.5 h-1.5 w-1.5 shrink-0 ${active.bar}`}
                        />
                        {detail}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={whatsappHref(
                      `Olá, Leonardo! Tenho interesse em: ${active.title}.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-9 inline-flex items-center gap-2.5 border border-line-d px-6 py-3 font-mono text-xs uppercase text-paper transition-colors duration-300 ${active.cta}`}
                  >
                    conversar sobre isso
                    <span aria-hidden>↗</span>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="mb-12 grid gap-8 sm:mb-16 lg:grid-cols-[1fr_auto] lg:items-end">
          <Reveal>
            <p className="mb-4 font-mono text-xs uppercase text-ember">
              (03) serviços
            </p>
            <h2 className="max-w-2xl font-display text-4xl leading-[1.02] font-bold tracking-tight text-paper sm:text-6xl">
              Construo isso para o seu negócio
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm leading-relaxed text-mist lg:pb-1.5 lg:text-right">
              Quatro frentes, um objetivo: software que paga o próprio
              investimento.
            </p>
          </Reveal>
        </div>

        {/* A lista abre com o espectro quente inteiro; cada linha carrega um tom */}
        <div
          aria-hidden
          className="h-px bg-gradient-to-r from-ember via-amber to-gold"
        />
        {SERVICES.map((service, i) => (
          <Reveal key={service.index} delay={i * 0.08}>
            <motion.button
              layoutId={`service-card-${service.index}`}
              type="button"
              onClick={() => setActive(service)}
              className="group relative grid w-full cursor-pointer grid-cols-[auto_1fr_auto] items-baseline gap-x-5 border-b border-line-d py-6 text-left transition-colors duration-300 ease-out hover:bg-paper/[0.03] sm:gap-x-10 sm:py-8"
            >
              {/* Barra do acento cresce do topo no hover */}
              <span
                aria-hidden
                className={`absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 transition-transform duration-300 ease-out group-hover:scale-y-100 ${service.bar}`}
              />
              <motion.span
                layoutId={`service-meta-${service.index}`}
                className={`font-mono text-sm ${service.accent}`}
              >
                {service.index}
              </motion.span>
              <div className="transition-transform duration-300 ease-out group-hover:translate-x-2">
                <motion.h3
                  layoutId={`service-title-${service.index}`}
                  className="relative w-fit font-display text-2xl leading-tight font-bold text-paper sm:text-4xl"
                >
                  {service.title}
                  {/* Cópia colorida revelada por clip-path — "tinta" varrendo o título */}
                  <span
                    aria-hidden
                    className={`absolute inset-0 [clip-path:inset(0_100%_0_0)] transition-[clip-path] duration-500 ease-out group-hover:[clip-path:inset(0_0_0_0)] ${service.accent}`}
                  >
                    {service.title}
                  </span>
                </motion.h3>
                <motion.p
                  layoutId={`service-desc-${service.index}`}
                  className="mt-2.5 max-w-xl text-sm leading-relaxed text-mist sm:text-base"
                >
                  {service.description}
                </motion.p>
              </div>
              <div className="flex items-center gap-6 self-center">
                <span className="hidden font-mono text-xs uppercase text-mist md:block">
                  {service.tag}
                </span>
                {/* "+" sinaliza expansão (o card abre por cima) */}
                <span
                  aria-hidden
                  className="font-display text-3xl leading-none font-light text-mist transition-[transform,color] duration-300 ease-out group-hover:rotate-90 group-hover:text-paper"
                >
                  +
                </span>
              </div>
            </motion.button>
          </Reveal>
        ))}

        <Reveal delay={0.2}>
          <p className="mt-10 font-mono text-xs uppercase text-mist">
            precisa de outra coisa?{" "}
            <a
              href={whatsappHref(
                "Olá, Leonardo! Tenho um projeto diferente em mente.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ember underline-offset-4 transition-colors hover:text-tangerine hover:underline"
            >
              me conta no whatsapp ↗
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
