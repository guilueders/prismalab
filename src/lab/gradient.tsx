import { useEffect, useRef, useState, type PointerEvent } from "react";
import Check from "lucide-react/dist/esm/icons/check.js";
import Copy from "lucide-react/dist/esm/icons/copy.js";
import Download from "lucide-react/dist/esm/icons/download.js";

type Mode = "linear" | "corners" | "mesh";
type GridSize = 2 | 3;
type Triple = [number, number, number];
type Stop = { id: string; colour: string; position: number };
type Corners = { topLeft: string; topRight: string; bottomLeft: string; bottomRight: string };
type MeshPoint = { id: string; x: number; y: number; colour: string };

const SIZES = [
  { label: "512", w: 512, h: 512 },
  { label: "1K", w: 1024, h: 1024 },
  { label: "HD", w: 1920, h: 1080 },
  { label: "Story", w: 1080, h: 1920 },
];

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function hexToRgb(hex: string): Triple | null {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());
  if (!match?.[1] || !match[2] || !match[3]) return null;
  return [parseInt(match[1], 16), parseInt(match[2], 16), parseInt(match[3], 16)];
}

function rgbToHex(r: number, g: number, b: number) {
  return (
    "#" +
    [r, g, b]
      .map((channel) =>
        Math.round(clamp(channel, 0, 255))
          .toString(16)
          .padStart(2, "0"),
      )
      .join("")
  );
}

function srgbToLinear(channel: number) {
  const value = channel / 255;
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

function linearToSrgb(channel: number) {
  const value = channel <= 0.0031308 ? 12.92 * channel : 1.055 * channel ** (1 / 2.4) - 0.055;
  return Math.round(clamp(value * 255, 0, 255));
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

function oklabToRgb(L: number, a: number, b: number): Triple {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    linearToSrgb(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    linearToSrgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    linearToSrgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
  ];
}

function lerp(a: Triple, b: Triple, t: number): Triple {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

function lerpOklab(hex1: string, hex2: string, t: number) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  if (!rgb1 || !rgb2) return hex1;
  const lab = lerp(rgbToOklab(...rgb1), rgbToOklab(...rgb2), t);
  return rgbToHex(...oklabToRgb(...lab));
}

function sortStops(stops: Stop[]) {
  return [...stops].sort((a, b) => a.position - b.position);
}

function meshPoints(grid: GridSize): MeshPoint[] {
  const colours = grid === 2 ? ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b"] : ["#3b82f6", "#8b5cf6", "#ec4899", "#10b981", "#6366f1", "#f59e0b", "#06b6d4", "#84cc16", "#ef4444"];
  const points: MeshPoint[] = [];
  let index = 0;
  for (let y = 0; y < grid; y += 1) {
    for (let x = 0; x < grid; x += 1) {
      points.push({ id: uid(), x: x / (grid - 1), y: y / (grid - 1), colour: colours[index % colours.length] ?? "#000" });
      index += 1;
    }
  }
  return points;
}

function gradientCss(mode: Mode, angle: number, stops: Stop[], corners: Corners, points: MeshPoint[]) {
  if (mode === "linear") {
    const list = sortStops(stops)
      .map((stop) => `${stop.colour} ${stop.position}%`)
      .join(", ");
    return `background: linear-gradient(${angle}deg, ${list});`;
  }
  if (mode === "corners") {
    return `background:
  radial-gradient(ellipse at top left, ${corners.topLeft}, transparent 70%),
  radial-gradient(ellipse at top right, ${corners.topRight}, transparent 70%),
  radial-gradient(ellipse at bottom left, ${corners.bottomLeft}, transparent 70%),
  radial-gradient(ellipse at bottom right, ${corners.bottomRight}, transparent 70%);`;
  }
  const layers = points
    .map((point) => `radial-gradient(circle at ${Math.round(point.x * 100)}% ${Math.round(point.y * 100)}%, ${point.colour}, transparent 60%)`)
    .join(",\n  ");
  return `/* aproximação; o PNG é o resultado fiel */\nbackground: ${layers};`;
}

function renderGradient(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  mode: Mode,
  angle: number,
  noise: number,
  stops: Stop[],
  corners: Corners,
  points: MeshPoint[],
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  canvas.width = width;
  canvas.height = height;

  if (mode === "linear") {
    const rad = ((angle - 90) * Math.PI) / 180;
    const diagonal = Math.hypot(width, height);
    const gradient = ctx.createLinearGradient(
      width / 2 - (Math.cos(rad) * diagonal) / 2,
      height / 2 - (Math.sin(rad) * diagonal) / 2,
      width / 2 + (Math.cos(rad) * diagonal) / 2,
      height / 2 + (Math.sin(rad) * diagonal) / 2,
    );
    for (const stop of sortStops(stops)) gradient.addColorStop(clamp(stop.position / 100, 0, 1), stop.colour);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  } else if (mode === "corners") {
    const tl = hexToRgb(corners.topLeft);
    const tr = hexToRgb(corners.topRight);
    const bl = hexToRgb(corners.bottomLeft);
    const br = hexToRgb(corners.bottomRight);
    if (!tl || !tr || !bl || !br) return;
    const image = ctx.createImageData(width, height);
    const data = image.data;
    for (let y = 0; y < height; y += 1) {
      const v = height === 1 ? 0 : y / (height - 1);
      for (let x = 0; x < width; x += 1) {
        const u = width === 1 ? 0 : x / (width - 1);
        const pixel = lerp(lerp(tl, tr, u), lerp(bl, br, u), v);
        const index = (y * width + x) * 4;
        data[index] = Math.round(pixel[0]);
        data[index + 1] = Math.round(pixel[1]);
        data[index + 2] = Math.round(pixel[2]);
        data[index + 3] = 255;
      }
    }
    ctx.putImageData(image, 0, 0);
  } else {
    const weighted = points
      .map((point) => ({ x: point.x, y: point.y, rgb: hexToRgb(point.colour) }))
      .filter((point): point is { x: number; y: number; rgb: Triple } => point.rgb !== null);
    if (!weighted.length) return;
    const image = ctx.createImageData(width, height);
    const data = image.data;
    for (let y = 0; y < height; y += 1) {
      const v = height === 1 ? 0 : y / (height - 1);
      for (let x = 0; x < width; x += 1) {
        const u = width === 1 ? 0 : x / (width - 1);
        let weightSum = 0;
        let r = 0;
        let g = 0;
        let b = 0;
        for (const point of weighted) {
          const dx = u - point.x;
          const dy = v - point.y;
          const weight = 1 / (dx * dx + dy * dy + 0.01);
          weightSum += weight;
          r += point.rgb[0] * weight;
          g += point.rgb[1] * weight;
          b += point.rgb[2] * weight;
        }
        const index = (y * width + x) * 4;
        data[index] = Math.round(r / weightSum);
        data[index + 1] = Math.round(g / weightSum);
        data[index + 2] = Math.round(b / weightSum);
        data[index + 3] = 255;
      }
    }
    ctx.putImageData(image, 0, 0);
  }

  if (noise <= 0) return;
  const image = ctx.getImageData(0, 0, width, height);
  const data = image.data;
  const intensity = noise / 100;
  for (let i = 0; i < data.length; i += 4) {
    const grain = (Math.random() - 0.5) * 2 * intensity * 50;
    data[i] = clamp((data[i] ?? 0) + grain, 0, 255);
    data[i + 1] = clamp((data[i + 1] ?? 0) + grain, 0, 255);
    data[i + 2] = clamp((data[i + 2] ?? 0) + grain, 0, 255);
  }
  ctx.putImageData(image, 0, 0);
}

export function GradientTool() {
  const [mode, setMode] = useState<Mode>("linear");
  const [angle, setAngle] = useState(90);
  const [noise, setNoise] = useState(0);
  const [stops, setStops] = useState<Stop[]>([
    { id: uid(), colour: "#3b82f6", position: 0 },
    { id: uid(), colour: "#8b5cf6", position: 100 },
  ]);
  const [corners, setCorners] = useState<Corners>({
    topLeft: "#3b82f6",
    topRight: "#8b5cf6",
    bottomLeft: "#10b981",
    bottomRight: "#f59e0b",
  });
  const [grid, setGrid] = useState<GridSize>(2);
  const [points, setPoints] = useState<MeshPoint[]>(() => meshPoints(2));
  const [exportWidth, setExportWidth] = useState(1920);
  const [exportHeight, setExportHeight] = useState(1080);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ id: string; moved: boolean; kind: "mesh" | "stop" | "dial" } | null>(null);
  const [activeStop, setActiveStop] = useState<string | null>(null);

  const css = gradientCss(mode, angle, stops, corners, points);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let width = 720;
    let height = Math.round(width * (exportHeight / exportWidth));
    if (height > 380) {
      height = 380;
      width = Math.max(180, Math.round(height * (exportWidth / exportHeight)));
    }
    renderGradient(canvas, width, height, mode, angle, noise, stops, corners, points);
  }, [mode, angle, noise, stops, corners, points, exportWidth, exportHeight]);

  const addStop = () => {
    const sorted = sortStops(stops);
    let gap = 0;
    let position = 50;
    for (let i = 0; i < sorted.length - 1; i += 1) {
      const size = (sorted[i + 1]?.position ?? 0) - (sorted[i]?.position ?? 0);
      if (size > gap) {
        gap = size;
        position = (sorted[i]?.position ?? 0) + size / 2;
      }
    }
    const stop = { id: uid(), colour: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`, position: Math.round(position) };
    setStops([...stops, stop]);
    setActiveStop(stop.id);
  };

  const blend = () => {
    const sorted = sortStops(stops);
    const next: Stop[] = [];
    for (let i = 0; i < sorted.length; i += 1) {
      const current = sorted[i];
      if (!current) continue;
      next.push(current);
      const following = sorted[i + 1];
      if (!following) continue;
      for (let step = 1; step <= 3; step += 1) {
        const t = step / 4;
        next.push({
          id: uid(),
          colour: lerpOklab(current.colour, following.colour, t),
          position: Math.round(current.position + (following.position - current.position) * t),
        });
      }
    }
    setStops(next);
  };

  const movePoint = (event: PointerEvent<HTMLButtonElement>, id: string) => {
    const stage = stageRef.current;
    if (!stage || dragRef.current?.id !== id || dragRef.current.kind !== "mesh") return;
    const rect = stage.getBoundingClientRect();
    dragRef.current.moved = true;
    const x = clamp((event.clientX - rect.left) / rect.width, 0, 1);
    const y = clamp((event.clientY - rect.top) / rect.height, 0, 1);
    setPoints((current) => current.map((point) => (point.id === id ? { ...point, x, y } : point)));
  };

  const moveStop = (event: PointerEvent<HTMLButtonElement>, id: string) => {
    const rail = railRef.current;
    if (!rail || dragRef.current?.id !== id || dragRef.current.kind !== "stop") return;
    const rect = rail.getBoundingClientRect();
    dragRef.current.moved = true;
    const position = Math.round(clamp((event.clientX - rect.left) / rect.width, 0, 1) * 100);
    setStops((current) => current.map((stop) => (stop.id === id ? { ...stop, position } : stop)));
  };

  const setDial = (event: PointerEvent<HTMLButtonElement>) => {
    if (dragRef.current?.kind !== "dial") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    let next = Math.round((Math.atan2(x, -y) * 180) / Math.PI);
    if (next < 0) next += 360;
    setAngle(next);
  };

  const download = () => {
    const canvas = document.createElement("canvas");
    renderGradient(canvas, exportWidth, exportHeight, mode, angle, noise, stops, corners, points);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `gradient-${Date.now()}.png`;
      link.click();
      URL.revokeObjectURL(url);
    });
  };

  const copy = async () => {
    await navigator.clipboard.writeText(css);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  const selected = stops.find((stop) => stop.id === activeStop) ?? null;
  const linearBar = `linear-gradient(90deg, ${sortStops(stops)
    .map((stop) => `${stop.colour} ${stop.position}%`)
    .join(", ")})`;

  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-hidden rounded-panel border border-line bg-surface">
        <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2">
          <div className="inline-flex rounded-panel border border-line" role="group" aria-label="Modo">
            {(
              [
                ["linear", "Linear"],
                ["corners", "Cantos"],
                ["mesh", "Malha"],
              ] as const
            ).map(([id, name]) => (
              <button
                key={id}
                type="button"
                aria-pressed={mode === id}
                onClick={() => setMode(id)}
                className={"min-h-11 px-3 text-sm " + (mode === id ? "bg-bg text-accent" : "text-muted hover:text-fg")}
              >
                {name}
              </button>
            ))}
          </div>
          {mode === "mesh" ? (
            <div className="inline-flex rounded-panel border border-line" role="group" aria-label="Grade">
              {([2, 3] as const).map((size) => (
                <button
                  key={size}
                  type="button"
                  aria-pressed={grid === size}
                  onClick={() => {
                    setGrid(size);
                    setPoints(meshPoints(size));
                  }}
                  className={"min-h-11 px-3 text-sm tabular-nums " + (grid === size ? "bg-bg text-accent" : "text-muted hover:text-fg")}
                >
                  {size}×{size}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-xs uppercase tracking-widest text-muted">
              {exportWidth}×{exportHeight}
            </p>
          )}
        </div>

        <div ref={stageRef} className="relative mx-3 mb-3 overflow-hidden rounded-panel border border-line bg-bg">
          <canvas ref={canvasRef} aria-label="Prévia do gradiente" className="block h-auto max-h-[380px] w-full" />
          {mode === "mesh"
            ? points.map((point) => (
                <button
                  key={point.id}
                  type="button"
                  aria-label="Ponto da malha"
                  onPointerDown={(event) => {
                    event.currentTarget.setPointerCapture(event.pointerId);
                    dragRef.current = { id: point.id, moved: false, kind: "mesh" };
                  }}
                  onPointerMove={(event) => movePoint(event, point.id)}
                  onPointerUp={(event) => {
                    const moved = dragRef.current?.id === point.id && dragRef.current.moved;
                    dragRef.current = null;
                    if (!moved) event.currentTarget.querySelector("input")?.click();
                  }}
                  className="absolute size-11 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${point.x * 100}%`, top: `${point.y * 100}%` }}
                >
                  <span className="mx-auto block size-5 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.45)]" style={{ background: point.colour }} />
                  <input
                    type="color"
                    value={point.colour}
                    aria-label="Cor do ponto"
                    onChange={(event) => setPoints((current) => current.map((item) => (item.id === point.id ? { ...item, colour: event.target.value } : item)))}
                    className="sr-only"
                  />
                </button>
              ))
            : null}
          {mode === "corners"
            ? (
                [
                  ["topLeft", "12%", "16%", "Superior esquerdo"],
                  ["topRight", "88%", "16%", "Superior direito"],
                  ["bottomLeft", "12%", "84%", "Inferior esquerdo"],
                  ["bottomRight", "88%", "84%", "Inferior direito"],
                ] as const
              ).map(([key, x, y, name]) => (
                <label key={key} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: x, top: y }}>
                  <input
                    type="color"
                    value={corners[key]}
                    aria-label={name}
                    onChange={(event) => setCorners({ ...corners, [key]: event.target.value })}
                    className="swatch-dot size-11 cursor-pointer border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.45)]"
                  />
                </label>
              ))
            : null}
        </div>
      </div>

      {mode === "linear" ? (
        <div className="rounded-panel border border-line bg-surface px-3 py-3">
          <div ref={railRef} className="relative mx-5 h-11">
            <div className="absolute inset-x-0 top-1/2 h-2.5 -translate-y-1/2 rounded-full border border-black/20" style={{ background: linearBar }} />
            {stops.map((stop) => (
              <button
                key={stop.id}
                type="button"
                aria-label={`Parada ${stop.position}%`}
                aria-pressed={activeStop === stop.id}
                onPointerDown={(event) => {
                  event.currentTarget.setPointerCapture(event.pointerId);
                  dragRef.current = { id: stop.id, moved: false, kind: "stop" };
                  setActiveStop(stop.id);
                }}
                onPointerMove={(event) => moveStop(event, stop.id)}
                onPointerUp={(event) => {
                  const moved = dragRef.current?.id === stop.id && dragRef.current.moved;
                  dragRef.current = null;
                  if (!moved) event.currentTarget.querySelector("input")?.click();
                }}
                className="absolute top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                style={{ left: `${stop.position}%` }}
              >
                <span
                  className={"block size-5 rounded-full border-2 shadow-[0_0_0_1px_rgba(0,0,0,0.45)] " + (activeStop === stop.id ? "border-accent" : "border-white")}
                  style={{ background: stop.colour }}
                />
                <input
                  type="color"
                  value={stop.colour}
                  aria-label="Cor da parada"
                  onChange={(event) => setStops((current) => current.map((item) => (item.id === stop.id ? { ...item, colour: event.target.value } : item)))}
                  className="sr-only"
                />
              </button>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <button type="button" onClick={addStop} className="min-h-11 rounded-panel border border-line px-3 text-xs uppercase tracking-widest text-muted hover:text-fg">
              Parada
            </button>
            <button type="button" onClick={blend} className="min-h-11 rounded-panel border border-line px-3 text-xs uppercase tracking-widest text-muted hover:text-fg">
              Mistura
            </button>
            <button
              type="button"
              disabled={!selected || stops.length <= 2}
              onClick={() => {
                if (!selected) return;
                setStops((current) => current.filter((item) => item.id !== selected.id));
                setActiveStop(null);
              }}
              className="min-h-11 rounded-panel border border-line px-3 text-xs uppercase tracking-widest text-muted hover:text-fg disabled:opacity-40"
            >
              Tirar
            </button>
            {selected ? <span className="font-mono text-xs text-muted">{selected.colour} · {selected.position}%</span> : <span className="text-xs text-muted">Arrasta a parada. Clica pra mudar a cor.</span>}
          </div>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-3 rounded-panel border border-line bg-surface px-3 py-2">
        {mode === "linear" ? (
          <button
            type="button"
            aria-label={`Ângulo ${angle} graus`}
            onPointerDown={(event) => {
              event.currentTarget.setPointerCapture(event.pointerId);
              dragRef.current = { id: "dial", moved: true, kind: "dial" };
              setDial(event);
            }}
            onPointerMove={setDial}
            onPointerUp={() => {
              dragRef.current = null;
            }}
            className="relative size-14 shrink-0 rounded-full border border-line bg-bg"
          >
            <span className="pointer-events-none absolute inset-0" style={{ transform: `rotate(${angle}deg)` }}>
              <span className="absolute left-1/2 top-2 h-4 w-px -translate-x-1/2 bg-accent" />
            </span>
            <span className="pointer-events-none absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
            <span className="absolute inset-x-0 bottom-1 text-center text-[10px] tabular-nums text-muted">{angle}°</span>
          </button>
        ) : null}
        <label className="flex min-w-40 flex-1 items-center gap-3">
          <span className="text-xs uppercase tracking-widest text-muted">Ruído {noise}</span>
          <input type="range" min={0} max={100} value={noise} aria-label="Ruído" onChange={(event) => setNoise(Number(event.target.value))} />
        </label>
        <div className="flex flex-wrap gap-1">
          {SIZES.map((size) => (
            <button
              key={size.label}
              type="button"
              aria-pressed={exportWidth === size.w && exportHeight === size.h}
              onClick={() => {
                setExportWidth(size.w);
                setExportHeight(size.h);
              }}
              className={
                "min-h-11 rounded-panel border px-3 text-xs uppercase tracking-widest " +
                (exportWidth === size.w && exportHeight === size.h ? "border-accent text-accent" : "border-line text-muted hover:text-fg")
              }
            >
              {size.label}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-1 text-xs uppercase tracking-widest text-muted">
          <span className="sr-only">Largura</span>
          <input
            type="number"
            min={100}
            max={4096}
            value={exportWidth}
            aria-label="Largura"
            onChange={(event) => setExportWidth(clamp(Number(event.target.value) || 100, 100, 4096))}
            className="h-11 w-16 rounded-panel border border-line bg-bg px-2 text-sm tabular-nums text-fg"
          />
          ×
          <span className="sr-only">Altura</span>
          <input
            type="number"
            min={100}
            max={4096}
            value={exportHeight}
            aria-label="Altura"
            onChange={(event) => setExportHeight(clamp(Number(event.target.value) || 100, 100, 4096))}
            className="h-11 w-16 rounded-panel border border-line bg-bg px-2 text-sm tabular-nums text-fg"
          />
        </label>
        <button type="button" onClick={() => void copy()} className="inline-flex min-h-11 items-center gap-2 rounded-panel border border-line px-3 text-xs uppercase tracking-widest text-muted hover:text-fg">
          {copied ? <Check className="size-4 text-accent" /> : <Copy className="size-4" />}
          {copied ? "Copiado" : "CSS"}
        </button>
        <button type="button" onClick={download} className="inline-flex min-h-11 items-center gap-2 rounded-panel bg-accent px-3 text-sm font-medium text-accent-ink">
          <Download className="size-4" />
          PNG
        </button>
      </div>
    </div>
  );
}
