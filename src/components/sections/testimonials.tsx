import { Marquee } from "@/components/ui/marquee";
import { Reveal } from "@/components/ui/reveal";
import { SideAccent } from "@/components/ui/side-accent";

type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

/* Placeholders — substituir por depoimentos reais */
const TESTIMONIALS: readonly Testimonial[] = [
  {
    quote:
      "O sistema que o Leonardo desenvolveu eliminou horas de trabalho manual da nossa equipe. Entrega no prazo e comunicação impecável.",
    author: "Nome do Cliente",
    role: "CEO · Empresa Exemplo",
  },
  {
    quote:
      "Nossa nova landing page dobrou a taxa de conversão em dois meses. Profissionalismo do início ao fim.",
    author: "Nome do Cliente",
    role: "Fundadora · Startup Exemplo",
  },
  {
    quote:
      "Raro encontrar um desenvolvedor que entende de negócio. Ele questionou o escopo e entregou algo melhor do que pedimos.",
    author: "Nome do Cliente",
    role: "Diretor · Indústria Exemplo",
  },
  {
    quote:
      "A integração entre nossos sistemas funcionou de primeira. Suporte rápido sempre que precisamos.",
    author: "Nome do Cliente",
    role: "Gerente de TI · Varejo Exemplo",
  },
];

/* Placeholders — substituir por logos reais */
const LOGOS = [
  "Empresa Um",
  "Empresa Dois",
  "Empresa Três",
  "Empresa Quatro",
  "Empresa Cinco",
  "Empresa Seis",
] as const;

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-graphite py-28 sm:py-40">
      {/* Acento: quadrado ácido entrando pela esquerda */}
      <SideAccent side="left" distance={150} className="top-10 -left-10 sm:top-16">
        <div
          className="accent-grain h-24 w-24 rotate-12 sm:h-36 sm:w-36 lg:h-48 lg:w-48"
          style={{
            background:
              "linear-gradient(135deg, #edff8a 0%, #d9ff3f 45%, #7d9a10 100%)",
          }}
        />
      </SideAccent>

      <div className="relative z-10 mx-auto mb-16 flex max-w-6xl flex-col items-end px-6 text-right">
        <Reveal>
          <p className="mb-6 font-mono text-xs uppercase text-tangerine">
            (05) — prova social
          </p>
          <h2 className="max-w-2xl font-display text-4xl leading-[1.02] font-bold tracking-tight text-paper sm:text-6xl">
            Quem contratou, recomenda
          </h2>
        </Reveal>
      </div>

      <Marquee duration={55}>
        {TESTIMONIALS.map((t) => (
          <figure
            key={t.quote}
            className="flex w-[20rem] flex-col justify-between border border-line-d bg-noir/50 p-8 sm:w-[24rem]"
          >
            <blockquote className="text-sm leading-relaxed text-paper">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-8 border-t border-line-d pt-5">
              <p className="font-display text-sm font-bold text-paper">{t.author}</p>
              <p className="mt-1 font-mono text-xs uppercase text-mist">{t.role}</p>
            </figcaption>
          </figure>
        ))}
      </Marquee>

      <div className="mt-12">
        <Marquee duration={35} reverse>
          {LOGOS.map((logo) => (
            <span
              key={logo}
              className="inline-flex items-center px-8 font-display text-lg font-bold whitespace-nowrap text-mist/70 uppercase"
            >
              {logo}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
