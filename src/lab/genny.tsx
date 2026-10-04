import { useEffect, useMemo, useState } from "react";
import ArrowLeft from "lucide-react/dist/esm/icons/arrow-left.js";
import Check from "lucide-react/dist/esm/icons/check.js";
import Copy from "lucide-react/dist/esm/icons/copy.js";
import Download from "lucide-react/dist/esm/icons/download.js";
import Lock from "lucide-react/dist/esm/icons/lock.js";
import LockOpen from "lucide-react/dist/esm/icons/lock-open.js";
import Minus from "lucide-react/dist/esm/icons/minus.js";
import Plus from "lucide-react/dist/esm/icons/plus.js";
import Shuffle from "lucide-react/dist/esm/icons/shuffle.js";
import Trash2 from "lucide-react/dist/esm/icons/trash-2.js";
import {
  STRATEGY_CATEGORIES,
  STRATEGY_INFO,
  generatePalette,
  getStrategiesByCategory,
  type PaletteCategory,
  type PaletteStrategy,
} from "@/lab/palette-strategies";

type Swatch = { id: string; hex: string; locked: boolean };

const MIN = 2;
const MAX = 11;

const CATEGORY_LABEL: Record<PaletteCategory, string> = {
  random: "Aleatório",
  "color-theory": "Teoria da cor",
  mood: "Clima",
  era: "Épocas",
  nature: "Natureza",
  cultural: "Arte e cultura",
};

function nextId() {
  return Math.random().toString(36).slice(2, 9);
}

function swatch(hex: string): Swatch {
  return { id: nextId(), hex, locked: false };
}

function hexToRgb(hex: string): [number, number, number] | null {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());
  if (!match) return null;
  return [parseInt(match[1], 16), parseInt(match[2], 16), parseInt(match[3], 16)];
}

function ink(hex: string) {
  const rgb = hexToRgb(hex);
  if (!rgb) return "var(--color-fg)";
  const [r, g, b] = rgb.map((channel) => {
    const value = channel / 255;
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.4 ? "var(--color-bg)" : "var(--color-fg)";
}

function srgbToLinear(channel: number) {
  const value = channel / 255;
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

function oklchOf(hex: string) {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  const [r, g, b] = rgb;
  const lr = srgbToLinear(r);
  const lg = srgbToLinear(g);
  const lb = srgbToLinear(b);
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const bLab = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  let h = (Math.atan2(bLab, a) * 180) / Math.PI;
  if (h < 0) h += 360;
  return `L${(L * 100).toFixed(0)} C${Math.sqrt(a * a + bLab * bLab).toFixed(2)} H${h.toFixed(0)}`;
}

export function Genny({ name, colors, onBack }: { name: string; colors: string[]; onBack: () => void }) {
  const [colours, setColours] = useState<Swatch[]>(() => colors.map(swatch));
  const [strategy, setStrategy] = useState<PaletteStrategy>("random-cohesive");
  const [copied, setCopied] = useState<string | null>(null);
  const groups = useMemo(() => getStrategiesByCategory(), []);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(null), 1500);
    return () => window.clearTimeout(id);
  }, [copied]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target;
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement) return;
      if (event.code !== "Space") return;
      event.preventDefault();
      regenerate();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const copy = async (value: string, key: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
    } catch {
      setCopied(null);
    }
  };

  const regenerate = () => {
    const fresh = generatePalette(colours.length, strategy);
    setColours((current) => current.map((colour, index) => (colour.locked ? colour : swatch(fresh[index] ?? colour.hex))));
  };

  const update = (id: string, hex: string) => {
    if (!hexToRgb(hex)) return;
    setColours((current) => current.map((colour) => (colour.id === id ? { ...colour, hex } : colour)));
  };

  const download = () => {
    const width = 1200;
    const height = 630;
    const pad = 40;
    const gap = 12;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const swatchH = height - pad * 2 - 80;
    const swatchW = (width - pad * 2 - (colours.length - 1) * gap) / colours.length;
    ctx.fillStyle = "#f5f0e6";
    ctx.fillRect(0, 0, width, height);
    colours.forEach((colour, index) => {
      const x = pad + index * (swatchW + gap);
      ctx.fillStyle = colour.hex;
      ctx.beginPath();
      ctx.roundRect(x, pad, swatchW, swatchH, 16);
      ctx.fill();
      ctx.fillStyle = "#1a1a1a";
      ctx.font = "bold 20px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(colour.hex.toUpperCase(), x + swatchW / 2, height - pad - 20);
    });
    ctx.fillStyle = "#666666";
    ctx.font = "16px system-ui, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(name, width - pad, height - 16);
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `${name.toLowerCase().replace(/\s+/g, "-") || "paleta"}.png`;
    link.click();
  };

  const css = `:root {\n${colours.map((colour, index) => `  --palette-${index + 1}: ${colour.hex};`).join("\n")}\n}`;
  const json = JSON.stringify(
    colours.map((colour) => colour.hex),
    null,
    2,
  );
  const grid = colours.length > 4;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={onBack} className="inline-flex min-h-11 items-center gap-2 rounded-panel border border-line px-3 text-xs uppercase tracking-widest text-muted hover:text-fg">
          <ArrowLeft className="size-4" />
          Voltar
        </button>
        <h3 className="min-w-0 flex-1 truncate font-display text-2xl font-extrabold tracking-tight">{name}</h3>
      </div>
      <div className={"grid gap-2 " + (grid ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2 sm:grid-cols-none sm:flex")}>
        {colours.map((colour, index) => (
          <article key={colour.id} className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-panel border border-line bg-bg/40">
            <label className="relative block h-36 cursor-pointer sm:h-48" style={{ background: colour.hex }}>
              <input
                type="color"
                value={colour.hex}
                aria-label={`Editar cor ${colour.hex}`}
                onChange={(event) => update(colour.id, event.target.value)}
                className="absolute inset-0 cursor-pointer opacity-0"
              />
              <span className="pointer-events-none absolute left-2 top-2 text-xs font-medium tabular-nums" style={{ color: ink(colour.hex) }}>
                {String(index + 1).padStart(2, "0")}
              </span>
              {colour.locked ? (
                <Lock className="pointer-events-none absolute right-2 top-2 size-4" style={{ color: ink(colour.hex) }} />
              ) : null}
            </label>
            <div className="flex items-center justify-between gap-2 px-2 py-1">
              <span className="truncate font-mono text-xs text-fg">{colour.hex}</span>
              <span className="flex">
                <button type="button" aria-label={colour.locked ? "Destravar cor" : "Travar cor"} onClick={() => setColours((current) => current.map((item) => (item.id === colour.id ? { ...item, locked: !item.locked } : item)))} className="inline-flex size-11 items-center justify-center text-muted hover:text-fg">
                  {colour.locked ? <Lock className="size-4 text-accent" /> : <LockOpen className="size-4" />}
                </button>
                <button type="button" aria-label={`Copiar ${colour.hex}`} onClick={() => void copy(colour.hex, colour.id)} className="inline-flex size-11 items-center justify-center text-muted hover:text-fg">
                  {copied === colour.id ? <Check className="size-4 text-accent" /> : <Copy className="size-4" />}
                </button>
                <button type="button" aria-label="Remover cor" disabled={colours.length <= MIN} onClick={() => setColours((current) => current.filter((item) => item.id !== colour.id))} className="inline-flex size-11 items-center justify-center text-muted hover:text-fg disabled:opacity-40">
                  <Trash2 className="size-4" />
                </button>
              </span>
            </div>
          </article>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <select
          aria-label="Estratégia da paleta"
          value={strategy}
          onChange={(event) => setStrategy(event.target.value as PaletteStrategy)}
          className="min-h-11 min-w-0 flex-1 rounded-panel border border-line bg-bg px-3 text-sm text-fg"
        >
          {(Object.keys(STRATEGY_CATEGORIES) as PaletteCategory[]).map((category) => (
            <optgroup key={category} label={CATEGORY_LABEL[category]}>
              {groups[category].map((item) => (
                <option key={item.key} value={item.key}>
                  {item.info.name} — {item.info.description}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <button type="button" onClick={regenerate} className="inline-flex min-h-11 items-center gap-2 rounded-panel bg-accent px-3 text-sm font-medium text-accent-ink">
          <Shuffle className="size-4" />
          Gerar
        </button>
        <div className="inline-flex items-center rounded-panel border border-line">
          <button type="button" aria-label="Tirar uma cor" disabled={colours.length <= MIN} onClick={() => setColours((current) => current.slice(0, -1))} className="inline-flex size-11 items-center justify-center text-muted hover:text-fg disabled:opacity-40">
            <Minus className="size-4" />
          </button>
          <span className="w-6 text-center text-sm tabular-nums">{colours.length}</span>
          <button type="button" aria-label="Somar uma cor" disabled={colours.length >= MAX} onClick={() => setColours((current) => [...current, swatch(generatePalette(1, strategy)[0] ?? "#888888")])} className="inline-flex size-11 items-center justify-center text-muted hover:text-fg disabled:opacity-40">
            <Plus className="size-4" />
          </button>
        </div>
      </div>
      <p className="text-xs text-muted">{STRATEGY_INFO[strategy].description}. Espaço gera de novo. Cor travada fica no lugar.</p>
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => void copy(colours.map((colour) => colour.hex).join(", "), "all")} className="inline-flex min-h-11 items-center gap-2 rounded-panel border border-line px-3 text-xs uppercase tracking-widest text-muted hover:text-fg">
          {copied === "all" ? <Check className="size-4 text-accent" /> : <Copy className="size-4" />}
          Copiar cores
        </button>
        <button type="button" onClick={() => void copy(css, "css")} className="inline-flex min-h-11 items-center gap-2 rounded-panel border border-line px-3 text-xs uppercase tracking-widest text-muted hover:text-fg">
          {copied === "css" ? <Check className="size-4 text-accent" /> : <Copy className="size-4" />}
          CSS
        </button>
        <button type="button" onClick={() => void copy(json, "json")} className="inline-flex min-h-11 items-center gap-2 rounded-panel border border-line px-3 text-xs uppercase tracking-widest text-muted hover:text-fg">
          {copied === "json" ? <Check className="size-4 text-accent" /> : <Copy className="size-4" />}
          JSON
        </button>
        <button type="button" onClick={download} className="inline-flex min-h-11 items-center gap-2 rounded-panel border border-line px-3 text-xs uppercase tracking-widest text-muted hover:text-fg">
          <Download className="size-4" />
          Baixar imagem
        </button>
      </div>
      <ul className="flex flex-col">
        {colours.map((colour) => {
          const rgb = hexToRgb(colour.hex);
          return (
            <li key={colour.id} className="flex items-center gap-3 border-b border-line py-2 last:border-b-0">
              <span className="size-11 shrink-0 rounded-panel border border-line" style={{ background: colour.hex }} />
              <div className="min-w-0 flex-1">
                <p className="font-mono text-sm text-fg">{colour.hex}</p>
                <p className="truncate text-xs text-muted">
                  {rgb ? `RGB ${rgb.join(" ")}` : ""}
                  {oklchOf(colour.hex) ? ` · ${oklchOf(colour.hex)}` : ""}
                </p>
              </div>
              <button type="button" aria-label={`Copiar ${colour.hex} da lista`} onClick={() => void copy(colour.hex, `list-${colour.id}`)} className="inline-flex size-11 items-center justify-center text-muted hover:text-fg">
                {copied === `list-${colour.id}` ? <Check className="size-4 text-accent" /> : <Copy className="size-4" />}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
