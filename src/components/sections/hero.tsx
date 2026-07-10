"use client";

import { motion } from "framer-motion";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { RainbowBeams } from "@/components/ui/rainbow-beams";
import { TextGenerate } from "@/components/ui/text-generate";
import { whatsappHref } from "@/lib/site";

const HEADLINE = "Construa seu projeto em minutos, não dias.";
const HIGHLIGHT = ["minutos,"] as const;

export function Hero() {
  return (
    <header className="relative isolate flex min-h-svh flex-col overflow-hidden bg-noir">
      {/* Fundo: faixa diagonal de cores cobrindo o hero inteiro, atrás do conteúdo.
          Borda em corte seco na diagonal da própria fita; o texto fica na área preta. */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 opacity-60 sm:opacity-100"
      >
        <RainbowBeams className="h-full w-full" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <a href="#" className="font-display text-lg font-bold text-paper">
          lb<span className="text-tangerine">.</span>
        </a>
        <div className="hidden items-center gap-8 font-mono text-xs uppercase text-mist sm:flex">
          <a href="#servicos" className="transition-colors hover:text-tangerine">
            serviços
          </a>
          <a href="#processo" className="transition-colors hover:text-tangerine">
            processo
          </a>
          <a href="#contato" className="transition-colors hover:text-tangerine">
            contato
          </a>
        </div>
        <a
          href={whatsappHref()}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-line-d px-4 py-2 font-mono text-xs uppercase text-paper transition-colors hover:border-tangerine hover:text-tangerine focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tangerine"
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
            <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-tangerine" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-tangerine" />
          </span>
          <EncryptedText
            text="[ disponível para novos projetos ]"
            revealedClassName="text-mist"
            encryptedClassName="text-tangerine/70"
            revealDelayMs={45}
          />
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
          Desenvolvo software que resolve problemas reais. Do site que converte ao
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
            className="group inline-flex items-center justify-center gap-2 bg-tangerine px-8 py-4 font-semibold text-noir transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tangerine"
          >
            Iniciar projeto
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="#servicos"
            className="inline-flex items-center justify-center border border-line-d px-8 py-4 font-semibold text-paper transition-colors duration-200 hover:border-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tangerine"
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
            <span>base: brasil / remoto</span>
            <span>stack: typescript · react · node</span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[0.65rem] uppercase text-mist sm:text-xs">
            scroll
            <span className="block h-8 w-px overflow-hidden bg-line-d">
              <span className="animate-line-drop block h-full w-full bg-tangerine" />
            </span>
          </div>
        </div>
      </motion.div>
    </header>
  );
}
