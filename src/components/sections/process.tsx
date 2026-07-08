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
      "Construção iterativa com entregas parciais — você acompanha o progresso, sem caixa-preta.",
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
      {/* Acento: "04" gigante vazado entrando pela esquerda — o título fica à direita */}
      <SideAccent side="left" distance={170} className="top-8 -left-20 sm:top-16 sm:-left-16 lg:top-20 lg:-left-20">
        <span className="text-outline-ember font-display text-[7rem] leading-none font-bold select-none sm:text-[12rem] lg:text-[17rem]">
          04
        </span>
      </SideAccent>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-end text-right">
          <Reveal className="mb-20">
            <p className="mb-6 font-mono text-xs uppercase text-ember-deep">
              (04) — processo
            </p>
            <h2 className="max-w-3xl font-display text-4xl leading-[1.02] font-bold tracking-tight sm:text-6xl">
              Do primeiro contato ao projeto no ar
            </h2>
          </Reveal>
        </div>

        <ol className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {STEPS.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.12}>
              <li className="group h-full border-t-2 border-noir pt-6 transition-colors duration-300 hover:border-ember-deep">
                <p className="font-display text-5xl leading-none font-bold text-ember-deep sm:text-6xl">
                  {step.number}
                </p>
                <h3 className="mt-6 font-display text-xl font-bold text-noir">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-stone">
                  {step.description}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
