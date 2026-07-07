# leonardoboaventura.com

Landing page de página única — Next.js 15 · TypeScript (strict) · Tailwind CSS v4 · Framer Motion.

## Rodar

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de produção
npm run typecheck  # tsc --noEmit
```

## Antes de publicar

1. **WhatsApp** — edite `src/lib/site.ts` e troque `55XXXXXXXXXXX` pelo número real (55 + DDD + número). Todos os CTAs e o botão flutuante leem desse arquivo.
2. **E-mail** — no mesmo arquivo, ajuste `email`.
3. **Depoimentos e logos** — placeholders em `src/components/sections/testimonials.tsx`.
4. **Formulário** — `src/app/api/contact/route.ts` valida e loga o lead; conecte ali o envio real (Resend, SendGrid, webhook de CRM…).
5. **Foto do Sobre** — coloque sua foto em `/public` (ex.: `leonardo.jpg`) e troque a constante `IMG_SOBRE` em `src/lib/site.ts`. Ela é renderizada com dithering (grayscale) pelo `DitherShader`.

## Estrutura

- `src/app/` — layout (fontes + SEO/OG), página, rota `/api/contact`
- `src/components/sections/` — uma seção por arquivo (hero, sobre, serviços, nichos, processo, depoimentos, contato, footer)
- `src/components/ui/` — primitivos animados (side-accent com parallax de scroll, dither-shader WebGL, text-generate, marquee infinito, reveal on-scroll, scroll-progress)
- `src/lib/site.ts` — dados centrais (nome, domínio, WhatsApp)
# Leonardo-Boaventura
# Leonardo-Boaventura
