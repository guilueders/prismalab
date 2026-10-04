import { useEffect, useRef } from "react";
import { useLab, type FieldParams, type ThemeName } from "@/lab/state";

type Particle = { x: number; y: number; vx: number; vy: number; p: number };

const INK = {
  dark: {
    bg: "#09090b",
    dot: "rgba(236,234,227,0.72)",
    link: "rgba(236,234,227,0.16)",
  },
  light: {
    bg: "#f3f1ea",
    dot: "rgba(22,22,20,0.62)",
    link: "rgba(22,22,20,0.14)",
  },
} as const;

const CHANNELS = ["rgba(255,59,78,0.55)", "rgba(232,255,87,0.35)", "rgba(62,203,255,0.55)"];

export function FieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, field } = useLab();
  const themeRef = useRef<ThemeName>(theme);
  const fieldRef = useRef<FieldParams>(field);
  themeRef.current = theme;
  fieldRef.current = field;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mouse = { x: -9999, y: -9999, on: false };
    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let raf = 0;
    let running = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const seed = () => {
      particles = Array.from({ length: 140 }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        p: index / 140,
      }));
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      seed();
    };

    const drawRay = (
      x0: number,
      y0: number,
      angle: number,
      length: number,
      spread: number,
    ) => {
      const dx = Math.cos(angle);
      const dy = Math.sin(angle);
      const px = -dy;
      const py = dx;
      CHANNELS.forEach((color, index) => {
        const shift = (index - 1) * spread;
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.1;
        ctx.moveTo(x0 + px * shift, y0 + py * shift);
        ctx.lineTo(x0 + dx * length + px * shift, y0 + dy * length + py * shift);
        ctx.stroke();
      });
    };

    const frame = (time: number) => {
      if (!running) return;
      const ink = INK[themeRef.current];
      const params = fieldRef.current;
      const active = Math.max(
        12,
        Math.round(params.count * (width < 720 ? 0.55 : 1)),
      );
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = ink.bg;
      ctx.fillRect(0, 0, width, height);

      const originX = mouse.on ? mouse.x : width * 0.5;
      const originY = mouse.on ? mouse.y : height * 0.42;
      const spin = reduce ? 0.4 : time * 0.00018 * (0.4 + params.speed);
      for (let ray = 0; ray < 5; ray += 1) {
        const angle = spin + (Math.PI * 2 * ray) / 5;
        drawRay(originX, originY, angle, Math.min(width, height) * 0.42, params.dispersion);
      }

      const linkDist = params.link;
      for (let i = 0; i < active; i += 1) {
        const a = particles[i];
        if (!a) continue;
        if (!reduce) {
          a.x += a.vx * (0.35 + params.speed);
          a.y += a.vy * (0.35 + params.speed);
          if (mouse.on) {
            const dx = mouse.x - a.x;
            const dy = mouse.y - a.y;
            const dist = Math.hypot(dx, dy) || 1;
            if (dist < 180) {
              a.vx += (dx / dist) * 0.01;
              a.vy += (dy / dist) * 0.01;
            }
          }
          a.vx *= 0.992;
          a.vy *= 0.992;
          if (a.x < 0 || a.x > width) a.vx *= -1;
          if (a.y < 0 || a.y > height) a.vy *= -1;
          a.x = Math.max(0, Math.min(width, a.x));
          a.y = Math.max(0, Math.min(height, a.y));
        }

        for (let j = i + 1; j < active; j += 1) {
          const b = particles[j];
          if (!b) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDist) {
            ctx.strokeStyle = ink.link;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        ctx.fillStyle = ink.dot;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.p > 0.92 ? 2.2 : 1.15, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduce) raf = requestAnimationFrame(frame);
    };

    const onMove = (event: PointerEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      mouse.on = true;
    };
    const onLeave = () => {
      mouse.on = false;
    };

    resize();
    raf = requestAnimationFrame(frame);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
