"use client";

import { useEffect, useRef, useState } from "react";

type DitherShaderProps = {
  src: string;
  alt?: string;
  colorMode?: "grayscale" | "color";
  ditherMode?: "bayer";
  /** Tamanho da célula de dithering, em px CSS. */
  gridSize?: number;
  /** 0–1; acima de 0.5 escurece, abaixo clareia. */
  threshold?: number;
  primaryColor?: string;
  secondaryColor?: string;
  /**
   * Anima o campo de dithering. Mesmo com true, só roda em desktop
   * (pointer: fine) e com prefers-reduced-motion desligado.
   */
  animated?: boolean;
  animationSpeed?: number;
  className?: string;
};

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAG = `
precision mediump float;
varying vec2 vUv;
uniform sampler2D uTex;
uniform vec2 uUvScale;
uniform vec2 uUvOffset;
uniform float uGrid;
uniform float uThreshold;
uniform float uTime;
uniform float uAnim;
uniform float uGray;
uniform vec3 uPrimary;
uniform vec3 uSecondary;

float Bayer2(vec2 a) {
  a = floor(a);
  return fract(a.x / 2.0 + a.y * a.y * 0.75);
}

void main() {
  vec2 uv = vUv * uUvScale + uUvOffset;
  vec3 tex = texture2D(uTex, uv).rgb;
  float lum = dot(tex, vec3(0.299, 0.587, 0.114));
  lum += uAnim * sin(uTime + vUv.y * 9.0 + vUv.x * 5.0) * 0.04;

  vec2 cell = gl_FragCoord.xy / uGrid;
  float bayer =
    Bayer2(0.25 * cell) * 0.0625 + Bayer2(0.5 * cell) * 0.25 + Bayer2(cell);
  float on = step(bayer, lum + (0.5 - uThreshold));

  vec3 light = mix(tex, uSecondary, uGray);
  vec3 col = mix(uPrimary, light, on);
  gl_FragColor = vec4(col, 1.0);
}`;

function hexToRgb(hex: string): [number, number, number] {
  const value = hex.replace("#", "");
  const n = parseInt(
    value.length === 3
      ? value
          .split("")
          .map((c) => c + c)
          .join("")
      : value,
    16,
  );
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("[dither-shader]", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

/**
 * Renderiza uma imagem com dithering ordenado (Bayer 8x8) em WebGL,
 * estilo Aceternity UI. Lazy: o contexto só é criado quando o elemento
 * entra no viewport. Sem WebGL disponível, cai para <img> em grayscale
 * com grão (fallback estático).
 */
export function DitherShader({
  src,
  alt = "",
  colorMode = "grayscale",
  ditherMode = "bayer",
  gridSize = 2,
  threshold = 0.5,
  primaryColor = "#0a0a0a",
  secondaryColor = "#f5f5f0",
  animated = false,
  animationSpeed = 0.02,
  className,
}: DitherShaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);
  const [failed, setFailed] = useState(false);

  // Lazy-init: observa o container e só libera o shader quando entrar em tela
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || failed) return;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let cancelled = false;
    let raf = 0;
    let resizeObserver: ResizeObserver | null = null;
    let gl: WebGLRenderingContext | null = null;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const shouldAnimate = animated && !reduceMotion && finePointer;
    // Backing buffer contido: dithering não precisa de DPR alto
    const dpr = finePointer ? Math.min(window.devicePixelRatio || 1, 1.5) : 1;

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = src;

    image.onerror = () => {
      if (!cancelled) setFailed(true);
    };

    image.onload = () => {
      if (cancelled) return;
      gl = canvas.getContext("webgl", {
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: "low-power",
      });
      if (!gl) {
        setFailed(true);
        return;
      }

      const vert = compile(gl, gl.VERTEX_SHADER, VERT);
      const frag = compile(gl, gl.FRAGMENT_SHADER, FRAG);
      const program = gl.createProgram();
      if (!vert || !frag || !program) {
        setFailed(true);
        return;
      }
      gl.attachShader(program, vert);
      gl.attachShader(program, frag);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        setFailed(true);
        return;
      }
      gl.useProgram(program);

      // Quad de tela cheia
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
        gl.STATIC_DRAW,
      );
      const aPos = gl.getAttribLocation(program, "aPos");
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

      // Textura da imagem
      const texture = gl.createTexture();
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

      const uniform = (name: string) => gl!.getUniformLocation(program, name);
      gl.uniform1f(uniform("uGrid"), Math.max(1, gridSize) * dpr);
      gl.uniform1f(uniform("uThreshold"), threshold);
      gl.uniform1f(uniform("uGray"), colorMode === "grayscale" ? 1 : 0);
      gl.uniform1f(uniform("uAnim"), shouldAnimate ? 1 : 0);
      gl.uniform3fv(uniform("uPrimary"), hexToRgb(primaryColor));
      gl.uniform3fv(uniform("uSecondary"), hexToRgb(secondaryColor));
      const uTime = uniform("uTime");
      const uUvScale = uniform("uUvScale");
      const uUvOffset = uniform("uUvOffset");

      const draw = (timeSeconds: number) => {
        if (!gl) return;
        gl.uniform1f(uTime, timeSeconds);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      };

      const resize = () => {
        if (!gl) return;
        const width = Math.max(1, Math.round(container.clientWidth * dpr));
        const height = Math.max(1, Math.round(container.clientHeight * dpr));
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);

        // Cover-fit: recorta a imagem preservando proporção
        const canvasAspect = width / height;
        const imageAspect = image.naturalWidth / image.naturalHeight;
        let scaleX = 1;
        let scaleY = 1;
        if (imageAspect > canvasAspect) scaleX = canvasAspect / imageAspect;
        else scaleY = imageAspect / canvasAspect;
        gl.uniform2f(uUvScale, scaleX, scaleY);
        gl.uniform2f(uUvOffset, (1 - scaleX) / 2, (1 - scaleY) / 2);
        draw(0);
      };

      resize();
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(container);

      if (shouldAnimate) {
        const start = performance.now();
        const loop = () => {
          draw(((performance.now() - start) / 1000) * animationSpeed * 60);
          raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
      }
    };

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      resizeObserver?.disconnect();
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [
    visible,
    failed,
    src,
    colorMode,
    ditherMode,
    gridSize,
    threshold,
    primaryColor,
    secondaryColor,
    animated,
    animationSpeed,
  ]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className ?? ""}`}>
      {failed ? (
        // Fallback sem WebGL: grayscale + grão estático
        <span className="accent-grain block h-full w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover grayscale contrast-125"
          />
        </span>
      ) : (
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={alt}
          className="block h-full w-full"
        />
      )}
    </div>
  );
}
