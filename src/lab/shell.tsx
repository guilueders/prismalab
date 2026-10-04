import { lazy, Suspense, useEffect, useRef, useState } from "react";
import Moon from "lucide-react/dist/esm/icons/moon.js";
import Sun from "lucide-react/dist/esm/icons/sun.js";
import { EXPERIMENTS, findExperiment, type ExperimentId } from "@/lab/catalog";
import { FieldCanvas } from "@/lab/field";
import { LabProvider, useLab } from "@/lab/state";

const loadMixer = () => import("@/lab/mixer").then((mod) => ({ default: mod.Mixer }));
const loadShades = () => import("@/lab/shades").then((mod) => ({ default: mod.Shades }));
const loadCollection = () => import("@/lab/collection").then((mod) => ({ default: mod.Collection }));
const loadPasswords = () => import("@/lab/passwords").then((mod) => ({ default: mod.Passwords }));
const loadQr = () => import("@/lab/qr").then((mod) => ({ default: mod.QrTool }));
const loadGradient = () => import("@/lab/gradient").then((mod) => ({ default: mod.GradientTool }));
const loadRaios = () => import("@/lab/experiments").then((mod) => ({ default: mod.Raios }));
const loadAscii = () => import("@/lab/experiments").then((mod) => ({ default: mod.AsciiPrism }));
const loadPaleta = () => import("@/lab/experiments").then((mod) => ({ default: mod.Paleta }));
const loadGrade = () => import("@/lab/experiments").then((mod) => ({ default: mod.Grade }));
const loadSobre = () => import("@/lab/experiments").then((mod) => ({ default: mod.Sobre }));

const Mixer = lazy(loadMixer);
const Shades = lazy(loadShades);
const Collection = lazy(loadCollection);
const Passwords = lazy(loadPasswords);
const QrTool = lazy(loadQr);
const GradientTool = lazy(loadGradient);
const Raios = lazy(loadRaios);
const AsciiPrism = lazy(loadAscii);
const Paleta = lazy(loadPaleta);
const Grade = lazy(loadGrade);
const Sobre = lazy(loadSobre);

const LOAD: Record<ExperimentId, () => Promise<unknown>> = {
  mixer: loadMixer,
  shades: loadShades,
  collection: loadCollection,
  passwords: loadPasswords,
  qr: loadQr,
  gradient: loadGradient,
  raios: loadRaios,
  ascii: loadAscii,
  paleta: loadPaleta,
  grade: loadGrade,
  sobre: loadSobre,
};

const warmed = new Set<string>();

function warm(id: ExperimentId) {
  const key = id === "raios" || id === "ascii" || id === "paleta" || id === "grade" || id === "sobre" ? "studio" : id;
  if (warmed.has(key)) return;
  warmed.add(key);
  void LOAD[id]();
}

function allowIdleWarm() {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  if (!connection) return true;
  if (connection.saveData) return false;
  return connection.effectiveType !== "2g" && connection.effectiveType !== "slow-2g";
}

const BOOT = "> ACESSANDO PRISMA... CONEXÃO ESTABELECIDA";

function useClock() {
  const [value, setValue] = useState("––:––:––");
  useEffect(() => {
    const tick = () => {
      setValue(
        new Date().toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "America/Sao_Paulo",
        }),
      );
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return value;
}

function Wordmark() {
  const [{ x, y }, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let frame = 0;
    const onMove = (event: PointerEvent) => {
      const node = document.getElementById("prisma-word");
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = event.clientX - cx;
      const dy = event.clientY - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const reach = 280;
      if (dist > reach) {
        setOffset({ x: 0, y: 0 });
        return;
      }
      const force = (1 - dist / reach) * 14;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setOffset({ x: -(dx / dist) * force, y: -(dy / dist) * force });
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <h1
      id="prisma-word"
      className="prism-title mx-auto max-w-full font-display text-5xl font-extrabold tracking-tight text-balance text-fg sm:text-7xl md:text-8xl"
      style={{ transform: `translate(${x}px, ${y}px)` }}
    >
      PRISMA
    </h1>
  );
}

function Mark() {
  return (
    <svg viewBox="0 0 32 32" className="size-5 text-fg" aria-hidden="true">
      <path d="M16 4 L28 27 H4 Z" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M16 11 L23 25 H9 Z" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
    </svg>
  );
}

const MATRIX = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789";

function MatrixLine({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.textContent = text;
      return;
    }

    const chars = [...text];
    const spans = chars.map((char) => {
      const span = document.createElement("span");
      span.style.display = "inline-block";
      span.textContent = char === " " ? "\u00A0" : MATRIX[Math.floor(Math.random() * MATRIX.length)] ?? char;
      if (char !== " ") {
        span.style.color = "var(--color-accent)";
        span.style.textShadow = "0 0 10px var(--color-accent)";
      }
      return span;
    });
    el.replaceChildren(...spans);

    const intervals: number[] = [];
    const timeouts: number[] = [];
    spans.forEach((span, index) => {
      const char = chars[index] ?? "";
      if (char === " ") return;
      const scramble = window.setInterval(() => {
        span.textContent = MATRIX[Math.floor(Math.random() * MATRIX.length)] ?? char;
      }, 50);
      intervals.push(scramble);
      const lockDelay = (index * 0.06 + Math.random() * 0.4) * 1000;
      timeouts.push(
        window.setTimeout(() => {
          window.clearInterval(scramble);
          span.textContent = char;
          span.style.color = "";
          span.animate([{ textShadow: "0 0 16px var(--color-accent)" }, { textShadow: "0 0 0 transparent" }], {
            duration: 500,
            easing: "ease-out",
            fill: "forwards",
          });
        }, lockDelay),
      );
    });

    return () => {
      intervals.forEach((id) => window.clearInterval(id));
      timeouts.forEach((id) => window.clearTimeout(id));
    };
  }, [text]);

  return (
    <span ref={ref} aria-hidden="true">
      {text}
    </span>
  );
}

function TopBar() {
  const { theme, toggleTheme } = useLab();
  const clock = useClock();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md">
      <div className="mx-auto grid h-14 max-w-6xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4">
        <div className="flex items-center gap-2">
          <Mark />
          <span className="hidden text-xs uppercase tracking-widest text-muted md:inline">Prisma Lab</span>
        </div>
        <p aria-label={BOOT} className="truncate text-center text-[11px] uppercase text-muted sm:text-xs">
          <MatrixLine text={BOOT} />
        </p>
        <div className="flex items-center gap-3">
          <span className="hidden tabular-nums text-xs text-muted lg:inline">{clock}</span>
          <span className="hidden text-xs uppercase tracking-widest text-muted sm:inline">Brasil</span>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro"}
            className="inline-flex size-8 items-center justify-center rounded-panel border border-line text-fg hover:bg-surface"
          >
            {theme === "dark" ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
          </button>
        </div>
      </div>
    </header>
  );
}

function Tree({
  compact = false,
  expanded,
  onToggle,
}: {
  compact?: boolean;
  expanded: boolean;
  onToggle: () => void;
}) {
  const { section, open } = useLab();
  const [folderOpen, setFolderOpen] = useState(true);

  if (!expanded) {
    return (
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={false}
        className="flex min-h-11 w-full items-center gap-2 rounded-panel border border-line bg-surface/80 px-3 text-left text-sm text-muted backdrop-blur-md hover:text-fg"
      >
        <span className="w-4 text-accent" aria-hidden="true">
          +
        </span>
        Tools
      </button>
    );
  }

  if (compact) {
    return (
      <nav aria-label="Tools" className="flex gap-1 overflow-x-auto rounded-panel border border-line bg-surface/80 p-2 backdrop-blur-md">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={true}
          aria-label="Fechar menu"
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-panel text-accent hover:text-fg"
        >
          −
        </button>
        <button
          type="button"
          onClick={() => open(null)}
          className={"min-h-11 shrink-0 rounded-panel px-3 text-sm " + (section === null ? "bg-bg text-fg" : "text-muted")}
        >
          Início
        </button>
        {EXPERIMENTS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => open(item.id)}
            onPointerEnter={() => warm(item.id)}
            onFocus={() => warm(item.id)}
            className={"min-h-11 shrink-0 rounded-panel px-3 text-sm " + (section === item.id ? "bg-bg text-accent" : "text-muted")}
          >
            {item.name}
          </button>
        ))}
      </nav>
    );
  }

  return (
    <nav aria-label="Tools" className="rounded-panel border border-line bg-surface/80 p-3 backdrop-blur-md">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={true}
        className="flex min-h-11 w-full items-center gap-2 border-b border-line px-2 text-left text-xs font-medium uppercase tracking-widest text-muted hover:text-fg"
      >
        <span className="text-accent" aria-hidden="true">
          −
        </span>
        Prisma Studio
      </button>
      <div className="mt-2 flex flex-col">
        <button
          type="button"
          onClick={() => open(null)}
          className={
            "flex min-h-11 items-center gap-2 rounded-panel px-2 text-left text-sm " +
            (section === null ? "bg-bg text-fg" : "text-muted hover:text-fg")
          }
        >
          <span className={section === null ? "text-accent" : "text-muted"} aria-hidden="true">
            •
          </span>
          Início
        </button>
        <button
          type="button"
          onClick={() => setFolderOpen((value) => !value)}
          aria-expanded={folderOpen}
          className="flex min-h-11 items-center gap-2 rounded-panel px-2 text-left text-xs uppercase tracking-widest text-muted hover:text-fg"
        >
          <span className="w-4 text-accent" aria-hidden="true">
            {folderOpen ? "−" : "+"}
          </span>
          Tools ({EXPERIMENTS.length})
        </button>
        {folderOpen
          ? EXPERIMENTS.map((item) => {
              const active = section === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => open(item.id)}
                  onPointerEnter={() => warm(item.id)}
                  onFocus={() => warm(item.id)}
                  className={
                    "flex min-h-11 w-full items-center rounded-panel px-2 text-left text-xs whitespace-nowrap " +
                    (active ? "bg-bg text-fg" : "text-muted hover:text-fg")
                  }
                >
                  {item.name}
                </button>
              );
            })
          : null}
      </div>
    </nav>
  );
}

function ExperimentView({ id }: { id: ExperimentId }) {
  const { open } = useLab();
  const item = findExperiment(id);
  if (!item) return null;
  const mixer = id === "mixer";
  return (
    <section className={"rounded-panel border border-line bg-surface/85 backdrop-blur-md " + (mixer ? "p-3 md:p-4" : "p-4 md:p-6")}>
      <div className={"flex flex-wrap items-start justify-between gap-3 " + (mixer ? "mb-3" : "mb-5")}>
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-widest text-accent">{item.index}</p>
          <h2 className={"font-display font-extrabold tracking-tight text-balance " + (mixer ? "text-2xl md:text-3xl" : "text-3xl")}>
            {item.name}
          </h2>
          {mixer ? null : <p className="mt-1 text-sm text-muted">{item.blurb}</p>}
        </div>
        <button
          type="button"
          onClick={() => open(null)}
          className="min-h-11 rounded-panel border border-line px-3 text-xs uppercase tracking-widest text-muted hover:text-fg"
        >
          Fechar
        </button>
      </div>
      <Suspense fallback={<p className="py-6 text-sm text-muted">Carregando…</p>}>
        {id === "mixer" ? <Mixer /> : null}
        {id === "raios" ? <Raios /> : null}
        {id === "ascii" ? <AsciiPrism /> : null}
        {id === "paleta" ? <Paleta /> : null}
        {id === "grade" ? <Grade /> : null}
        {id === "shades" ? <Shades /> : null}
        {id === "collection" ? <Collection /> : null}
        {id === "passwords" ? <Passwords /> : null}
        {id === "qr" ? <QrTool /> : null}
        {id === "gradient" ? <GradientTool /> : null}
        {id === "sobre" ? <Sobre /> : null}
      </Suspense>
    </section>
  );
}

function HomeStage() {
  const { open } = useLab();
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-panel border border-line bg-surface/75 px-4 py-10 text-center backdrop-blur-md md:py-14">
        <Wordmark />
        <p className="mx-auto mt-6 max-w-xl text-xs uppercase leading-relaxed tracking-widest text-muted">
          Experimental Design Studio • Creative Technology Lab
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-pretty text-fg/80">
          Um campo espectral com ferramentas vivas. Abre uma ferramenta — o fundo reage junto.
        </p>
      </div>
      <div className="overflow-hidden rounded-panel border border-line bg-surface/80 backdrop-blur-md">
        <div className="border-b border-line px-4 py-3 text-xs uppercase tracking-widest text-muted">
          {"\u003e prisma --lab"}
        </div>
        <ul>
          {EXPERIMENTS.map((item) => (
            <li key={item.id} className="border-b border-line last:border-b-0">
              <button
                type="button"
                onClick={() => open(item.id)}
                onPointerEnter={() => warm(item.id)}
                onFocus={() => warm(item.id)}
                className="flex min-h-14 w-full items-center gap-3 px-4 text-left hover:bg-bg/60"
              >
                <span className="w-8 shrink-0 text-xs tabular-nums text-accent">{item.key}</span>
                <span className="min-w-0 flex-1 text-sm text-fg sm:w-56 sm:flex-none">{item.name}</span>
                <span className="hidden flex-1 text-sm text-muted sm:block">{item.blurb}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Foot() {
  return (
    <footer className="relative z-20 mt-10 overflow-x-hidden pb-12">
      <div className="relative flex items-center justify-center py-10">
        <p aria-hidden="true" className="prisma-outline select-none">
          PRISMA
        </p>
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="text-center text-[10px] uppercase leading-6 tracking-[0.18em] text-muted sm:text-xs">
            <p className="text-fg">Contact</p>
            <p>Studio: Prisma Lab</p>
            <p>Location: Brasil</p>
            <p>
              Status: <span className="text-accent">● Active</span>
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-col items-center gap-1 px-4 text-center text-[10px] uppercase tracking-[0.22em] text-muted sm:text-xs">
        <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <span>Prisma Lab © {new Date().getFullYear()}</span>
          <svg viewBox="0 0 32 32" className="size-3.5" aria-hidden="true">
            <path d="M16 4 L28 27 H4 Z" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          <span>Experimental Design Studio</span>
        </p>
        <p>{">"} End of transmission</p>
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-0.5 bg-accent" />
    </footer>
  );
}

function LabShell() {
  const { section, open } = useLab();
  const [menuOpen, setMenuOpen] = useState(true);

  useEffect(() => {
    if (!allowIdleWarm()) return;
    const id = window.requestIdleCallback(
      () => {
        warm("raios");
        warm("shades");
        warm("passwords");
      },
      { timeout: 2500 },
    );
    return () => window.cancelIdleCallback(id);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement
      ) {
        return;
      }
      if (event.key === "Escape") {
        open(null);
        return;
      }
      const match = EXPERIMENTS.find((item) => item.key === event.key);
      if (match) open(match.id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const mixer = section === "mixer";

  return (
    <div className="relative min-h-dvh text-fg">
      <FieldCanvas />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-10 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0 2px, var(--color-fg) 2px 3px)",
        }}
      />
      <TopBar />
      <main
        className={
          "relative z-20 mx-auto flex max-w-6xl flex-col gap-4 px-4 pb-8 pt-20 " +
          (mixer ? "" : "md:flex-row")
        }
      >
        <div
          className={
            mixer ? "" : "md:sticky md:top-20 md:shrink-0 md:self-start " + (menuOpen ? "md:w-64" : "md:w-44")
          }
        >
          <Tree compact={mixer} expanded={menuOpen} onToggle={() => setMenuOpen((value) => !value)} />
        </div>
        <div className="min-w-0 flex-1">{section ? <ExperimentView id={section} /> : <HomeStage />}</div>
      </main>
      <Foot />
    </div>
  );
}

export function LabApp() {
  return (
    <LabProvider>
      <LabShell />
    </LabProvider>
  );
}
