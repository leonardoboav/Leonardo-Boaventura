import { DitherShader } from "@/components/ui/dither-shader";
import { Reveal } from "@/components/ui/reveal";
import { IMG_SOBRE } from "@/lib/site";

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
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          {/* Retrato em dithering — o elemento humano e o acento da seção */}
          <Reveal className="max-w-60 sm:max-w-xs lg:max-w-none">
            <DitherShader
              src={IMG_SOBRE}
              alt="Retrato de Leonardo Boaventura"
              colorMode="grayscale"
              ditherMode="bayer"
              gridSize={2}
              threshold={0.5}
              primaryColor="#0a0a0a"
              secondaryColor="#f5f5f0"
              animated
              animationSpeed={0.02}
              className="aspect-[3/4] w-full border border-line-l"
            />
            <p className="mt-4 flex items-center gap-2.5 font-mono text-xs uppercase text-stone">
              <span aria-hidden className="h-2 w-2 bg-punch" />
              leonardo boaventura — desenvolvedor
            </p>
          </Reveal>

          {/* Texto alinhado à direita — contraponto ao hero */}
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
                Sou desenvolvedor focado em criar soluções que resolvem problemas
                reais de negócio. Antes de escrever qualquer linha de código, entendo
                o que precisa acontecer no seu faturamento, na sua operação ou na sua
                rotina — e então construo o software certo para isso, com qualidade de
                produto e sem complexidade desnecessária.
              </p>
            </Reveal>
          </div>
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
