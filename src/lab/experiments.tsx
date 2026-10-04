import { useEffect, useRef, useState, type PointerEvent } from "react";
import { DEFAULT_FIELD, useLab } from "@/lab/state";

const INK_SWATCHES = ["#ff4d55", "#ff9a2e", "#e8ff57", "#3ee0a0", "#49b7ff", "#c084fc", "#eceae3"];

function readInk(name: string, fallback: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

export function Raios() {
  const { field, setField } = useLab();
  const rows: { key: keyof typeof field; label: string; min: number; max: number; step: number }[] = [
    { key: "count", label: "Densidade", min: 24, max: 120, step: 1 },
    { key: "link", label: "Alcance", min: 50, max: 200, step: 1 },
    { key: "speed", label: "Velocidade", min: 0, max: 1.6, step: 0.01 },
    { key: "dispersion", label: "Dispersão", min: 0, max: 28, step: 1 },
  ];

  return (
    <div className="flex flex-col gap-5">
      <p className="max-w-xl text-sm leading-relaxed text-pretty text-muted">
        Os raios atrás da interface são o campo do Prisma. Muda a densidade, o alcance das ligações
        e o quanto cada feixe se abre em vermelho, lima e ciano.
      </p>
      <div className="grid gap-4">
        {rows.map((row) => (
          <label key={row.key} className="flex flex-col gap-2 text-xs text-muted">
            <span className="flex items-center justify-between uppercase tracking-widest">
              {row.label}
              <span className="tabular-nums text-fg">
                {row.step < 1 ? field[row.key].toFixed(2) : Math.round(field[row.key])}
              </span>
            </span>
            <input
              type="range"
              min={row.min}
              max={row.max}
              step={row.step}
              value={field[row.key]}
              onChange={(event) => setField({ [row.key]: Number(event.target.value) })}
            />
          </label>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setField(DEFAULT_FIELD)}
        className="min-h-11 self-start rounded-panel border border-line px-4 text-xs uppercase tracking-widest text-muted hover:text-fg"
      >
        Restaurar campo
      </button>
    </div>
  );
}

const ASCII_CHARS = " .:-=+*#%@";

export function AsciiPrism() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, on: false });
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const source = document.createElement("canvas");
    const sctx = source.getContext("2d", { willReadFrequently: true });
    if (!sctx) return;
    let raf = 0;
    let running = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const paintSource = () => {
      const sw = 180;
      const sh = 100;
      source.width = sw;
      source.height = sh;
      sctx.fillStyle = "#050505";
      sctx.fillRect(0, 0, sw, sh);
      const img = imageRef.current;
      if (img && img.complete && img.naturalWidth) {
        const scale = Math.max(sw / img.naturalWidth, sh / img.naturalHeight);
        const dw = img.naturalWidth * scale;
        const dh = img.naturalHeight * scale;
        sctx.drawImage(img, (sw - dw) / 2, (sh - dh) / 2, dw, dh);
        return;
      }
      sctx.strokeStyle = "#ffffff";
      sctx.lineWidth = 2;
      sctx.beginPath();
      sctx.moveTo(sw / 2, 12);
      sctx.lineTo(sw - 18, sh - 14);
      sctx.lineTo(18, sh - 14);
      sctx.closePath();
      sctx.stroke();
      sctx.fillStyle = "#ffffff";
      sctx.fillRect(0, sh / 2 - 2, sw, 3);
    };

    const frame = () => {
      if (!running) return;
      paintSource();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = wrap.clientWidth;
      const h = Math.max(240, Math.min(420, Math.round(w * 0.56)));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = readInk("--color-bg", "#09090b");
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = readInk("--color-fg", "#eceae3");
      ctx.font = "12px 'IBM Plex Mono', ui-monospace, monospace";
      const cell = 8;
      const cols = Math.floor(w / cell);
      const rows = Math.floor(h / (cell + 4));
      const pixels = sctx.getImageData(0, 0, source.width, source.height).data;
      const mx = mouseRef.current.on ? mouseRef.current.x : w / 2;
      const my = mouseRef.current.on ? mouseRef.current.y : h / 2;
      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < cols; x += 1) {
          let sx = (x / cols) * source.width;
          let sy = (y / rows) * source.height;
          if (!reduce && mouseRef.current.on) {
            const px = x * cell;
            const py = y * (cell + 4);
            const dx = px - mx;
            const dy = py - my;
            const dist = Math.hypot(dx, dy) || 1;
            const pull = Math.max(0, 1 - dist / 180);
            const ang = Math.atan2(dy, dx) + pull * 1.15;
            sx = ((mx + Math.cos(ang) * dist) / w) * source.width;
            sy = ((my + Math.sin(ang) * dist) / h) * source.height;
          }
          const ix = Math.max(0, Math.min(source.width - 1, Math.floor(sx)));
          const iy = Math.max(0, Math.min(source.height - 1, Math.floor(sy)));
          const i = (iy * source.width + ix) * 4;
          const lum = ((pixels[i] ?? 0) + (pixels[i + 1] ?? 0) + (pixels[i + 2] ?? 0)) / 3;
          const glyph = ASCII_CHARS[Math.min(ASCII_CHARS.length - 1, Math.floor((lum / 255) * (ASCII_CHARS.length - 1)))] ?? " ";
          if (glyph !== " ") ctx.fillText(glyph, x * cell, y * (cell + 4) + 10);
        }
      }
      if (!reduce) raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
    };
  }, [fileName]);

  const loadFile = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Precisa ser uma imagem.");
      return;
    }
    setError(null);
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      imageRef.current = img;
      setFileName(file.name);
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      setError("Não consegui ler essa imagem.");
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  return (
    <div className="flex flex-col gap-3">
      <div
        ref={wrapRef}
        className="overflow-hidden rounded-panel border border-line"
        onPointerMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          mouseRef.current = { x: event.clientX - rect.left, y: event.clientY - rect.top, on: true };
        }}
        onPointerLeave={() => {
          mouseRef.current.on = false;
        }}
      >
        <canvas ref={canvasRef} className="block w-full" />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <label className="min-h-11 cursor-pointer rounded-panel border border-line px-4 text-xs uppercase tracking-widest text-muted hover:text-fg">
          <span className="inline-flex min-h-11 items-center">Soltar imagem</span>
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(event) => loadFile(event.target.files?.[0])}
          />
        </label>
        {fileName ? (
          <button
            type="button"
            className="min-h-11 rounded-panel px-3 text-xs text-muted hover:text-fg"
            onClick={() => {
              imageRef.current = null;
              setFileName(null);
            }}
          >
            Limpar · {fileName}
          </button>
        ) : (
          <span className="text-xs text-muted">Move o cursor pra torcer o prisma.</span>
        )}
      </div>
      {error ? <p className="text-xs text-fg">{error}</p> : null}
    </div>
  );
}

type Swatch = { hex: string; count: number };

function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

function extractPalette(img: HTMLImageElement): Swatch[] {
  const canvas = document.createElement("canvas");
  const size = 72;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return [];
  ctx.drawImage(img, 0, 0, size, size);
  const data = ctx.getImageData(0, 0, size, size).data;
  const buckets = new Map<string, Swatch & { r: number; g: number; b: number }>();
  for (let i = 0; i < data.length; i += 4) {
    const alpha = data[i + 3] ?? 0;
    if (alpha < 128) continue;
    const r = Math.round((data[i] ?? 0) / 24) * 24;
    const g = Math.round((data[i + 1] ?? 0) / 24) * 24;
    const b = Math.round((data[i + 2] ?? 0) / 24) * 24;
    const key = `${r},${g},${b}`;
    const found = buckets.get(key);
    if (found) found.count += 1;
    else buckets.set(key, { r, g, b, hex: rgbToHex(Math.min(255, r), Math.min(255, g), Math.min(255, b)), count: 1 });
  }
  return [...buckets.values()].sort((a, b) => b.count - a.count).slice(0, 6);
}

export function Paleta() {
  const [preview, setPreview] = useState<string | null>(null);
  const [swatches, setSwatches] = useState<Swatch[]>([]);
  const [note, setNote] = useState("Solta uma imagem pra extrair a paleta.");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const loadFile = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Precisa ser uma imagem.");
      return;
    }
    setError(null);
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setSwatches(extractPalette(img));
      setPreview((current) => {
        if (current) URL.revokeObjectURL(current);
        return url;
      });
      setNote("Clica numa cor pra copiar o hex.");
    };
    img.onerror = () => {
      setError("Não consegui ler essa imagem.");
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const copy = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setNote(`${hex} copiado.`);
    } catch {
      setNote(hex);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <label
        className="flex min-h-36 cursor-pointer flex-col items-center justify-center gap-2 rounded-panel border border-dashed border-line px-4 text-center text-sm text-muted hover:text-fg"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          loadFile(event.dataTransfer.files?.[0]);
        }}
      >
        {preview ? (
          <img src={preview} alt="Imagem enviada para extração de paleta" className="max-h-48 rounded-panel object-contain" />
        ) : (
          <span>Arrasta uma imagem ou clica pra escolher.</span>
        )}
        <input type="file" accept="image/*" className="sr-only" onChange={(event) => loadFile(event.target.files?.[0])} />
      </label>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {swatches.map((swatch) => (
          <button
            key={swatch.hex}
            type="button"
            onClick={() => void copy(swatch.hex)}
            className="flex min-h-16 items-end rounded-panel border border-line p-2 text-left text-xs"
            style={{ background: swatch.hex }}
          >
            <span className="rounded-panel bg-bg/80 px-2 py-1 font-medium uppercase tracking-widest text-fg">
              {swatch.hex}
            </span>
          </button>
        ))}
      </div>
      <p className="text-xs text-muted">{error ?? note}</p>
    </div>
  );
}

const COLS = 28;
const ROWS = 16;

export function Grade() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cellsRef = useRef<number[]>(Array.from({ length: COLS * ROWS }, () => 0));
  const colorRef = useRef(3);
  const painting = useRef(false);
  const [color, setColor] = useState(3);
  const [tick, setTick] = useState(0);
  const { theme } = useLab();
  colorRef.current = color;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth;
    const h = Math.round(w * (ROWS / COLS));
    canvas.style.height = `${h}px`;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const cw = w / COLS;
    const ch = h / ROWS;
    ctx.fillStyle = readInk("--color-bg", "#09090b");
    ctx.fillRect(0, 0, w, h);
    const cells = cellsRef.current;
    for (let i = 0; i < cells.length; i += 1) {
      const value = cells[i] ?? 0;
      const x = (i % COLS) * cw;
      const y = Math.floor(i / COLS) * ch;
      if (value > 0) {
        ctx.fillStyle = INK_SWATCHES[value - 1] ?? "#eceae3";
        ctx.fillRect(x + 1, y + 1, cw - 2, ch - 2);
      }
      ctx.strokeStyle = readInk("--color-line", "#2e2d2a");
      ctx.strokeRect(x, y, cw, ch);
    }
  }, [tick, theme]);

  const paintAt = (event: PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(((event.clientX - rect.left) / rect.width) * COLS);
    const y = Math.floor(((event.clientY - rect.top) / rect.height) * ROWS);
    if (x < 0 || y < 0 || x >= COLS || y >= ROWS) return;
    const index = y * COLS + x;
    const next = event.shiftKey || event.button === 2 ? 0 : colorRef.current;
    if (cellsRef.current[index] === next) return;
    cellsRef.current[index] = next;
    setTick((value) => value + 1);
  };

  const exportPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "prisma-grade.png";
    link.click();
  };

  return (
    <div className="flex flex-col gap-3">
      <canvas
        ref={canvasRef}
        className="w-full touch-none rounded-panel border border-line"
        onPointerDown={(event) => {
          painting.current = true;
          event.currentTarget.setPointerCapture(event.pointerId);
          paintAt(event);
        }}
        onPointerMove={(event) => {
          if (painting.current) paintAt(event);
        }}
        onPointerUp={() => {
          painting.current = false;
        }}
        onPointerLeave={() => {
          painting.current = false;
        }}
        onContextMenu={(event) => event.preventDefault()}
      />
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setColor(0)}
          className={
            "min-h-11 rounded-panel border px-3 text-xs uppercase tracking-widest " +
            (color === 0 ? "border-accent text-fg" : "border-line text-muted")
          }
        >
          Apagar
        </button>
        {INK_SWATCHES.map((swatch, index) => (
          <button
            key={swatch}
            type="button"
            aria-label={`Cor ${index + 1}`}
            onClick={() => setColor(index + 1)}
            className="size-11 rounded-panel border"
            style={{
              background: swatch,
              borderColor: color === index + 1 ? "var(--color-fg)" : "transparent",
            }}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={exportPng}
          className="min-h-11 rounded-panel bg-accent px-4 text-sm font-medium text-accent-ink"
        >
          Exportar PNG
        </button>
        <button
          type="button"
          onClick={() => {
            cellsRef.current = Array.from({ length: COLS * ROWS }, () => 0);
            setTick((value) => value + 1);
          }}
          className="min-h-11 rounded-panel border border-line px-4 text-xs uppercase tracking-widest text-muted hover:text-fg"
        >
          Limpar grade
        </button>
      </div>
      <p className="text-xs text-muted">Segura Shift pra apagar enquanto desenha.</p>
    </div>
  );
}

export function Sobre() {
  return (
    <div className="flex max-w-xl flex-col gap-4 text-sm leading-relaxed text-pretty">
      <p>
        Prisma. Experimental Design Studio • Creative Technology Lab. A casca é um estúdio: campo no fundo, árvore de
        experimentos, e cada ferramenta roda aqui mesmo.
      </p>
      <p className="text-muted">
        Raios mexe no campo que fica atrás de todas as telas. O Youtube Mixer toca vários vídeos do YouTube juntos, cada um com volume. ASCII transforma o
        prisma — ou uma imagem tua — num vórtice de caracteres. Palette Extractor puxa as cores dominantes.
        Tailwind Shades monta a escala 50–950 de uma cor. Palette Collection guarda paletas prontas.
        Password Generator cria senhas e frases-passe. QR Generator monta código de texto, Wi-Fi, contato ou um lote. Gradient Generator mistura linear, cantos ou malha. Grade desenha em células e baixa um PNG.
      </p>
      <p className="text-muted">
        Feito pra ser o lugar do app Prisma. Nada sai do navegador: sem conta, sem upload pra
        servidor. Tema e último experimento ficam só neste aparelho.
      </p>
      <dl className="grid grid-cols-2 gap-3 border-t border-line pt-4 text-xs uppercase tracking-widest text-muted">
        <div>
          <dt>Estúdio</dt>
          <dd className="mt-1 text-fg">Prisma Lab</dd>
        </div>
        <div>
          <dt>Origem</dt>
          <dd className="mt-1 text-fg">Brasil</dd>
        </div>
        <div>
          <dt>Versão</dt>
          <dd className="mt-1 tabular-nums text-fg">v0.1</dd>
        </div>
        <div>
          <dt>Campo</dt>
          <dd className="mt-1 text-fg">Ao vivo</dd>
        </div>
      </dl>
    </div>
  );
}
