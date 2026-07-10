export type Project = {
  slug: string;
  title: string;
  description: string;
  image: string; // caminho em /public/projects/
  tags: string[];
  repoUrl: string;
  liveUrl?: string;
};

/**
 * Placeholders — troque URLs, descrições e imagens pelos dados reais.
 * Os prints devem ficar em /public/projects/ (16:9). Ver o README de lá.
 */
export const projects: Project[] = [
  {
    slug: "realconnect",
    title: "RealConnect",
    description:
      "Placeholder — resumo curto do que o RealConnect faz e do resultado entregue.",
    image: "/projects/realconnect.png",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    repoUrl: "https://github.com/exemplo/realconnect",
    liveUrl: "https://realconnect.exemplo.com",
  },
  {
    slug: "bluesky",
    title: "BlueSky",
    description:
      "Placeholder — resumo curto do que o BlueSky faz e do resultado entregue.",
    image: "/projects/bluesky.png",
    tags: ["React", "Node", "PostgreSQL"],
    repoUrl: "https://github.com/exemplo/bluesky",
    liveUrl: "https://bluesky.exemplo.com",
  },
  {
    slug: "washclub",
    title: "WashClub",
    description:
      "Placeholder — resumo curto do que o WashClub faz e do resultado entregue.",
    image: "/projects/washclub.png",
    tags: ["Next.js", "Stripe", "Prisma"],
    repoUrl: "https://github.com/exemplo/washclub",
    // sem liveUrl: o card abre o repoUrl
  },
];
