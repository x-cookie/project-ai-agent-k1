"use client";

import { useEffect, useRef } from "react";

interface Star { x: number; y: number; z: number; speed: number; }
interface Node { x: number; y: number; vx: number; vy: number; r: number; }

export function ParticleField() {
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

    /* ── 3D starfield ── */
    const STARS = 160;
    const FOV   = 320;
    const stars: Star[] = Array.from({ length: STARS }, () => ({
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2,
      z: Math.random(),
      speed: Math.random() * 0.003 + 0.001,
    }));

    /* ── 2D network overlay ── */
    const NODES = 45;
    const nodes: Node[] = Array.from({ length: NODES }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
    }));

    let mouse = { x: 0, y: 0 };
    const onMouse = (e: MouseEvent) => { mouse = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMouse);

    let rafId: number;

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      const cx = W / 2, cy = H / 2;
      ctx.clearRect(0, 0, W, H);

      /* — Starfield — */
      for (const s of stars) {
        s.z -= s.speed;
        if (s.z <= 0) { s.x = (Math.random() - 0.5) * 2; s.y = (Math.random() - 0.5) * 2; s.z = 1; }

        const scale = FOV / (FOV + s.z * 600);
        const px = cx + s.x * scale * cx;
        const py = cy + s.y * scale * cy;
        const r  = Math.max(0.2, (1 - s.z) * 2.2);
        const a  = Math.min(1, (1 - s.z) * 0.9 + 0.05);

        /* trail */
        if (s.z < 0.65) {
          const prevZ  = s.z + s.speed * 3;
          const pScale = FOV / (FOV + prevZ * 600);
          ctx.strokeStyle = `rgba(200,195,255,${a * 0.35})`;
          ctx.lineWidth = r * 0.7;
          ctx.beginPath();
          ctx.moveTo(cx + s.x * pScale * cx, cy + s.y * pScale * cy);
          ctx.lineTo(px, py);
          ctx.stroke();
        }

        /* dot */
        const color = s.z < 0.3 ? `rgba(180,170,255,${a})` : `rgba(255,255,255,${a * 0.65})`;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();

        /* glow for close stars */
        if (s.z < 0.2) {
          const grad = ctx.createRadialGradient(px, py, 0, px, py, r * 5);
          grad.addColorStop(0, `rgba(124,113,232,${a * 0.25})`);
          grad.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(px, py, r * 5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      /* — Network overlay with subtle mouse parallax — */
      const mx = (mouse.x / window.innerWidth  - 0.5) * 18;
      const my = (mouse.y / window.innerHeight - 0.5) * 18;

      for (let i = 0; i < NODES; i++) {
        const n = nodes[i];
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;

        const nx = n.x + mx, ny = n.y + my;
        for (let j = i + 1; j < NODES; j++) {
          const m = nodes[j];
          const dx = nx - (m.x + mx), dy = ny - (m.y + my);
          const d  = Math.hypot(dx, dy);
          if (d < 120) {
            ctx.strokeStyle = `rgba(124,113,232,${0.13 * (1 - d / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath(); ctx.moveTo(nx, ny); ctx.lineTo(m.x + mx, m.y + my); ctx.stroke();
          }
        }
        ctx.fillStyle = `rgba(124,113,232,0.25)`;
        ctx.beginPath(); ctx.arc(nx, ny, n.r, 0, Math.PI * 2); ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => { cancelAnimationFrame(rafId); ro.disconnect(); window.removeEventListener("mousemove", onMouse); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      aria-hidden
    />
  );
}
