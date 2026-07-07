import { Reveal } from "@/components/ui/reveal";
import { SideAccent } from "@/components/ui/side-accent";
import { whatsappHref } from "@/lib/site";

type Service = {
  index: string;
  title: string;
  description: string;
};

const SERVICES: readonly Service[] = [
  {
    index: "01",
    title: "Sites e landing pages de alta conversão",
    description: "Páginas rápidas e persuasivas que transformam visita em cliente.",
  },
  {
    index: "02",
    title: "Sistemas web sob medida / SaaS",
    description: "Software feito para a sua operação, do MVP ao produto completo.",
  },
  {
    index: "03",
    title: "Automações e integrações",
    description: "Processos manuais viram fluxos automáticos entre suas ferramentas.",
  },
  {
    index: "04",
    title: "Consultoria técnica",
    description: "Decisões de arquitetura e stack com quem já esteve do outro lado.",
  },
];

export function Services() {
  return (
    <section
      id="servicos"
      className="relative overflow-hidden bg-graphite pt-24 pb-16 sm:pt-32 sm:pb-24"
    >
      {/* Acento: índice display gigante vazado — 4 serviços */}
      <SideAccent side="right" distance={150} className="-top-4 right-0 sm:top-0 sm:right-4 lg:right-10">
        <span className="text-outline-acid font-display text-[7rem] leading-none font-bold select-none sm:text-[12rem] lg:text-[17rem]">
          04
        </span>
      </SideAccent>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <Reveal className="mb-12 max-w-2xl">
          <p className="mb-6 font-mono text-xs uppercase text-acid">
            (02) — serviços
          </p>
          <h2 className="font-display text-4xl leading-[1.02] font-bold tracking-tight text-paper sm:text-6xl">
            O que eu construo para o seu negócio
          </h2>
        </Reveal>

        <div className="border-t border-line-d">
          {SERVICES.map((service, i) => (
            <Reveal key={service.index} delay={i * 0.08}>
              <a
                href={whatsappHref(
                  `Olá, Leonardo! Tenho interesse em: ${service.title}.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-x-5 border-b border-line-d py-8 transition-colors duration-300 ease-out hover:bg-paper/[0.04] sm:gap-x-10 sm:py-10"
              >
                <span className="font-mono text-sm text-acid">{service.index}</span>
                <div>
                  <h3 className="font-display text-xl leading-tight font-bold text-paper sm:text-3xl">
                    {service.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-mist sm:text-base">
                    {service.description}
                  </p>
                </div>
                <span
                  aria-hidden
                  className="self-center font-display text-2xl text-mist transition-[transform,color] duration-300 ease-out group-hover:translate-x-1.5 group-hover:text-acid"
                >
                  →
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
