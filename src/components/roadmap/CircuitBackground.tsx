"use client";

import { useEffect, useRef } from "react";

interface GNode { x: number; y: number; }
interface Pulse { from: number; to: number; t: number; speed: number; hue: number; }

const GAP = 72;

export function CircuitBackground() {
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

    const nodes: GNode[] = [];
    const pulses: Pulse[] = [];

    const rebuild = () => {
      nodes.length = 0;
      const cols = Math.ceil(canvas.width  / GAP) + 2;
      const rows = Math.ceil(canvas.height / GAP) + 2;
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++)
          nodes.push({ x: c * GAP, y: r * GAP });
    };
    rebuild();

    const cols = () => Math.ceil(canvas.width / GAP) + 2;

    const adj = (i: number) => {
      const c = cols();
      const out = [];
      if (i % c !== c - 1) out.push(i + 1);
      if (i % c !== 0)     out.push(i - 1);
      if (i + c < nodes.length) out.push(i + c);
      if (i - c >= 0)           out.push(i - c);
      return out;
    };

    const spawn = () => {
      if (pulses.length >= 30) return;
      const from = Math.floor(Math.random() * nodes.length);
      const neighbors = adj(from);
      if (!neighbors.length) return;
      const to = neighbors[Math.floor(Math.random() * neighbors.length)];
      pulses.push({ from, to, t: 0, speed: Math.random() * 0.009 + 0.004, hue: Math.random() < 0.7 ? 255 : 150 });
    };

    let raf: number;
    let frame = 0;

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      /* grid lines */
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = "rgba(255,255,255,0.022)";
      const C = cols(), R = Math.ceil(H / GAP) + 2;
      for (let r = 0; r < R; r++) {
        ctx.beginPath(); ctx.moveTo(0, r * GAP); ctx.lineTo(W, r * GAP); ctx.stroke();
      }
      for (let c = 0; c < C; c++) {
        ctx.beginPath(); ctx.moveTo(c * GAP, 0); ctx.lineTo(c * GAP, H); ctx.stroke();
      }

      /* intersection dots */
      for (const n of nodes) {
        if (n.x > W + GAP || n.y > H + GAP) continue;
        ctx.fillStyle = "rgba(255,255,255,0.045)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      /* pulses */
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.t += p.speed;
        if (p.t >= 1) { pulses.splice(i, 1); continue; }

        const A = nodes[p.from], B = nodes[p.to];
        if (!A || !B) { pulses.splice(i, 1); continue; }

        const x = A.x + (B.x - A.x) * p.t;
        const y = A.y + (B.y - A.y) * p.t;
        const alpha = Math.sin(p.t * Math.PI);

        /* trail */
        const tailT = Math.max(0, p.t - 0.18);
        const tx = A.x + (B.x - A.x) * tailT;
        const ty = A.y + (B.y - A.y) * tailT;
        const trail = ctx.createLinearGradient(tx, ty, x, y);
        const base = p.hue === 255 ? `124,113,232` : `74,222,128`;
        trail.addColorStop(0, `rgba(${base},0)`);
        trail.addColorStop(1, `rgba(${base},${alpha * 0.55})`);
        ctx.strokeStyle = trail;
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(x, y); ctx.stroke();

        /* head dot */
        ctx.fillStyle = `rgba(${base},${alpha * 0.9})`;
        ctx.beginPath(); ctx.arc(x, y, 2.2, 0, Math.PI * 2); ctx.fill();

        /* glow halo */
        const g = ctx.createRadialGradient(x, y, 0, x, y, 10);
        g.addColorStop(0, `rgba(${base},${alpha * 0.3})`);
        g.addColorStop(1, `rgba(${base},0)`);
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(x, y, 10, 0, Math.PI * 2); ctx.fill();
      }

      frame++;
      if (frame % 14 === 0) spawn();

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
