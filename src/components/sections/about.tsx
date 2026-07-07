import { Reveal } from "@/components/ui/reveal";
import { SideAccent } from "@/components/ui/side-accent";

const STATS = [
  { index: "01", value: "Sob medida", label: "nada de template pronto" },
  { index: "02", value: "Ponta a ponta", label: "do diagnóstico ao deploy" },
  { index: "03", value: "Direto", label: "você fala com quem desenvolve" },
] as const;

export function About() {
  return (
    <section
      id="sobre"
      className="relative overflow-hidden bg-paper pt-24 pb-20 text-noir sm:pt-32 sm:pb-24"
    >
      {/* Acento: lâmina magenta em gradiente entrando pela esquerda */}
      <SideAccent side="left" distance={160} className="top-20 -left-4 sm:top-28">
        <div
          className="accent-grain h-48 w-10 sm:h-72 sm:w-16 lg:h-[24rem] lg:w-24"
          style={{
            background:
              "linear-gradient(180deg, #ff74ac 0%, #ff3d8a 45%, #8f0a49 100%)",
          }}
        />
      </SideAccent>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Alinhado à direita — contraponto ao hero */}
        <div className="flex flex-col items-end text-right">
          <Reveal>
            <p className="mb-6 font-mono text-xs uppercase text-punch-deep">
              (01) — sobre
            </p>
            <h2 className="max-w-3xl font-display text-4xl leading-[1.02] font-bold tracking-tight sm:text-6xl">
              Tecnologia é meio.
              <br />
              <span className="text-stone">O fim é o seu resultado.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.15} className="mt-10 max-w-xl">
            <p className="text-lg leading-relaxed text-stone">
              Sou desenvolvedor focado em criar soluções que resolvem problemas reais
              de negócio. Antes de escrever qualquer linha de código, entendo o que
              precisa acontecer no seu faturamento, na sua operação ou na sua rotina —
              e então construo o software certo para isso, com qualidade de produto e
              sem complexidade desnecessária.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.25}>
          <dl className="mt-16 grid gap-8 border-t border-line-l pt-10 sm:grid-cols-3">
            {STATS.map((stat) => (
              <div key={stat.index}>
                <p className="font-mono text-xs text-punch-deep">{stat.index}</p>
                <dt className="mt-2 font-display text-xl font-bold text-noir">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-sm text-stone">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
