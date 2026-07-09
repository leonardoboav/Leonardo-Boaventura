import type { Metadata } from "next";
import { Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { SITE } from "@/lib/site";
import "./globals.css";

// Complementar: corpo dos parágrafos.
const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: "Leonardo Boaventura | Sites e sistemas sob medida",
    template: "%s | Leonardo Boaventura",
  },
  description:
    "Desenvolvimento de sites de alta conversão, sistemas web sob medida, automações e consultoria técnica para negócios que precisam de software de qualidade.",
  keywords: [
    "desenvolvedor",
    "sites sob medida",
    "sistemas web",
    "SaaS",
    "landing page",
    "automações",
    "Leonardo Boaventura",
  ],
  openGraph: {
    type: "website",
    url: SITE.domain,
    siteName: "Leonardo Boaventura",
    title: "Leonardo Boaventura | Sites e sistemas sob medida",
    description:
      "Software sob medida para o seu negócio crescer: sites de alta conversão, sistemas web, automações e consultoria técnica.",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leonardo Boaventura | Sites e sistemas sob medida",
    description:
      "Software sob medida para o seu negócio crescer: sites de alta conversão, sistemas web, automações e consultoria técnica.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${instrument.variable} ${jetbrains.variable}`}
    >
      <body className="grain">
        {children}
      </body>
    </html>
  );
}
