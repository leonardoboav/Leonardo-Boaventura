import { WhatsAppIcon } from "@/components/sections/contact";
import { whatsappHref } from "@/lib/site";

/** Botão flutuante de WhatsApp — fixo, com pulse sutil e tooltip. */
export function WhatsAppButton() {
  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale comigo no WhatsApp"
      className="group fixed right-5 bottom-5 z-50 sm:right-7 sm:bottom-7"
    >
      <span className="pointer-events-none absolute top-1/2 right-full mr-3 -translate-y-1/2 border border-line-d bg-graphite px-3 py-1.5 font-mono text-xs whitespace-nowrap text-paper opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
        Fale comigo
      </span>
      <span className="relative flex h-14 w-14 items-center justify-center">
        <span
          aria-hidden
          className="animate-pulse-ring absolute inset-0 rounded-full bg-[#25D366]"
        />
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-noir shadow-[0_8px_24px_rgba(37,211,102,0.35)] transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
          <WhatsAppIcon className="h-7 w-7" />
        </span>
      </span>
    </a>
  );
}
