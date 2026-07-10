/**
 * Dados centrais do site. Troque o número do WhatsApp aqui —
 * todos os CTAs e o botão flutuante leem deste arquivo.
 */
export const SITE = {
  name: "Leonardo Boaventura",
  domain: "https://leonardoboaventura.com",
  email: "contato@leonardoboaventura.com",
  // Número no formato internacional (55 + DDD + número)
  whatsapp: "https://wa.me/5561999972737",
  whatsappMessage:
    "Olá, Leonardo! Vi seu site e quero conversar sobre um projeto.",
} as const;

export function whatsappHref(message: string = SITE.whatsappMessage): string {
  return `${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

/**
 * Foto da seção Sobre (renderizada com o DitherShader).
 * Coloque sua foto em /public (ex.: /public/leonardo.jpg) e troque abaixo:
 */
export const IMG_SOBRE = "/100253885.jpeg";
