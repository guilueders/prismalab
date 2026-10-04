import { useEffect, useRef, useState } from "react";
import type { Options } from "qr-code-styling";
import type QRCodeStyling from "qr-code-styling";
import Check from "lucide-react/dist/esm/icons/check.js";
import Copy from "lucide-react/dist/esm/icons/copy.js";
import Download from "lucide-react/dist/esm/icons/download.js";

type Mode = "single" | "wifi" | "vcard" | "batch";
type DotType = "square" | "rounded" | "dots" | "classy" | "classy-rounded" | "extra-rounded";
type CornerSquareType = "square" | "dot" | "extra-rounded";
type CornerDotType = "square" | "dot";
type ErrorLevel = "L" | "M" | "Q" | "H";
type SecurityType = "nopass" | "WPA" | "WEP";

type VCardData = {
  firstName: string;
  lastName: string;
  organization: string;
  title: string;
  email: string;
  phone: string;
  website: string;
  address: string;
};

type WifiData = {
  ssid: string;
  password: string;
  securityType: SecurityType;
  isHidden: boolean;
};

const EMPTY_CARD: VCardData = {
  firstName: "",
  lastName: "",
  organization: "",
  title: "",
  email: "",
  phone: "",
  website: "",
  address: "",
};

const DOTS: { value: DotType; label: string }[] = [
  { value: "square", label: "Quadrado" },
  { value: "rounded", label: "Redondo" },
  { value: "dots", label: "Pontos" },
  { value: "classy", label: "Caligráfico" },
  { value: "classy-rounded", label: "Misto" },
  { value: "extra-rounded", label: "Bolha" },
];

const CORNER_SQUARES: { value: CornerSquareType; label: string }[] = [
  { value: "square", label: "Quadrado" },
  { value: "dot", label: "Círculo" },
  { value: "extra-rounded", label: "Arredondado" },
];

const CORNER_DOTS: { value: CornerDotType; label: string }[] = [
  { value: "square", label: "Quadrado" },
  { value: "dot", label: "Círculo" },
];

const LEVELS: { value: ErrorLevel; label: string }[] = [
  { value: "L", label: "Baixa" },
  { value: "M", label: "Média" },
  { value: "Q", label: "Alta" },
  { value: "H", label: "Máxima" },
];

const PRESETS = [
  { label: "URL", value: "https://example.com" },
  { label: "E-mail", value: "mailto:hello@example.com" },
  { label: "Telefone", value: "tel:+5511999999999" },
  { label: "Wi-Fi", value: "WIFI:T:WPA;S:NetworkName;P:password;;" },
  { label: "SMS", value: "sms:+5511999999999?body=Oi" },
  { label: "Local", value: "geo:-27.157,-48.596" },
];

const QUICK = [
  { label: "Clássico", dot: "square" as DotType, square: "square" as CornerSquareType, corner: "square" as CornerDotType, fg: "#000000", bg: "#ffffff" },
  { label: "Redondo", dot: "rounded" as DotType, square: "extra-rounded" as CornerSquareType, corner: "dot" as CornerDotType, fg: "#000000", bg: "#ffffff" },
  { label: "Pontos", dot: "dots" as DotType, square: "dot" as CornerSquareType, corner: "dot" as CornerDotType, fg: "#000000", bg: "#ffffff" },
  { label: "Elegante", dot: "classy-rounded" as DotType, square: "extra-rounded" as CornerSquareType, corner: "dot" as CornerDotType, fg: "#000000", bg: "#ffffff" },
  { label: "Índigo", dot: "rounded" as DotType, square: "extra-rounded" as CornerSquareType, corner: "dot" as CornerDotType, fg: "#6366f1", bg: "#ffffff" },
  { label: "Rosa", dot: "extra-rounded" as DotType, square: "extra-rounded" as CornerSquareType, corner: "dot" as CornerDotType, fg: "#e11d48", bg: "#ffffff" },
  { label: "Verde", dot: "classy" as DotType, square: "square" as CornerSquareType, corner: "square" as CornerDotType, fg: "#0d9488", bg: "#ffffff" },
  { label: "Âmbar", dot: "rounded" as DotType, square: "extra-rounded" as CornerSquareType, corner: "dot" as CornerDotType, fg: "#d97706", bg: "#ffffff" },
  { label: "Violeta", dot: "classy-rounded" as DotType, square: "extra-rounded" as CornerSquareType, corner: "dot" as CornerDotType, fg: "#7c3aed", bg: "#ffffff" },
];

const field = "min-h-11 w-full rounded-panel border border-line bg-bg px-3 text-sm text-fg";
const label = "flex flex-col gap-2 text-xs uppercase tracking-widest text-muted";

export function sealSvgSeams(svg: string, strokeWidth = 0.5): string {
  const doc = new DOMParser().parseFromString(svg, "image/svg+xml");
  if (doc.querySelector("parsererror")) return svg;
  for (const el of doc.querySelectorAll("[fill]")) {
    const fill = el.getAttribute("fill");
    if (!fill || fill === "none" || el.hasAttribute("stroke")) continue;
    el.setAttribute("stroke", fill);
    el.setAttribute("stroke-width", String(strokeWidth));
  }
  return new XMLSerializer().serializeToString(doc);
}

function escapeWifi(value: string) {
  return value.replace(/[\\;,":]/g, "\\$&");
}

export function vcardString(data: VCardData): string {
  const lines = ["BEGIN:VCARD", "VERSION:3.0"];
  if (data.firstName || data.lastName) {
    lines.push(`N:${data.lastName};${data.firstName};;;`);
    lines.push(`FN:${`${data.firstName} ${data.lastName}`.trim()}`);
  }
  if (data.organization) lines.push(`ORG:${data.organization}`);
  if (data.title) lines.push(`TITLE:${data.title}`);
  if (data.email) lines.push(`EMAIL:${data.email}`);
  if (data.phone) lines.push(`TEL:${data.phone}`);
  if (data.website) lines.push(`URL:${data.website}`);
  if (data.address) lines.push(`ADR:;;${data.address};;;;`);
  lines.push("END:VCARD");
  return lines.join("\n");
}

export function wifiString(data: WifiData): string {
  if (!data.ssid.trim()) return "";
  if (data.securityType !== "nopass" && !data.password) return "";
  let out = `WIFI:T:${data.securityType};S:${escapeWifi(data.ssid)}`;
  if (data.securityType !== "nopass") out += `;P:${escapeWifi(data.password)}`;
  if (data.isHidden) out += ";H:true";
  return `${out};;`;
}

function downloadBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.click();
  URL.revokeObjectURL(url);
}

function blobToDataUrl(blob: Blob) {
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(String(reader.result));
    reader.readAsDataURL(blob);
  });
}

export function QrTool() {
  const [mode, setMode] = useState<Mode>("single");
  const [content, setContent] = useState("https://example.com");
  const [card, setCard] = useState<VCardData>(EMPTY_CARD);
  const [wifi, setWifi] = useState<WifiData>({ ssid: "", password: "", securityType: "WPA", isHidden: false });
  const [showPassword, setShowPassword] = useState(false);
  const [batch, setBatch] = useState("");
  const [size, setSize] = useState(300);
  const [margin, setMargin] = useState(8);
  const [foreground, setForeground] = useState("#000000");
  const [background, setBackground] = useState("#ffffff");
  const [transparent, setTransparent] = useState(false);
  const [dotType, setDotType] = useState<DotType>("square");
  const [cornerSquare, setCornerSquare] = useState<CornerSquareType>("square");
  const [cornerDot, setCornerDot] = useState<CornerDotType>("square");
  const [level, setLevel] = useState<ErrorLevel>("M");
  const [logo, setLogo] = useState<string | null>(null);
  const [logoSize, setLogoSize] = useState(0.3);
  const [logoMargin, setLogoMargin] = useState(4);
  const [image, setImage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [zipping, setZipping] = useState(false);
  const qrRef = useRef<QRCodeStyling | null>(null);

  const lines = batch
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const cardReady = Object.values(card).some((value) => value.trim());
  const payload =
    mode === "wifi"
      ? wifiString(wifi)
      : mode === "vcard"
        ? cardReady
          ? vcardString(card)
          : ""
        : mode === "batch"
          ? (lines[0] ?? "")
          : content;

  const style = (): Options => {
    const options: Options = {
      width: size,
      height: size,
      type: "svg",
      data: payload,
      margin,
      qrOptions: { errorCorrectionLevel: level },
      dotsOptions: { type: dotType, color: foreground },
      cornersSquareOptions: { type: cornerSquare, color: foreground },
      cornersDotOptions: { type: cornerDot, color: foreground },
      backgroundOptions: { color: transparent ? "transparent" : background },
    };
    if (logo) {
      options.image = logo;
      options.imageOptions = { crossOrigin: "anonymous", margin: logoMargin, imageSize: logoSize, hideBackgroundDots: true };
    }
    return options;
  };

  useEffect(() => {
    if (!payload.trim()) {
      qrRef.current = null;
      setImage(null);
      setFailed(false);
      setBusy(false);
      return;
    }
    let cancel = false;
    const timer = window.setTimeout(() => {
      void (async () => {
        setBusy(true);
        try {
          const { default: Styling } = await import("qr-code-styling");
          const qr = new Styling(style());
          const blob = await qr.getRawData("png");
          if (cancel) return;
          qrRef.current = qr;
          setFailed(!(blob instanceof Blob));
          setImage(blob instanceof Blob ? await blobToDataUrl(blob) : null);
        } catch {
          if (!cancel) {
            qrRef.current = null;
            setImage(null);
            setFailed(true);
          }
        } finally {
          if (!cancel) setBusy(false);
        }
      })();
    }, 300);
    return () => {
      cancel = true;
      window.clearTimeout(timer);
    };
  }, [payload, size, margin, foreground, background, transparent, dotType, cornerSquare, cornerDot, level, logo, logoSize, logoMargin]);

  const download = async (format: "png" | "svg") => {
    const qr = qrRef.current;
    if (!qr) return;
    const raw = await qr.getRawData(format);
    if (raw === null) return;
    const stamp = Date.now();
    if (format === "svg") {
      const svg = raw instanceof Blob ? await raw.text() : String(raw);
      downloadBlob(new Blob([sealSvgSeams(svg)], { type: "image/svg+xml" }), `qr-code-${stamp}.svg`);
      return;
    }
    const file = raw instanceof Blob ? raw : new Blob([raw as unknown as BlobPart], { type: "image/png" });
    downloadBlob(file, `qr-code-${stamp}.png`);
  };

  const copy = async () => {
    if (!image) return;
    try {
      const blob = await (await fetch(image)).blob();
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const downloadZip = async () => {
    if (!lines.length) return;
    setZipping(true);
    try {
      const [{ default: Styling }, { default: JSZip }] = await Promise.all([import("qr-code-styling"), import("jszip")]);
      const zip = new JSZip();
      for (const line of lines) {
        const qr = new Styling({ ...style(), data: line });
        const blob = await qr.getRawData("png");
        if (!(blob instanceof Blob)) continue;
        const safe = line.slice(0, 30).replace(/[^a-zA-Z0-9]/g, "_") || "qr";
        zip.file(`qr-${safe}.png`, blob);
      }
      downloadBlob(await zip.generateAsync({ type: "blob" }), `qr-codes-${Date.now()}.zip`);
    } finally {
      setZipping(false);
    }
  };

  const readLogo = (file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setLogo(String(reader.result));
    reader.readAsDataURL(file);
  };

  const empty =
    mode === "wifi"
      ? wifi.ssid.trim() && wifi.securityType !== "nopass" && !wifi.password
        ? "Coloca a senha pra gerar o código."
        : "Preenche a rede pra gerar o código."
      : mode === "vcard"
        ? "Preenche o contato pra gerar o código."
        : mode === "batch"
          ? "Uma linha por código."
          : "Escreve um texto ou uma URL.";

  return (
    <div className="flex flex-col gap-4">
      <div className="inline-flex flex-wrap rounded-panel border border-line" role="group" aria-label="Modo">
        {(
          [
            ["single", "Texto"],
            ["wifi", "Wi-Fi"],
            ["vcard", "Contato"],
            ["batch", "Lote"],
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

      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="flex flex-col gap-3">
          {mode === "single" ? (
            <>
              <label className={label}>
                Conteúdo
                <textarea
                  value={content}
                  aria-label="Conteúdo"
                  onChange={(event) => setContent(event.target.value)}
                  placeholder="URL, texto ou dado"
                  className={field + " min-h-24 py-3"}
                />
              </label>
              <div className="flex flex-wrap gap-1">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setContent(preset.value)}
                    className="min-h-11 rounded-panel border border-line px-3 text-xs uppercase tracking-widest text-muted hover:text-fg"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </>
          ) : null}

          {mode === "wifi" ? (
            <div className="grid gap-3 sm:grid-cols-2">
              <label className={label + " sm:col-span-2"}>
                Nome da rede
                <input value={wifi.ssid} aria-label="Nome da rede" onChange={(event) => setWifi({ ...wifi, ssid: event.target.value })} className={field} />
              </label>
              <label className={label}>
                Segurança
                <select
                  value={wifi.securityType}
                  aria-label="Segurança"
                  onChange={(event) => setWifi({ ...wifi, securityType: event.target.value as SecurityType })}
                  className={field}
                >
                  <option value="nopass">Sem senha</option>
                  <option value="WPA">WPA/WPA2</option>
                  <option value="WEP">WEP</option>
                </select>
              </label>
              <label className={label}>
                Senha
                <span className="flex gap-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={wifi.securityType === "nopass" ? "" : wifi.password}
                    disabled={wifi.securityType === "nopass"}
                    aria-label="Senha da rede"
                    placeholder={wifi.securityType === "nopass" ? "Rede aberta" : "Senha da rede"}
                    onChange={(event) => setWifi({ ...wifi, password: event.target.value })}
                    className={field + " disabled:opacity-40"}
                  />
                  <button
                    type="button"
                    aria-pressed={showPassword}
                    disabled={wifi.securityType === "nopass"}
                    onClick={() => setShowPassword((value) => !value)}
                    className="min-h-11 rounded-panel border border-line px-3 text-xs uppercase tracking-widest text-muted hover:text-fg disabled:opacity-40"
                  >
                    {showPassword ? "Ocultar" : "Ver"}
                  </button>
                </span>
              </label>
              <label className="flex min-h-11 items-center justify-between gap-3 rounded-panel border border-line px-3 sm:col-span-2">
                <span className="text-sm text-fg">Rede oculta</span>
                <input type="checkbox" checked={wifi.isHidden} onChange={(event) => setWifi({ ...wifi, isHidden: event.target.checked })} className="size-5 accent-accent" />
              </label>
            </div>
          ) : null}

          {mode === "vcard" ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {(
                [
                  ["firstName", "Nome"],
                  ["lastName", "Sobrenome"],
                  ["organization", "Organização"],
                  ["title", "Cargo"],
                  ["email", "E-mail"],
                  ["phone", "Telefone"],
                  ["website", "Site"],
                  ["address", "Endereço"],
                ] as const
              ).map(([key, name]) => (
                <label key={key} className={label}>
                  {name}
                  <input
                    value={card[key]}
                    aria-label={name}
                    onChange={(event) => setCard({ ...card, [key]: event.target.value })}
                    className={field}
                  />
                </label>
              ))}
            </div>
          ) : null}

          {mode === "batch" ? (
            <label className={label}>
              Uma linha por código
              <textarea
                value={batch}
                aria-label="Lista do lote"
                onChange={(event) => setBatch(event.target.value)}
                placeholder={"https://um.com\nhttps://dois.com"}
                className={field + " min-h-36 py-3"}
              />
            </label>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 rounded-panel border border-line bg-bg/40 p-3">
          <div className="flex aspect-square items-center justify-center overflow-hidden rounded-panel bg-white">
            {image ? <img src={image} alt="Código QR" className="h-full w-full object-contain" /> : <p className="px-4 text-center text-sm text-black/60">{failed ? "Esse conteúdo não cabe num QR." : empty}</p>}
          </div>
          <div className="flex flex-wrap gap-1">
            <button type="button" disabled={!image} onClick={() => void download("png")} className="inline-flex min-h-11 items-center gap-2 rounded-panel bg-accent px-3 text-sm font-medium text-accent-ink disabled:opacity-40">
              <Download className="size-4" />
              PNG
            </button>
            <button type="button" disabled={!image} onClick={() => void download("svg")} className="inline-flex min-h-11 items-center gap-2 rounded-panel border border-line px-3 text-xs uppercase tracking-widest text-muted hover:text-fg disabled:opacity-40">
              SVG
            </button>
            <button type="button" disabled={!image} onClick={() => void copy()} className="inline-flex min-h-11 items-center gap-2 rounded-panel border border-line px-3 text-xs uppercase tracking-widest text-muted hover:text-fg disabled:opacity-40">
              {copied ? <Check className="size-4 text-accent" /> : <Copy className="size-4" />}
              {copied ? "Copiado" : "Copiar"}
            </button>
          </div>
          {mode === "batch" ? (
            <button type="button" disabled={!lines.length || zipping} onClick={() => void downloadZip()} className="inline-flex min-h-11 items-center justify-center rounded-panel border border-line px-3 text-xs uppercase tracking-widest text-muted hover:text-fg disabled:opacity-40">
              {zipping ? "Gerando…" : `Baixar ZIP · ${lines.length}`}
            </button>
          ) : null}
          {busy ? <p className="text-xs uppercase tracking-widest text-muted">Gerando…</p> : null}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-xs uppercase tracking-widest text-muted">Estilo</p>
        <div className="flex flex-wrap gap-1">
          {QUICK.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                setDotType(item.dot);
                setCornerSquare(item.square);
                setCornerDot(item.corner);
                setForeground(item.fg);
                setBackground(item.bg);
                setTransparent(false);
              }}
              className="inline-flex min-h-11 items-center gap-2 rounded-panel border border-line px-3 text-sm text-muted hover:text-fg"
            >
              <span className="size-4 rounded-panel border border-line" style={{ background: item.fg }} />
              {item.label}
            </button>
          ))}
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <label className={label}>
            Módulos
            <select value={dotType} aria-label="Módulos" onChange={(event) => setDotType(event.target.value as DotType)} className={field}>
              {DOTS.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
          <label className={label}>
            Cantos
            <select value={cornerSquare} aria-label="Cantos" onChange={(event) => setCornerSquare(event.target.value as CornerSquareType)} className={field}>
              {CORNER_SQUARES.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
          <label className={label}>
            Centro do canto
            <select value={cornerDot} aria-label="Centro do canto" onChange={(event) => setCornerDot(event.target.value as CornerDotType)} className={field}>
              {CORNER_DOTS.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
          <label className={label}>
            Cor
            <span className="flex gap-2">
              <input type="color" value={foreground} aria-label="Cor do código" onChange={(event) => setForeground(event.target.value)} className="size-11 shrink-0 cursor-pointer rounded-panel border border-line bg-bg p-1" />
              <input value={foreground} aria-label="Cor do código em hex" onChange={(event) => setForeground(event.target.value)} className={field + " font-mono"} />
            </span>
          </label>
          <label className={label}>
            Fundo
            <span className="flex gap-2">
              <input type="color" value={background} disabled={transparent} aria-label="Cor de fundo" onChange={(event) => setBackground(event.target.value)} className="size-11 shrink-0 cursor-pointer rounded-panel border border-line bg-bg p-1 disabled:opacity-40" />
              <input value={background} disabled={transparent} aria-label="Fundo em hex" onChange={(event) => setBackground(event.target.value)} className={field + " font-mono disabled:opacity-40"} />
            </span>
          </label>
          <label className="flex min-h-11 items-center justify-between gap-3 rounded-panel border border-line px-3">
            <span className="text-sm text-fg">Fundo transparente</span>
            <input type="checkbox" checked={transparent} onChange={(event) => setTransparent(event.target.checked)} className="size-5 accent-accent" />
          </label>
          <div className={label + " sm:col-span-2 lg:col-span-3"}>
            Correção
            <div className="inline-flex flex-wrap rounded-panel border border-line" role="group" aria-label="Correção de erro">
              {LEVELS.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  aria-pressed={level === item.value}
                  onClick={() => setLevel(item.value)}
                  className={"min-h-11 px-3 text-sm " + (level === item.value ? "bg-bg text-accent" : "text-muted hover:text-fg")}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <label className="flex min-h-11 items-center gap-3 rounded-panel border border-line px-3 sm:col-span-2">
            <span className="text-sm text-muted">Margem</span>
            <input type="range" min={0} max={32} value={margin} aria-label="Margem" onChange={(event) => setMargin(Number(event.target.value))} className="min-w-0 flex-1" />
            <span className="w-8 text-right text-sm tabular-nums">{margin}</span>
          </label>
          <label className="flex min-h-11 items-center gap-3 rounded-panel border border-line px-3">
            <span className="text-sm text-muted">Tamanho</span>
            <input type="range" min={160} max={640} step={20} value={size} aria-label="Tamanho" onChange={(event) => setSize(Number(event.target.value))} className="min-w-0 flex-1" />
            <span className="w-10 text-right text-sm tabular-nums">{size}</span>
          </label>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <label className="inline-flex min-h-11 cursor-pointer items-center rounded-panel border border-line px-3 text-xs uppercase tracking-widest text-muted hover:text-fg">
            Logo
            <input type="file" accept="image/*" className="sr-only" onChange={(event) => readLogo(event.target.files?.[0])} />
          </label>
          {logo ? (
            <>
              <button type="button" onClick={() => setLogo(null)} className="min-h-11 rounded-panel border border-line px-3 text-xs uppercase tracking-widest text-muted hover:text-fg">
                Tirar logo
              </button>
              <label className="flex min-h-11 min-w-48 flex-1 items-center gap-3 rounded-panel border border-line px-3">
                <span className="text-sm text-muted">Logo</span>
                <input type="range" min={0.15} max={0.4} step={0.01} value={logoSize} aria-label="Tamanho da logo" onChange={(event) => setLogoSize(Number(event.target.value))} className="min-w-0 flex-1" />
              </label>
            </>
          ) : (
            <p className="text-sm text-muted">Um logo no centro pede correção alta.</p>
          )}
        </div>
      </div>
    </div>
  );
}
