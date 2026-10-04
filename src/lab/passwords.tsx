import { useEffect, useMemo, useState } from "react";
import Check from "lucide-react/dist/esm/icons/check.js";
import Copy from "lucide-react/dist/esm/icons/copy.js";
import RefreshCw from "lucide-react/dist/esm/icons/refresh-cw.js";
import {
  PASSPHRASE_MAX_WORDS,
  PASSPHRASE_MIN_WORDS,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  buildCharset,
  buildPassphrase,
  charKind,
  generatePassword,
  parseWordlist,
  passphraseEntropy,
  passwordEntropy,
  strengthBand,
  type PasswordSpec,
} from "@/lab/password";

type Mode = "password" | "passphrase";
type ClassKey = "lowercase" | "uppercase" | "digits" | "symbols";

const COUNTS = [5, 10, 20];
const SEPARATORS = [
  { value: "-", label: "Hífen", text: "-" },
  { value: " ", label: "Espaço", text: "espaço" },
  { value: ".", label: "Ponto", text: "." },
  { value: "_", label: "Sublinhado", text: "_" },
];
const BANDS: Record<string, string> = {
  Weak: "fraca",
  Fair: "razoável",
  Strong: "forte",
  "Very strong": "muito forte",
};
const EFF_LIST_SIZE = 7776;

let wordlistPromise: Promise<string[]> | null = null;

function loadWordlist() {
  wordlistPromise ??= fetch("/data/eff-large-wordlist.txt")
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.text();
    })
    .then(parseWordlist)
    .then((words) => {
      if (words.length < EFF_LIST_SIZE / 2) throw new Error("lista curta");
      return words;
    })
    .catch((error: unknown) => {
      wordlistPromise = null;
      throw error;
    });
  return wordlistPromise;
}

function Toggle({
  on,
  label,
  onChange,
}: {
  on: boolean;
  label: string;
  onChange: (next: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-end"
    >
      <span className={"inline-flex h-7 w-12 items-center rounded-panel border border-line p-1 " + (on ? "bg-accent" : "bg-bg")}>
        <span className={"size-5 rounded-panel " + (on ? "translate-x-5 bg-accent-ink" : "bg-fg")} />
      </span>
    </button>
  );
}

export function Passwords() {
  const [mode, setMode] = useState<Mode>("password");
  const [length, setLength] = useState(16);
  const [lowercase, setLowercase] = useState(true);
  const [uppercase, setUppercase] = useState(true);
  const [digits, setDigits] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(true);
  const [wordCount, setWordCount] = useState(5);
  const [separator, setSeparator] = useState("-");
  const [capitaliseFirst, setCapitaliseFirst] = useState(true);
  const [trailingDigit, setTrailingDigit] = useState(true);
  const [bulkCount, setBulkCount] = useState(10);
  const [list, setList] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | number | null>(null);
  const [words, setWords] = useState<string[] | null>(null);
  const [wordStatus, setWordStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");

  const spec: PasswordSpec = { length, lowercase, uppercase, digits, symbols, excludeAmbiguous };
  const pool = useMemo(() => buildCharset(spec), [length, lowercase, uppercase, digits, symbols, excludeAmbiguous]);
  const bits =
    mode === "password"
      ? passwordEntropy(length, pool.length)
      : passphraseEntropy(wordCount, words?.length ?? EFF_LIST_SIZE, trailingDigit);

  const fill = (nextMode = mode, nextCount = bulkCount, wordlist = words) => {
    if (nextMode === "passphrase") {
      if (!wordlist) return;
      setList(
        Array.from({ length: nextCount }, () =>
          buildPassphrase(wordlist, { words: wordCount, separator, capitaliseFirst, trailingDigit }),
        ),
      );
      return;
    }
    setList(Array.from({ length: nextCount }, () => generatePassword(spec)));
  };

  useEffect(() => {
    setList(Array.from({ length: bulkCount }, () => generatePassword(spec)));
    // first client paint only; later changes go through the controls
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!copied && copied !== 0) return;
    const id = window.setTimeout(() => setCopied(null), 1500);
    return () => window.clearTimeout(id);
  }, [copied]);

  const ensureWords = async () => {
    if (words) return words;
    setWordStatus("loading");
    try {
      const loaded = await loadWordlist();
      setWords(loaded);
      setWordStatus("ready");
      return loaded;
    } catch {
      setWordStatus("error");
      return null;
    }
  };

  const chooseMode = async (next: Mode) => {
    if (next === mode) return;
    setMode(next);
    if (next === "passphrase") {
      const loaded = words ?? (await ensureWords());
      if (loaded) fill("passphrase", bulkCount, loaded);
      else setList([]);
      return;
    }
    fill("password");
  };

  const setClass = (key: ClassKey, on: boolean) => {
    const state: Record<ClassKey, boolean> = { lowercase, uppercase, digits, symbols };
    if (!on && !Object.entries(state).some(([name, enabled]) => enabled && name !== key)) return;
    const next = { ...spec, [key]: on };
    if (key === "lowercase") setLowercase(on);
    if (key === "uppercase") setUppercase(on);
    if (key === "digits") setDigits(on);
    if (key === "symbols") setSymbols(on);
    setList(Array.from({ length: bulkCount }, () => generatePassword(next)));
  };

  const copy = async (value: string, key: string | number) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
    } catch {
      setCopied(null);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <div className="inline-flex rounded-panel border border-line" role="group" aria-label="Modo">
          {(
            [
              ["password", "Senha"],
              ["passphrase", "Frase"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              aria-pressed={mode === id}
              onClick={() => void chooseMode(id)}
              className={"min-h-11 px-3 text-sm " + (mode === id ? "bg-bg text-accent" : "text-muted hover:text-fg")}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="text-xs uppercase tracking-widest text-muted" aria-live="polite">
          {bits.toFixed(1)} bits · {BANDS[strengthBand(bits)] ?? strengthBand(bits)}
        </p>
        <div className="inline-flex rounded-panel border border-line" role="group" aria-label="Quantidade">
          {COUNTS.map((count) => (
            <button
              key={count}
              type="button"
              aria-pressed={bulkCount === count}
              onClick={() => {
                setBulkCount(count);
                fill(mode, count);
              }}
              className={"min-h-11 min-w-11 px-3 text-sm tabular-nums " + (bulkCount === count ? "bg-bg text-accent" : "text-muted hover:text-fg")}
            >
              {count}
            </button>
          ))}
        </div>
        <button
          type="button"
          disabled={mode === "passphrase" && wordStatus !== "ready"}
          onClick={() => fill()}
          className="inline-flex min-h-11 items-center gap-2 rounded-panel bg-accent px-3 text-sm font-medium text-accent-ink disabled:opacity-40"
        >
          <RefreshCw className="size-4" />
          Gerar
        </button>
      </div>

      {mode === "password" ? (
        <div className="grid gap-2 sm:grid-cols-2">
          <label className="flex min-h-11 items-center gap-3 rounded-panel border border-line px-3 sm:col-span-2">
            <span className="text-sm text-muted">Comprimento</span>
            <input
              type="range"
              min={PASSWORD_MIN_LENGTH}
              max={PASSWORD_MAX_LENGTH}
              value={length}
              aria-label="Comprimento"
              onChange={(event) => {
                const next = Number(event.target.value);
                setLength(next);
                setList(Array.from({ length: bulkCount }, () => generatePassword({ ...spec, length: next })));
              }}
              className="min-w-0 flex-1"
            />
            <span className="w-8 text-right text-sm tabular-nums text-fg">{length}</span>
          </label>
          {(
            [
              ["Minúsculas", lowercase, (on: boolean) => setClass("lowercase", on)],
              ["Maiúsculas", uppercase, (on: boolean) => setClass("uppercase", on)],
              ["Números", digits, (on: boolean) => setClass("digits", on)],
              ["Símbolos", symbols, (on: boolean) => setClass("symbols", on)],
              ["Sem parecidos", excludeAmbiguous, (on: boolean) => {
                setExcludeAmbiguous(on);
                setList(Array.from({ length: bulkCount }, () => generatePassword({ ...spec, excludeAmbiguous: on })));
              }],
            ] as const
          ).map(([label, on, change]) => (
            <div key={label} className="flex min-h-11 items-center justify-between gap-3 rounded-panel border border-line px-3">
              <span className="text-sm text-fg">{label}</span>
              <Toggle on={on} label={label} onChange={change} />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-2 sm:grid-cols-2">
          <label className="flex min-h-11 items-center gap-3 rounded-panel border border-line px-3 sm:col-span-2">
            <span className="text-sm text-muted">Palavras</span>
            <input
              type="range"
              min={PASSPHRASE_MIN_WORDS}
              max={PASSPHRASE_MAX_WORDS}
              value={wordCount}
              aria-label="Palavras"
              onChange={(event) => {
                const next = Number(event.target.value);
                setWordCount(next);
                if (words) {
                  setList(
                    Array.from({ length: bulkCount }, () =>
                      buildPassphrase(words, { words: next, separator, capitaliseFirst, trailingDigit }),
                    ),
                  );
                }
              }}
              className="min-w-0 flex-1"
            />
            <span className="w-8 text-right text-sm tabular-nums text-fg">{wordCount}</span>
          </label>
          <div className="flex min-h-11 flex-wrap items-center justify-between gap-2 rounded-panel border border-line px-3 sm:col-span-2">
            <span className="text-sm text-muted">Separador</span>
            <span className="inline-flex rounded-panel border border-line">
              {SEPARATORS.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  aria-label={item.label}
                  aria-pressed={separator === item.value}
                  onClick={() => {
                    setSeparator(item.value);
                    if (words) {
                      setList(
                        Array.from({ length: bulkCount }, () =>
                          buildPassphrase(words, { words: wordCount, separator: item.value, capitaliseFirst, trailingDigit }),
                        ),
                      );
                    }
                  }}
                  className={"min-h-11 px-3 text-sm " + (separator === item.value ? "bg-bg text-accent" : "text-muted hover:text-fg")}
                >
                  {item.text}
                </button>
              ))}
            </span>
          </div>
          {(
            [
              ["Maiúscula na primeira", capitaliseFirst, setCapitaliseFirst],
              ["Dígito no fim", trailingDigit, setTrailingDigit],
            ] as const
          ).map(([label, on, change]) => (
            <div key={label} className="flex min-h-11 items-center justify-between gap-3 rounded-panel border border-line px-3">
              <span className="text-sm text-fg">{label}</span>
              <Toggle
                on={on}
                label={label}
                onChange={(next) => {
                  change(next);
                  if (!words) return;
                  const phrase = {
                    words: wordCount,
                    separator,
                    capitaliseFirst: label.startsWith("Maiúscula") ? next : capitaliseFirst,
                    trailingDigit: label.startsWith("Dígito") ? next : trailingDigit,
                  };
                  setList(Array.from({ length: bulkCount }, () => buildPassphrase(words, phrase)));
                }}
              />
            </div>
          ))}
          {wordStatus === "loading" ? <p className="text-sm text-muted sm:col-span-2">Carregando a lista de palavras…</p> : null}
          {wordStatus === "error" ? (
            <div className="flex flex-wrap items-center gap-3 sm:col-span-2" role="alert">
              <p className="text-sm text-muted">A lista de palavras não carregou. O modo senha continua funcionando.</p>
              <button type="button" onClick={() => void ensureWords().then((loaded) => loaded && fill("passphrase", bulkCount, loaded))} className="inline-flex min-h-11 items-center gap-2 rounded-panel border border-line px-3 text-sm text-muted hover:text-fg">
                <RefreshCw className="size-4" />
                Tentar de novo
              </button>
            </div>
          ) : null}
        </div>
      )}

      {list.length ? (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs uppercase tracking-widest text-muted">Lista · {list.length}</p>
            <button type="button" onClick={() => void copy(list.join("\n"), "all")} className="inline-flex min-h-11 items-center gap-2 rounded-panel border border-line px-3 text-xs uppercase tracking-widest text-muted hover:text-fg">
              {copied === "all" ? <Check className="size-4 text-accent" /> : <Copy className="size-4" />}
              Copiar todas
            </button>
          </div>
          <ul className="flex flex-col">
            {list.map((item, index) => (
              <li key={`${index}-${item}`} className="flex items-center gap-2 border-b border-line py-1 last:border-b-0">
                <p className="min-w-0 flex-1 break-all font-mono text-sm leading-relaxed">
                  {[...item].map((ch, charIndex) => {
                    const kind = charKind(ch);
                    return (
                      <span key={charIndex} className={kind === "digit" ? "text-accent" : kind === "symbol" ? "text-muted" : "text-fg"}>
                        {ch === " " ? "\u00a0" : ch}
                      </span>
                    );
                  })}
                </p>
                <button type="button" aria-label={`Copiar senha ${index + 1}`} onClick={() => void copy(item, index)} className="inline-flex size-11 shrink-0 items-center justify-center text-muted hover:text-fg">
                  {copied === index ? <Check className="size-4 text-accent" /> : <Copy className="size-4" />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
