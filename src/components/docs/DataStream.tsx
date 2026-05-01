"use client";

import { useEffect, useRef } from "react";

const TOKENS = [
  "const", "async", "=>", "await", "{}", "[]",
  "import", "export", "return", "null", "void",
  "true", "false", ".map()", ".filter()", "Promise",
  "typeof", "class", "new", "interface", "type",
  "let", "if (", "try {", "catch", "}", "//",
  "===", "!==", "&&", "||", "fn()", "0x1f",
  "resolve", "reject", "yield", "next()", "::",
  "abort", "signal", "stream", "token", "ctx",
];

interface Token {
  text: string; x: number; y: number;
  vy: number; vx: number; opacity: number; size: number;
}

export function DataStream() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const pick = () => TOKENS[Math.floor(Math.random() * TOKENS.length)];

    const tokens: Token[] = Array.from({ length: 36 }, () => ({
      text: pick(),
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vy: Math.random() * 0.28 + 0.08,
      vx: (Math.random() - 0.5) * 0.08,
      opacity: Math.random() * 0.055 + 0.018,
      size: Math.random() * 5 + 9,
    }));

    let raf: number;

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      for (const t of tokens) {
        ctx.font = `${t.size}px 'Geist Mono', ui-monospace, monospace`;

        /* alternating subtle hues: mostly purple, some green */
        const hue = t.size > 12 ? `124,113,232` : `74,222,128`;
        ctx.fillStyle = `rgba(${hue},${t.opacity})`;
        ctx.fillText(t.text, t.x, t.y);

        t.x += t.vx;
        t.y += t.vy;

        if (t.y > H + 24)  { t.y = -18; t.x = Math.random() * W; t.text = pick(); }
        if (t.x < -60)     t.x = W + 10;
        if (t.x > W + 60)  t.x = -10;
      }

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
    />
  );
}
