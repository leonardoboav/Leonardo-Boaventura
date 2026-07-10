import { Marquee } from "@/components/ui/marquee";
import { Reveal } from "@/components/ui/reveal";

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

function initialsOf(name: string) {
  const w = name.trim().split(/\s+/);
  return ((w[0]?.[0] ?? "") + (w[w.length - 1]?.[0] ?? "")).toUpperCase();
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="flex w-[20rem] shrink-0 flex-col justify-between border border-line-d bg-noir/40 p-7 backdrop-blur-sm transition-colors duration-300 hover:border-tangerine/50 sm:w-[24rem]">
      <div>
        <div
          className="flex gap-1 text-xs text-tangerine"
          aria-label="5 de 5 estrelas"
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} aria-hidden>
              ★
            </span>
          ))}
        </div>
        <blockquote className="mt-5 text-[0.95rem] leading-relaxed text-paper/90">
          {t.quote}
        </blockquote>
      </div>
      <figcaption className="mt-7 flex items-center gap-3 border-t border-line-d pt-5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-tangerine/40 font-mono text-xs font-bold text-tangerine">
          {initialsOf(t.author)}
        </span>
        <div>
          <p className="font-display text-sm font-bold text-paper">{t.author}</p>
          <p className="mt-0.5 font-mono text-xs uppercase text-mist">{t.role}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-graphite py-28 sm:py-40">
      <div className="relative z-10 mx-auto mb-16 flex max-w-6xl flex-col items-end px-6 text-right">
        <Reveal>
          <p className="mb-6 font-mono text-xs uppercase text-tangerine">
            (06) prova social
          </p>
          <h2 className="max-w-2xl font-display text-4xl leading-[1.02] font-bold tracking-tight text-paper sm:text-6xl">
            Quem contratou, recomenda
          </h2>
        </Reveal>
      </div>

      {/* Faixa de cards em movimento — pausa no hover (via componente Marquee) */}
      <Marquee duration={52}>
        {TESTIMONIALS.map((t) => (
          <TestimonialCard key={t.quote} t={t} />
        ))}
      </Marquee>

      {/* Logos — empresas que confiaram */}
      <div className="mt-16 sm:mt-20">
        <p className="mb-8 text-center font-mono text-xs uppercase text-mist/50">
          empresas que confiaram
        </p>
        <Marquee duration={35} reverse>
          {LOGOS.map((logo) => (
            <span
              key={logo}
              className="inline-flex items-center px-8 font-display text-lg font-bold whitespace-nowrap text-mist/50 uppercase transition-colors hover:text-mist"
            >
              {logo}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
