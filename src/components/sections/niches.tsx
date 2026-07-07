import { Marquee } from "@/components/ui/marquee";
import { Reveal } from "@/components/ui/reveal";

const NICHES_A = [
  "Varejo",
  "Saúde",
  "Indústria",
  "E-commerce",
  "Serviços",
  "Educação",
] as const;

const NICHES_B = [
  "Logística",
  "Advocacia",
  "Imobiliário",
  "Finanças",
  "Alimentação",
  "Beleza & Estética",
] as const;

function TickerItem({ label, outline }: { label: string; outline?: boolean }) {
  return (
    <span className="inline-flex items-center gap-6 pr-2 sm:gap-8">
      <span
        className={`font-display text-3xl font-bold whitespace-nowrap uppercase sm:text-5xl ${
          outline ? "text-outline-paper" : "text-paper"
        }`}
      >
        {label}
      </span>
      <span aria-hidden className="text-xl text-electric sm:text-2xl">
        ✦
      </span>
    </span>
  );
}

export function Niches() {
  return (
    <section className="overflow-hidden bg-noir py-24 sm:py-32">
      <Reveal className="mx-auto mb-14 max-w-6xl px-6">
        <p className="mb-6 font-mono text-xs uppercase text-electric">
          (03) — nichos
        </p>
        <h2 className="max-w-2xl font-display text-4xl leading-[1.02] font-bold tracking-tight text-paper sm:text-6xl">
          Experiência em negócios de todos os tipos
        </h2>
      </Reveal>

      <div className="flex flex-col gap-8">
        <Marquee duration={38}>
          {NICHES_A.map((niche) => (
            <TickerItem key={niche} label={niche} />
          ))}
        </Marquee>
        <Marquee duration={46} reverse>
          {NICHES_B.map((niche) => (
            <TickerItem key={niche} label={niche} outline />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
