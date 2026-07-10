import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import { Reveal } from "@/components/ui/reveal";
import { SideAccent } from "@/components/ui/side-accent";

type Step = {
  number: string;
  title: string;
  description: string;
};

const STEPS: readonly Step[] = [
  {
    number: "01",
    title: "Descoberta",
    description:
      "Uma conversa direta para entender o problema, o contexto e o que sucesso significa para você.",
  },
  {
    number: "02",
    title: "Proposta e design",
    description:
      "Escopo claro, prazo realista e a solução desenhada antes de qualquer código.",
  },
  {
    number: "03",
    title: "Desenvolvimento",
    description:
      "Construção iterativa com entregas parciais. Você acompanha o progresso, sem caixa-preta.",
  },
  {
    number: "04",
    title: "Entrega e suporte",
    description:
      "Deploy, treinamento e suporte contínuo. O projeto não termina no lançamento.",
  },
];

export function Process() {
  return (
    <section
      id="processo"
      className="relative overflow-hidden bg-paper py-28 text-noir sm:py-40"
    >
      {/* Textura de fundo: malha de pontos na região dos cards (abaixo do
          header, para não ficar atrás do título), focada no centro e
          dissolvendo suave (mask radial com feather) até as bordas. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 top-[36%] z-0 [mask-image:radial-gradient(ellipse_60%_66%_at_50%_50%,#000_0%,#000_16%,transparent_74%)] [-webkit-mask-image:radial-gradient(ellipse_60%_66%_at_50%_50%,#000_0%,#000_16%,transparent_74%)]"
      >
        <DottedGlowBackground
          className="h-full w-full"
          gap={13}
          radius={1.7}
          opacity={0.7}
          colorLightVar="--color-neutral-500"
          glowColorLightVar="--color-ember"
          backgroundOpacity={0}
          speedMin={0.4}
          speedMax={1.8}
          speedScale={1.2}
        />
      </div>

      {/* Acento: "04" gigante vazado entrando pela esquerda — o título fica à direita */}
      <SideAccent side="left" distance={170} className="top-8 -left-20 sm:top-16 sm:-left-16 lg:top-20 lg:-left-20">
        <span className="font-display text-[7rem] leading-none font-bold text-ember select-none sm:text-[12rem] lg:text-[17rem]">
          04
        </span>
      </SideAccent>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-end text-right">
          <Reveal className="mb-20">
            <p className="mb-6 font-mono text-xs uppercase text-ember-deep">
              (05) processo
            </p>
            <h2 className="max-w-3xl font-display text-4xl leading-[1.02] font-bold tracking-tight sm:text-6xl">
              Do primeiro contato ao projeto no ar
            </h2>
          </Reveal>
        </div>

        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.1} className="h-full">
              <li className="group relative flex h-full flex-col overflow-hidden border border-white/60 bg-paper/90 p-6 backdrop-blur-[5px] transition-[transform,border-color] duration-300 hover:-translate-y-1.5 hover:border-ember-deep/50 sm:p-7">
                {/* Número-fantasma gigante ao fundo */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-3 right-1 select-none font-display text-7xl font-bold leading-none text-noir/[0.05] transition-colors duration-300 group-hover:text-ember-deep/10"
                >
                  {step.number}
                </span>

                {/* Marcador numerado — preenche no hover */}
                <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-ember-deep/40 font-mono text-sm font-bold text-ember-deep transition-colors duration-300 group-hover:border-ember-deep group-hover:bg-ember-deep group-hover:text-paper">
                  {step.number}
                </span>

                <h3 className="relative z-10 mt-7 font-display text-xl font-bold text-noir">
                  {step.title}
                </h3>
                <p className="relative z-10 mt-2 text-sm leading-relaxed text-stone">
                  {step.description}
                </p>

                {/* Barra de acento que cresce no hover */}
                <div aria-hidden className="relative z-10 mt-auto pt-6">
                  <span className="block h-px w-10 bg-ember-deep/50 transition-all duration-300 ease-out group-hover:w-full group-hover:bg-ember-deep" />
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
