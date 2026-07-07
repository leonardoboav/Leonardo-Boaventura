"use client";

import { motion, useReducedMotion } from "framer-motion";

type TextGenerateProps = {
  text: string;
  /** Palavras (exatas) que recebem o gradiente de destaque. */
  highlight?: readonly string[];
  className?: string;
  delay?: number;
};

/** Efeito "text generate": cada palavra entra com blur + fade em cascata. */
export function TextGenerate({
  text,
  highlight = [],
  className,
  delay = 0,
}: TextGenerateProps) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.08, delayChildren: delay }}
    >
      {words.map((word, i) => {
        const highlighted = highlight.includes(word);
        return (
          <motion.span
            key={`${word}-${i}`}
            className={
              highlighted ? "text-electric" : undefined
            }
            variants={{
              hidden: {
                opacity: 0,
                y: reduceMotion ? 0 : 12,
                filter: reduceMotion ? "blur(0px)" : "blur(8px)",
              },
              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.5, ease: "easeOut" },
              },
            }}
            style={{ display: "inline-block", whiteSpace: "pre" }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        );
      })}
    </motion.span>
  );
}
