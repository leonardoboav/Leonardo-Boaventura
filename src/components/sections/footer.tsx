import { SITE, whatsappHref } from "@/lib/site";

const LINKS = [
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#processo", label: "Processo" },
  { href: "#contato", label: "Contato" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-line-d bg-noir">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-14 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-lg font-bold text-paper">
            Leonardo Boaventura<span className="text-electric">.</span>
          </p>
          <p className="mt-1 text-sm text-mist">
            Sites e sistemas sob medida · {new Date().getFullYear()}
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs uppercase text-mist">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-electric"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-1 text-sm text-mist sm:text-right">
          <a
            href={`mailto:${SITE.email}`}
            className="transition-colors hover:text-electric"
          >
            {SITE.email}
          </a>
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-electric"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
