import { useMemo, useState } from "react";
import Check from "lucide-react/dist/esm/icons/check.js";
import Copy from "lucide-react/dist/esm/icons/copy.js";
import Search from "lucide-react/dist/esm/icons/search.js";
import { Genny } from "@/lab/genny";
import {
  COLLECTION_CATEGORIES,
  CURATED_PALETTES,
  type CuratedPalette,
  type PaletteCollectionCategory,
} from "@/lab/palette-data";

type Filter = PaletteCollectionCategory | "all";

const FILTERS: { key: Filter; label: string; description: string }[] = [
  { key: "all", label: "Todas", description: "" },
  { key: "classic", label: "Clássicas", description: "Combinações atemporais." },
  { key: "nature", label: "Natureza", description: "Inspiradas no mundo natural." },
  { key: "keycaps", label: "Keycaps", description: "Inspiradas em conjuntos de teclas." },
  { key: "vintage", label: "Vintage", description: "Retrô e nostálgicas." },
  { key: "modern", label: "Modernas", description: "Contemporâneas." },
  { key: "bold", label: "Intensas", description: "Vivas e chamativas." },
  { key: "soft", label: "Suaves", description: "Tons calmos." },
  { key: "monochrome", label: "Monocromáticas", description: "Um só matiz." },
  { key: "seasonal", label: "Estações", description: "As quatro estações." },
  { key: "artistic", label: "Artísticas", description: "Inspiradas em movimentos de arte." },
];

export function Collection() {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [opened, setOpened] = useState<CuratedPalette | null>(null);
  const byCategory = useMemo(() => {
    const groups = {} as Record<PaletteCollectionCategory, CuratedPalette[]>;
    for (const key of Object.keys(COLLECTION_CATEGORIES) as PaletteCollectionCategory[]) groups[key] = [];
    for (const palette of CURATED_PALETTES) groups[palette.category].push(palette);
    return groups;
  }, []);

  const visible = useMemo(() => {
    const pool = filter === "all" ? CURATED_PALETTES : byCategory[filter];
    const needle = query.trim().toLowerCase();
    if (!needle) return pool;
    return pool.filter(
      (palette) =>
        palette.name.toLowerCase().includes(needle) || palette.colors.some((color) => color.toLowerCase().includes(needle)),
    );
  }, [byCategory, filter, query]);

  const active = FILTERS.find((item) => item.key === filter) ?? FILTERS[0];
  const countLabel = query.trim()
    ? `${visible.length} ${visible.length === 1 ? "resultado" : "resultados"}`
    : `${CURATED_PALETTES.length} paletas`;

  const copy = async (value: string, key: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      window.setTimeout(() => setCopied((current) => (current === key ? null : current)), 1500);
    } catch {
      setCopied(null);
    }
  };

  if (opened) {
    return <Genny name={opened.name} colors={opened.colors} onBack={() => setOpened(null)} />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <label className="flex min-h-11 min-w-0 flex-1 items-center gap-2 rounded-panel border border-line bg-bg px-3 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent">
          <Search className="size-4 shrink-0 text-muted" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar paleta ou hex"
            aria-label="Buscar paletas"
            className="min-h-11 w-full bg-transparent text-sm text-fg outline-none"
          />
        </label>
        <p className="text-xs uppercase tracking-widest text-muted">{countLabel}</p>
      </div>
      <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-4" role="tablist" aria-label="Categorias">
        {FILTERS.map((item) => {
          const count = item.key === "all" ? CURATED_PALETTES.length : byCategory[item.key].length;
          const on = filter === item.key;
          return (
            <button
              key={item.key}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setFilter(item.key)}
              className={
                "flex min-h-11 items-center justify-between gap-2 rounded-panel border px-3 text-left text-sm " +
                (on ? "border-line bg-bg text-accent" : "border-transparent text-muted hover:border-line hover:text-fg")
              }
            >
              <span className="min-w-0">{item.label}</span>
              <span className="shrink-0 text-xs tabular-nums">{count}</span>
            </button>
          );
        })}
      </div>
      {filter !== "all" ? <p className="text-sm text-muted">{active.description}</p> : null}
      {visible.length ? (
        <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((palette) => (
            <li key={palette.id} className="relative overflow-hidden rounded-panel border border-line bg-bg/40 [content-visibility:auto] [contain-intrinsic-size:auto_7.5rem]">
              <button type="button" onClick={() => setOpened(palette)} className="block w-full text-left">
                <span className="flex h-14">
                  {palette.colors.map((color) => (
                    <span key={color} className="h-full min-w-0 flex-1" style={{ background: color }} />
                  ))}
                </span>
                <span className="flex items-center gap-2 px-3 py-2 pr-14">
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm text-fg">{palette.name}</span>
                    <span className="block text-xs text-muted">{palette.colors.length} cores</span>
                  </span>
                </span>
              </button>
              <button
                type="button"
                aria-label={`Copiar paleta ${palette.name}`}
                onClick={() => void copy(palette.colors.join("\n"), palette.id)}
                className="absolute bottom-1 right-1 inline-flex size-11 items-center justify-center text-muted hover:text-fg"
              >
                {copied === palette.id ? <Check className="size-4 text-accent" /> : <Copy className="size-4" />}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-panel border border-dashed border-line px-4 py-10 text-center text-sm text-muted">
          Nenhuma paleta com esse filtro.
        </p>
      )}
    </div>
  );
}
