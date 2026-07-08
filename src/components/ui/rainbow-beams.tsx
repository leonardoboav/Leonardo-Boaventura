"use client";

import { useEffect, useRef, useState } from "react";

type RainbowBeamsProps = {
  className?: string;
};

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

// Cone de estrias diagonais paralelas formando um espectro SÓ quente
// (vermelho -> amarelo), estilo Aceternity "Shaders": a cor varia perpendicular
// à diagonal (vermelho encostando no texto preto ... amarelo no canto oposto),
// com faixas chapadas e distintas ondulando como uma bandeira.
const FRAG = `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform vec2 uRes;

// 9 cores CHAPADAS da fita, SÓ tons quentes (vermelho -> amarelo claro), como
// estrias distintas. Sem ciano, violeta, roxo, magenta ou rosa.
vec3 palette(float i) {
  if (i < 0.5)  return vec3(0.90, 0.16, 0.12); // vermelho profundo
  if (i < 1.5)  return vec3(1.00, 0.24, 0.14); // vermelho
  if (i < 2.5)  return vec3(1.00, 0.34, 0.14); // vermelho / laranja
  if (i < 3.5)  return vec3(1.00, 0.46, 0.15); // laranja
  if (i < 4.5)  return vec3(1.00, 0.57, 0.18); // laranja
  if (i < 5.5)  return vec3(1.00, 0.69, 0.22); // âmbar
  if (i < 6.5)  return vec3(1.00, 0.80, 0.30); // amarelo
  if (i < 7.5)  return vec3(1.00, 0.88, 0.42); // amarelo
  return vec3(1.00, 0.94, 0.66);               // amarelo claro
}

void main() {
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2(vUv.x * aspect, vUv.y);

  // CONE: as cores convergem num apex perto do rodapé e se ABREM (ficam mais
  // largas) conforme sobem em direção à lateral direita. A cor é escolhida pelo
  // ÂNGULO em torno do apex, então cada faixa cresce com a distância.
  vec2 origin = vec2(aspect * 0.26, -0.197); // apex ABAIXO da tela -> base larga (não vira bico)
  vec2 d = p - origin;
  float ang = atan(d.y, d.x); // 0 = direita ... PI/2 = para cima

  float aCenter = 0.568; // direção central do cone (rad) — sai pela lateral, sem tocar o topo
  float aHalf = 0.120;   // meia-abertura angular do cone
  float t = ((aCenter + aHalf) - ang) / (2.0 * aHalf); // 0 = vermelho (topo) ... 1 = amarelo (base)

  // MOVIMENTO DE BANDEIRA + POR COR: a onda viaja ao longo do comprimento das
  // faixas (presa no apex/"mastro", mais ampla nas pontas). A FASE varia pela
  // largura (t), então CADA faixa de cor balança no seu próprio tempo — como
  // fitas independentes esvoaçando. Contínuo em t: sem costura entre as cores.
  float dist = length(d);
  float env = smoothstep(0.15, 1.1, dist);    // calmo perto do mastro, amplo nas pontas

  // BANDEIRA + ONDA PRETA (bem devagar): uma onda viaja pelo comprimento do feixe.
  // A faixa de cor ondula p/ CIMA e p/ BAIXO (assimétrico, como bandeira) e é
  // ESPREMIDA nos extremos do balanço — o preto avança por UM lado de cada vez.
  float travel = dist * 0.9 - uTime * 0.11;   // devagar; viaja ao longo do feixe
  float w = sin(travel * 6.2831);             // -1..1, onda viajante
  float pivot = 0.5 + 0.32 * w * env;         // centro da faixa sobe/desce (bandeira)
  float squeeze = 1.0 - 0.315 * w * w * env;  // aperto reduzido 30% (0.45 -> 0.315)
  float tC = (t - pivot) / squeeze + pivot;   // desloca/comprime de forma ASSIMÉTRICA

  // MOVIMENTO ISOLADO POR COR: fase proporcional a 't' faz CADA faixa de cor
  // ondular no seu próprio tempo, como fitas independentes esvoaçando.
  float phase = t * 9.0;
  float flutter = sin(dist * 5.0 - uTime * 0.45 + phase) * 0.6
                + sin(dist * 8.0 - uTime * 0.28 + phase * 1.5) * 0.4;
  tC += flutter * 0.028 * env;

  // Cone delimitado: preto fora (AA mínimo só para não serrilhar a borda).
  float inBand = smoothstep(-0.004, 0.004, tC) * smoothstep(1.004, 0.996, tC);

  // 9 FAIXAS CHAPADAS: cor sólida, SEM gradiente e SEM linhas separadoras.
  float idx = floor(clamp(tC, 0.0, 0.999) * 9.0);
  vec3 col = palette(idx) * inBand;

  gl_FragColor = vec4(col, 1.0);
}`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("[rainbow-beams]", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

/**
 * Fundo de faixas diagonais coloridas em WebGL, com ondulação sutil de bandeira.
 * Lazy (só inicializa ao entrar no viewport), pausa a animação quando sai da
 * tela e renderiza um frame estático com prefers-reduced-motion. Sem WebGL,
 * fica o fundo preto da seção.
 */
export function RainbowBeams({ className }: RainbowBeamsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);

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
      { rootMargin: "80px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const gl = canvas.getContext("webgl", {
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });
    if (!gl) return; // sem WebGL: permanece o fundo preto da seção

    const vert = compile(gl, gl.VERTEX_SHADER, VERT);
    const frag = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const program = gl.createProgram();
    if (!vert || !frag || !program) return;
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

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

    const uTime = gl.getUniformLocation(program, "uTime");
    const uRes = gl.getUniformLocation(program, "uRes");

    // Faixas nítidas pedem resolução real (meia escala borrava as linhas);
    // limita o DPR para não pesar em telas retina.
    const scale = Math.min(window.devicePixelRatio || 1, 2);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const start = performance.now();

    const draw = () => {
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const resize = () => {
      const width = Math.max(1, Math.round(container.clientWidth * scale));
      const height = Math.max(1, Math.round(container.clientHeight * scale));
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
      gl.uniform2f(uRes, width, height);
      draw();
    };

    let raf = 0;
    let running = false;
    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };
    const setRunning = (next: boolean) => {
      if (reduceMotion || next === running) return;
      running = next;
      if (next) raf = requestAnimationFrame(loop);
      else cancelAnimationFrame(raf);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    // Pausa a ondulação quando o hero sai do viewport (poupa GPU).
    const pauseObserver = new IntersectionObserver((entries) => {
      setRunning(entries.some((entry) => entry.isIntersecting));
    });
    pauseObserver.observe(container);
    if (reduceMotion) draw();

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      pauseObserver.disconnect();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [visible]);

  return (
    <div ref={containerRef} aria-hidden className={className}>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
