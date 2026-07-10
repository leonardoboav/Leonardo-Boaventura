"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/reveal";
import { projects } from "@/lib/projects";

export function ProjectsSection() {
  return (
    <section
      id="projetos"
      className="relative overflow-hidden bg-noir py-24 text-paper sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-14 max-w-2xl sm:mb-20">
          <p className="mb-6 font-mono text-xs uppercase text-ember">
            (02) projetos
          </p>
          <h2 className="font-display text-4xl leading-[1.02] font-bold tracking-tight sm:text-6xl">
            Projetos que já saíram do papel
          </h2>
        </Reveal>

        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <motion.li
              key={project.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            >
              <a
                href={project.liveUrl ?? project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden border border-line-d bg-graphite transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1.5 hover:border-ember/50 hover:shadow-[0_24px_48px_-28px_rgba(255,82,51,0.25)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
              >
                {/* Print do projeto (16:9) */}
                <div className="relative aspect-video overflow-hidden bg-paper/5">
                  <Image
                    src={project.image}
                    alt={`Print do projeto ${project.title}`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-xl font-bold text-paper">
                      {project.title}
                    </h3>
                    <span
                      aria-hidden
                      className="mt-0.5 text-mist transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-ember"
                    >
                      ↗
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-mist">
                    {project.description}
                  </p>
                  <ul className="mt-auto flex flex-wrap gap-2 pt-5">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-line-d px-3 py-1 font-mono text-[0.7rem] tracking-wide text-mist uppercase"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
