"use client";

import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/ui/reveal";
import { SITE, whatsappHref } from "@/lib/site";

type FormStatus = "idle" | "sending" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") ?? "").trim(),
      contact: String(data.get("contact") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };

    if (!payload.name || !payload.contact || !payload.message) {
      setStatus("error");
      setErrorMessage("Preencha todos os campos antes de enviar.");
      return;
    }

    setStatus("sending");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(
          body?.error ?? `O servidor respondeu com erro (HTTP ${response.status}).`,
        );
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar sua mensagem. Tente novamente.",
      );
    }
  }

  const inputClasses =
    "w-full border-0 border-b border-line-d bg-transparent px-0 py-3 text-paper placeholder:text-mist/40 outline-none transition-colors duration-200 focus:border-ember";
  const labelClasses = "mb-1 block font-mono text-xs uppercase text-mist";

  return (
    <section
      id="contato"
      className="relative overflow-hidden bg-noir pt-24 pb-20 sm:pt-32 sm:pb-24"
    >
      {/* Glow quente ambiente no canto inferior-esquerdo (substitui a esfera cyan) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,82,51,0.16),transparent_65%)]"
      />

      <div className="relative z-10 mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        {/* Coluna esquerda: convite + canais diretos */}
        <div>
          <Reveal>
            <p className="mb-6 font-mono text-xs uppercase text-ember">
              (07) contato
            </p>
            <h2 className="font-display text-4xl leading-[1.02] font-bold tracking-tight text-paper sm:text-6xl">
              Pronto para tirar o projeto do papel?
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-mist">
              Me conte o que você precisa. Respondo com uma avaliação honesta do
              que faz sentido construir e do que não faz.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-col gap-3">
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 border border-line-d p-4 transition-colors duration-200 hover:border-ember focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ember/10 text-ember">
                  <WhatsAppIcon className="h-5 w-5" />
                </span>
                <span className="flex-1">
                  <span className="block font-mono text-xs uppercase text-mist">
                    WhatsApp
                  </span>
                  <span className="block text-sm text-paper">
                    Resposta rápida, direto comigo
                  </span>
                </span>
                <span
                  aria-hidden
                  className="text-mist transition-[transform,color] duration-200 group-hover:translate-x-1 group-hover:text-ember"
                >
                  →
                </span>
              </a>

              <a
                href={`mailto:${SITE.email}`}
                className="group flex items-center gap-4 border border-line-d p-4 transition-colors duration-200 hover:border-ember focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ember/10 text-ember">
                  <MailIcon className="h-5 w-5" />
                </span>
                <span className="flex-1">
                  <span className="block font-mono text-xs uppercase text-mist">
                    E-mail
                  </span>
                  <span className="block text-sm text-paper">{SITE.email}</span>
                </span>
                <span
                  aria-hidden
                  className="text-mist transition-[transform,color] duration-200 group-hover:translate-x-1 group-hover:text-ember"
                >
                  →
                </span>
              </a>
            </div>

            <div className="mt-8 flex items-center gap-3 font-mono text-xs uppercase text-mist">
              <span className="relative flex h-2 w-2">
                <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-ember" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
              </span>
              resposta em até 1 dia útil
            </div>
          </Reveal>
        </div>

        {/* Coluna direita: formulário num painel */}
        <Reveal delay={0.15}>
          <div className="relative border border-line-d bg-graphite/40 p-7 backdrop-blur-sm sm:p-9">
            {/* Hairline de acento no topo do painel */}
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-ember via-tangerine to-transparent"
            />
            <form onSubmit={handleSubmit} noValidate>
              <div className="flex flex-col gap-8">
                <div>
                  <label htmlFor="name" className={labelClasses}>
                    Nome
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Seu nome"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label htmlFor="contact" className={labelClasses}>
                    E-mail ou WhatsApp
                  </label>
                  <input
                    id="contact"
                    name="contact"
                    type="text"
                    required
                    autoComplete="email"
                    placeholder="voce@empresa.com ou (11) 90000-0000"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label htmlFor="message" className={labelClasses}>
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Me conte sobre o seu projeto…"
                    className={`${inputClasses} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group inline-flex items-center justify-center gap-2 bg-ember px-7 py-4 font-semibold text-noir transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
                >
                  {status === "sending" ? "Enviando…" : "Enviar mensagem"}
                  {status !== "sending" && (
                    <span
                      aria-hidden
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  )}
                </button>

                <div aria-live="polite" className="min-h-5 text-sm">
                  {status === "success" && (
                    <p className="flex items-center gap-2 text-ember">
                      <span aria-hidden>✓</span>
                      Mensagem enviada! Retorno em até 1 dia útil.
                    </p>
                  )}
                  {status === "error" && errorMessage && (
                    <p className="text-ember">{errorMessage}</p>
                  )}
                </div>
              </div>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23-.73-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}
