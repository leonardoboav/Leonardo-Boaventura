"use client";

import { motion } from "framer-motion";
import { SideAccent } from "@/components/ui/side-accent";
import { TextGenerate } from "@/components/ui/text-generate";
import { whatsappHref } from "@/lib/site";

const HEADLINE = "Sistemas e sites sob medida para o seu negócio crescer.";
const HIGHLIGHT = ["sob", "medida"] as const;

export function Hero() {
  return (
    <header className="relative isolate flex min-h-svh flex-col overflow-hidden bg-noir">
      {/* Acento: círculo cyan sólido entrando pela direita */}
      <SideAccent side="right" distance={180} className="top-24 -right-28 sm:top-20 sm:-right-20 lg:top-24 lg:-right-24">
        <div
          className="accent-grain animate-float h-40 w-40 rounded-full sm:h-64 sm:w-64 lg:h-[22rem] lg:w-[22rem]"
          style={{
            background:
              "radial-gradient(circle at 32% 28%, #86f3ff 0%, #00e0ff 42%, #006e80 100%)",
          }}
        />
      </SideAccent>
      <SideAccent side="right" distance={90} className="top-[26rem] right-0 hidden lg:block">
        <div className="h-px w-64 bg-electric" />
      </SideAccent>

      {/* Nav */}
      <nav className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <a href="#" className="font-display text-lg font-bold text-paper">
          lb<span className="text-electric">.</span>
        </a>
        <div className="hidden items-center gap-8 font-mono text-xs uppercase text-mist sm:flex">
          <a href="#servicos" className="transition-colors hover:text-electric">
            serviços
          </a>
          <a href="#processo" className="transition-colors hover:text-electric">
            processo
          </a>
          <a href="#contato" className="transition-colors hover:text-electric">
            contato
          </a>
        </div>
        <a
          href={whatsappHref()}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-line-d px-4 py-2 font-mono text-xs uppercase text-paper transition-colors hover:border-electric hover:text-electric focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric"
        >
          iniciar projeto →
        </a>
      </nav>

      {/* Conteúdo */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 py-20">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center gap-3 font-mono text-xs uppercase text-mist"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-electric" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-electric" />
          </span>
          [ disponível para novos projetos ]
        </motion.p>

        <h1 className="max-w-5xl font-display text-[2.75rem] leading-[0.98] font-bold tracking-tight text-paper sm:text-7xl lg:text-[5.5rem]">
          <TextGenerate text={HEADLINE} highlight={HIGHLIGHT} delay={0.15} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-mist"
        >
          Sou <strong className="font-medium text-paper">Leonardo Boaventura</strong>.
          Desenvolvo software que resolve problemas reais — do site que converte ao
          sistema que sustenta a operação.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 bg-electric px-8 py-4 font-semibold text-noir transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric"
          >
            Iniciar projeto
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="#servicos"
            className="inline-flex items-center justify-center border border-line-d px-8 py-4 font-semibold text-paper transition-colors duration-200 hover:border-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric"
          >
            Ver serviços
          </a>
        </motion.div>
      </div>

      {/* Rodapé do hero: meta em mono + indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-8"
      >
        <div className="flex items-end justify-between border-t border-line-d pt-6">
          <div className="flex flex-col gap-1 font-mono text-[0.65rem] uppercase text-mist sm:flex-row sm:gap-10 sm:text-xs">
            <span>base — brasil / remoto</span>
            <span>stack — typescript · react · node</span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[0.65rem] uppercase text-mist sm:text-xs">
            scroll
            <span className="block h-8 w-px overflow-hidden bg-line-d">
              <span className="animate-line-drop block h-full w-full bg-electric" />
            </span>
          </div>
        </div>
      </motion.div>
    </header>
  );
}
