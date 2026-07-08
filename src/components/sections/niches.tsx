import { Reveal } from "@/components/ui/reveal";
import { TextFlippingBoardCycle } from "@/components/ui/text-flipping-board";

// Destaques (palavras mais fortes) marcados com [colchetes] -> pintados de quente.
const BOARD_MESSAGES = [
  "SOFTWARE\n[SOB MEDIDA]",
  "TRANSFORMO [IDEIAS]\nEM SISTEMAS QUE\nFUNCIONAM\n[DE VERDADE]",
  "SEU [NEGOCIO]\nMERECE UM\n[SISTEMA BOM]",
  "DO SITE [SIMPLES]\nAO SISTEMA QUE\n[RODA A EMPRESA]",
  "BORA [CONSTRUIR]\nALGO [BOM]?",
  "SITES QUE [VENDEM]\nE SISTEMAS QUE\n[SUSTENTAM] SUA\n[OPERACAO]",
];

export function Niches() {
  return (
    <section className="overflow-hidden bg-noir py-24 sm:py-32">
      <Reveal className="mx-auto mb-14 max-w-6xl px-6">
        <p className="font-mono text-xs uppercase text-gold">
          (03) — manifesto
        </p>
      </Reveal>

      <div className="flex justify-center overflow-x-auto px-2 sm:px-6">
        <TextFlippingBoardCycle
          messages={BOARD_MESSAGES}
          rows={6}
          cols={23}
          interval={9000}
        />
      </div>
    </section>
  );
}
