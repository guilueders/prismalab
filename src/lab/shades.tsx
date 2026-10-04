import { useEffect, useState } from "react";
import Check from "lucide-react/dist/esm/icons/check.js";
import Copy from "lucide-react/dist/esm/icons/copy.js";

type Triple = [number, number, number];
type Mode = "classic" | "hue-shift" | "luminance-anchored" | "vivid" | "muted";

type Shade = {
  level: number;
  hex: string;
  oklch: Triple;
};

const DEFAULT_COLOUR = "#3b82f6";

const SHADE_TARGETS: [number, number][] = [
  [50, 0.97],
  [100, 0.93],
  [200, 0.87],
  [300, 0.78],
  [400, 0.66],
  [500, 0.55],
  [600, 0.47],
  [700, 0.4],
  [800, 0.33],
  [900, 0.27],
  [950, 0.2],
];

const MODES: { value: Mode; label: string; description: string }[] = [
  { value: "classic", label: "Clássico", description: "Escala no estilo Tailwind, com o mesmo matiz." },
  { value: "hue-shift", label: "Desvio de matiz", description: "Claros mais quentes, escuros mais frios." },
  { value: "luminance-anchored", label: "Ancorado", description: "Claros perto do branco e escuros perto do preto." },
  { value: "vivid", label: "Vívido", description: "Saturação alta em todos os tons." },
  { value: "muted", label: "Suave", description: "Tons dessaturados, mais discretos." },
];

const MODE_RAMPS: Record<Mode, [number, number, number]> = {
  classic: [0.75, 1, 0.85],
  "hue-shift": [0.75, 1, 0.85],
  "luminance-anchored": [0.5, 1, 0.6],
  vivid: [1, 1.35, 1.15],
  muted: [0.3, 0.5, 0.4],
};

function hexToRgb(hex: string): Triple | null {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());
  if (!match) return null;
  return [parseInt(match[1], 16), parseInt(match[2], 16), parseInt(match[3], 16)];
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((channel) =>
        Math.round(Math.max(0, Math.min(255, channel)))
          .toString(16)
          .padStart(2, "0"),
      )
      .join("")
  );
}

function srgbToLinear(channel: number): number {
  const value = channel / 255;
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

function linearToSrgb(channel: number): number {
  const value = channel <= 0.0031308 ? 12.92 * channel : 1.055 * channel ** (1 / 2.4) - 0.055;
  return Math.round(Math.max(0, Math.min(255, value * 255)));
}

function lchToLab(l: number, c: number, h: number): Triple {
  const rad = (h * Math.PI) / 180;
  return [l, c * Math.cos(rad), c * Math.sin(rad)];
}

function rgbToOklab(r: number, g: number, b: number): Triple {
  const lr = srgbToLinear(r);
  const lg = srgbToLinear(g);
  const lb = srgbToLinear(b);
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
}

function oklabToLinearRgb(L: number, a: number, b: number): Triple {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

function oklabToRgb(L: number, a: number, b: number): Triple {
  return oklabToLinearRgb(L, a, b).map(linearToSrgb) as Triple;
}

function maxOklchChroma(l: number, h: number): number {
  let lo = 0;
  let hi = 0.5;
  for (let step = 0; step < 24; step += 1) {
    const mid = (lo + hi) / 2;
    const inGamut = oklabToLinearRgb(...lchToLab(l, mid, h)).every((value) => value >= -1e-5 && value <= 1 + 1e-5);
    if (inGamut) lo = mid;
    else hi = mid;
  }
  return lo;
}

function rgbToOklch(r: number, g: number, b: number): Triple {
  const [l, a, bLab] = rgbToOklab(r, g, b);
  let h = (Math.atan2(bLab, a) * 180) / Math.PI;
  if (h < 0) h += 360;
  return [l, Math.sqrt(a * a + bLab * bLab), h];
}

function rampScale(index: number, mode: Mode): number {
  const [light, mid, dark] = MODE_RAMPS[mode];
  const fromEnd = SHADE_TARGETS.length - 1 - index;
  if (index < 2) return light + (mid - light) * (index / 2);
  if (fromEnd < 2) return dark + (mid - dark) * (fromEnd / 2);
  return mid;
}

function shadeParams(index: number, targetL: number, baseSat: number, baseH: number, mode: Mode): Triple {
  const fromEnd = SHADE_TARGETS.length - 1 - index;
  const l =
    mode !== "luminance-anchored" ? targetL : index < 2 ? targetL + (1 - targetL) * 0.3 : fromEnd < 2 ? targetL * 0.8 : targetL;
  const h = mode === "hue-shift" ? (baseH + (targetL - 0.5) * 2 * 15 + 360) % 360 : baseH;
  const sat = Math.min(1, baseSat * rampScale(index, mode));
  return [l, sat * maxOklchChroma(l, h), h];
}

function generateShades(baseHex: string, mode: Mode): Shade[] | null {
  const rgb = hexToRgb(baseHex);
  if (!rgb) return null;
  const [baseL, baseC, baseH] = rgbToOklch(...rgb);
  const baseMax = maxOklchChroma(baseL, baseH);
  const baseSat = baseMax > 0 ? Math.min(1, baseC / baseMax) : 0;
  return SHADE_TARGETS.map(([level, targetL], index) => {
    const oklch = shadeParams(index, targetL, baseSat, baseH, mode);
    return { level, hex: rgbToHex(...oklabToRgb(...lchToLab(...oklch))), oklch };
  });
}

function ink(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return "var(--color-fg)";
  const [r, g, b] = rgb.map((channel) => {
    const value = channel / 255;
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 0.4 ? "var(--color-bg)" : "var(--color-fg)";
}

export function Shades() {
  const [base, setBase] = useState(DEFAULT_COLOUR);
  const [name, setName] = useState("primary");
  const [mode, setMode] = useState<Mode>("classic");
  const [copied, setCopied] = useState<string | null>(null);
  const shades = generateShades(base, mode);
  const modeInfo = MODES.find((item) => item.value === mode) ?? MODES[0];
  const token = name || "primary";

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(null), 1500);
    return () => window.clearTimeout(id);
  }, [copied]);

  const copy = async (value: string, key: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
    } catch {
      setCopied(null);
    }
  };

  const cssBlock = shades
    ? `:root {\n${shades.map((shade) => `  --${token}-${shade.level}: ${shade.hex};`).join("\n")}\n}`
    : "";
  const oklchBlock = shades
    ? `:root {\n${shades
        .map(
          (shade) =>
            `  --${token}-${shade.level}: oklch(${shade.oklch[0].toFixed(3)} ${shade.oklch[1].toFixed(3)} ${shade.oklch[2].toFixed(1)});`,
        )
        .join("\n")}\n}`
    : "";
  const tailwindBlock = shades
    ? `${token}: {\n${shades.map((shade) => `      ${shade.level}: '${shade.hex}',`).join("\n")}\n    },`
    : "";

  const blocks = [
    { key: "css", label: "Variáveis CSS", code: cssBlock },
    { key: "oklch", label: "Variáveis CSS (OKLCH)", code: oklchBlock },
    { key: "tailwind", label: "Config do Tailwind", code: tailwindBlock },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-3 md:grid-cols-3">
        <label className="flex flex-col gap-2 text-xs uppercase tracking-widest text-muted">
          Cor base
          <span className="flex gap-2">
            <input
              type="color"
              value={hexToRgb(base) ? base : "#000000"}
              aria-label="Escolher cor base"
              onChange={(event) => setBase(event.target.value)}
              className="size-11 shrink-0 cursor-pointer rounded-panel border border-line bg-bg p-1"
            />
            <input
              value={base}
              aria-label="Cor base"
              spellCheck={false}
              onChange={(event) => setBase(event.target.value)}
              className="min-h-11 min-w-0 flex-1 rounded-panel border border-line bg-bg px-3 font-mono text-sm normal-case tracking-normal text-fg"
            />
          </span>
        </label>
        <label className="flex flex-col gap-2 text-xs uppercase tracking-widest text-muted">
          Nome da cor
          <input
            value={name}
            aria-label="Nome da cor"
            spellCheck={false}
            onChange={(event) => setName(event.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
            className="min-h-11 rounded-panel border border-line bg-bg px-3 font-mono text-sm normal-case tracking-normal text-fg"
          />
        </label>
        <label className="flex flex-col gap-2 text-xs uppercase tracking-widest text-muted">
          Modo
          <select
            value={mode}
            aria-label="Modo de geração"
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 rounded-panel border border-line bg-bg px-3 text-sm normal-case tracking-normal text-fg"
          >
            {MODES.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <span className="normal-case tracking-normal">{modeInfo.description}</span>
        </label>
      </div>

      {shades ? (
        <>
          <div className="flex w-full min-w-0 gap-1 overflow-x-auto">
            {shades.map((shade) => (
              <button
                key={shade.level}
                type="button"
                onClick={() => void copy(shade.hex, shade.hex)}
                aria-label={`Copiar ${shade.level}`}
                className="flex h-16 min-w-11 flex-1 flex-col items-center justify-end rounded-panel border border-line pb-1 text-xs font-medium tabular-nums"
                style={{ background: shade.hex, color: ink(shade.hex) }}
              >
                {shade.level}
              </button>
            ))}
          </div>
          <ul className="flex flex-col">
            {shades.map((shade) => (
              <li key={shade.level} className="flex items-center gap-2 border-b border-line py-1 last:border-b-0">
                <span className="w-10 text-xs tabular-nums text-muted">{shade.level}</span>
                <span className="size-8 shrink-0 rounded-panel border border-line" style={{ background: shade.hex }} />
                <span className="min-w-0 flex-1 truncate font-mono text-sm text-fg">{shade.hex}</span>
                <button
                  type="button"
                  aria-label={`Copiar tom ${shade.level}`}
                  onClick={() => void copy(shade.hex, shade.hex)}
                  className="inline-flex size-11 items-center justify-center text-muted hover:text-fg"
                >
                  {copied === shade.hex ? <Check className="size-4 text-accent" /> : <Copy className="size-4" />}
                </button>
              </li>
            ))}
          </ul>
          <div className="grid gap-3 lg:grid-cols-3">
            {blocks.map((block) => (
              <div key={block.key} className="flex min-w-0 flex-col gap-2 rounded-panel border border-line bg-bg/40 p-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-xs uppercase tracking-widest text-muted">{block.label}</h3>
                  <button
                    type="button"
                    onClick={() => void copy(block.code, block.key)}
                    className="inline-flex min-h-11 items-center gap-2 px-2 text-xs uppercase tracking-widest text-muted hover:text-fg"
                  >
                    {copied === block.key ? <Check className="size-4 text-accent" /> : <Copy className="size-4" />}
                    {copied === block.key ? "Copiado" : "Copiar"}
                  </button>
                </div>
                <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-fg">{block.code}</pre>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-sm text-muted">Hex inválido. Usa seis dígitos, tipo #3b82f6.</p>
      )}
    </div>
  );
}
