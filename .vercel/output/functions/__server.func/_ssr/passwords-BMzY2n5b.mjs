import { i as __toESM } from "../_runtime.mjs";
import { G as require_jsx_runtime, K as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as Check, E as Copy, n as RefreshCw } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/passwords-BMzY2n5b.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CHARSET_LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
var CHARSET_UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var CHARSET_DIGITS = "0123456789";
var CHARSET_SYMBOLS = "!@#$%^&*()-=_+?[]{};:,.<>/~";
var AMBIGUOUS_CHARS = "Il1O0";
var DIGIT_LOOKUP = Object.fromEntries([...CHARSET_DIGITS].map((ch) => [ch, true]));
var SYMBOL_LOOKUP = Object.fromEntries([...CHARSET_SYMBOLS].map((ch) => [ch, true]));
function charKind(ch) {
	if (ch in DIGIT_LOOKUP) return "digit";
	if (ch in SYMBOL_LOOKUP) return "symbol";
	return "letter";
}
var FULL_UINT32_RANGE = 2 ** 32;
var cryptoUint32 = () => {
	const buffer = /* @__PURE__ */ new Uint32Array(1);
	crypto.getRandomValues(buffer);
	return buffer[0];
};
function unbiasedLimit(n, max) {
	return max - max % n;
}
function randomIndex(n, max, next) {
	if (n < 1) throw new RangeError("n must be at least 1");
	if (n > max) throw new RangeError("n exceeds the source range");
	const limit = unbiasedLimit(n, max);
	let value = next();
	while (value >= limit) value = next();
	return value % n;
}
function secureIndex(n, next = cryptoUint32) {
	return randomIndex(n, FULL_UINT32_RANGE, next);
}
function buildCharset(spec) {
	let pool = "";
	if (spec.lowercase) pool += CHARSET_LOWERCASE;
	if (spec.uppercase) pool += CHARSET_UPPERCASE;
	if (spec.digits) pool += CHARSET_DIGITS;
	if (spec.symbols) pool += CHARSET_SYMBOLS;
	if (spec.excludeAmbiguous) pool = [...pool].filter((char) => !AMBIGUOUS_CHARS.includes(char)).join("");
	if (pool.length === 0) throw new RangeError("no character class enabled");
	return pool;
}
function generatePassword(spec, next = cryptoUint32) {
	const pool = buildCharset(spec);
	const length = Math.round(Math.min(128, Math.max(8, spec.length ?? 16)));
	let out = "";
	for (let i = 0; i < length; i++) out += pool[secureIndex(pool.length, next)];
	return out;
}
function passwordEntropy(length, poolSize) {
	if (poolSize < 2) return 0;
	return length * Math.log2(poolSize);
}
function passphraseEntropy(words, wordlistSize, trailingDigit) {
	if (wordlistSize < 2) return 0;
	return words * Math.log2(wordlistSize) + (trailingDigit ? Math.log2(10) : 0);
}
var STRENGTH_BANDS = [
	{
		min: 0,
		label: "Weak"
	},
	{
		min: 40,
		label: "Fair"
	},
	{
		min: 60,
		label: "Strong"
	},
	{
		min: 95,
		label: "Very strong"
	}
];
function strengthBand(bits) {
	let label = STRENGTH_BANDS[0].label;
	for (const band of STRENGTH_BANDS) if (bits >= band.min) label = band.label;
	return label;
}
function parseWordlist(text) {
	return text.split("\n").map((line) => line.replace(/^\s*\d+\s*/, "").trim().toLowerCase()).filter((word) => /^[a-z]+$/.test(word));
}
function buildPassphrase(wordlist, spec, next = cryptoUint32) {
	if (wordlist.length === 0) throw new RangeError("wordlist is empty");
	const count = Math.round(Math.min(10, Math.max(3, spec.words)));
	const picked = [];
	for (let i = 0; i < count; i++) picked.push(wordlist[secureIndex(wordlist.length, next)]);
	if (spec.capitaliseFirst && picked.length > 0) {
		const first = picked[0];
		picked[0] = first.charAt(0).toUpperCase() + first.slice(1);
	}
	let out = picked.join(spec.separator);
	if (spec.trailingDigit) out += secureIndex(10, next);
	return out;
}
var COUNTS = [
	5,
	10,
	20
];
var SEPARATORS = [
	{
		value: "-",
		label: "Hífen",
		text: "-"
	},
	{
		value: " ",
		label: "Espaço",
		text: "espaço"
	},
	{
		value: ".",
		label: "Ponto",
		text: "."
	},
	{
		value: "_",
		label: "Sublinhado",
		text: "_"
	}
];
var BANDS = {
	Weak: "fraca",
	Fair: "razoável",
	Strong: "forte",
	"Very strong": "muito forte"
};
var EFF_LIST_SIZE = 7776;
var wordlistPromise = null;
function loadWordlist() {
	wordlistPromise ??= fetch("/data/eff-large-wordlist.txt").then((response) => {
		if (!response.ok) throw new Error(`HTTP ${response.status}`);
		return response.text();
	}).then(parseWordlist).then((words) => {
		if (words.length < EFF_LIST_SIZE / 2) throw new Error("lista curta");
		return words;
	}).catch((error) => {
		wordlistPromise = null;
		throw error;
	});
	return wordlistPromise;
}
function Toggle({ on, label, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		role: "switch",
		"aria-checked": on,
		"aria-label": label,
		onClick: () => onChange(!on),
		className: "inline-flex min-h-11 min-w-11 shrink-0 items-center justify-end",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "inline-flex h-7 w-12 items-center rounded-panel border border-line p-1 " + (on ? "bg-accent" : "bg-bg"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-5 rounded-panel " + (on ? "translate-x-5 bg-accent-ink" : "bg-fg") })
		})
	});
}
function Passwords() {
	const [mode, setMode] = (0, import_react.useState)("password");
	const [length, setLength] = (0, import_react.useState)(16);
	const [lowercase, setLowercase] = (0, import_react.useState)(true);
	const [uppercase, setUppercase] = (0, import_react.useState)(true);
	const [digits, setDigits] = (0, import_react.useState)(true);
	const [symbols, setSymbols] = (0, import_react.useState)(true);
	const [excludeAmbiguous, setExcludeAmbiguous] = (0, import_react.useState)(true);
	const [wordCount, setWordCount] = (0, import_react.useState)(5);
	const [separator, setSeparator] = (0, import_react.useState)("-");
	const [capitaliseFirst, setCapitaliseFirst] = (0, import_react.useState)(true);
	const [trailingDigit, setTrailingDigit] = (0, import_react.useState)(true);
	const [bulkCount, setBulkCount] = (0, import_react.useState)(10);
	const [list, setList] = (0, import_react.useState)([]);
	const [copied, setCopied] = (0, import_react.useState)(null);
	const [words, setWords] = (0, import_react.useState)(null);
	const [wordStatus, setWordStatus] = (0, import_react.useState)("idle");
	const spec = {
		length,
		lowercase,
		uppercase,
		digits,
		symbols,
		excludeAmbiguous
	};
	const pool = (0, import_react.useMemo)(() => buildCharset(spec), [
		length,
		lowercase,
		uppercase,
		digits,
		symbols,
		excludeAmbiguous
	]);
	const bits = mode === "password" ? passwordEntropy(length, pool.length) : passphraseEntropy(wordCount, words?.length ?? EFF_LIST_SIZE, trailingDigit);
	const fill = (nextMode = mode, nextCount = bulkCount, wordlist = words) => {
		if (nextMode === "passphrase") {
			if (!wordlist) return;
			setList(Array.from({ length: nextCount }, () => buildPassphrase(wordlist, {
				words: wordCount,
				separator,
				capitaliseFirst,
				trailingDigit
			})));
			return;
		}
		setList(Array.from({ length: nextCount }, () => generatePassword(spec)));
	};
	(0, import_react.useEffect)(() => {
		setList(Array.from({ length: bulkCount }, () => generatePassword(spec)));
	}, []);
	(0, import_react.useEffect)(() => {
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
	const chooseMode = async (next) => {
		if (next === mode) return;
		setMode(next);
		if (next === "passphrase") {
			const loaded = words ?? await ensureWords();
			if (loaded) fill("passphrase", bulkCount, loaded);
			else setList([]);
			return;
		}
		fill("password");
	};
	const setClass = (key, on) => {
		if (!on && !Object.entries({
			lowercase,
			uppercase,
			digits,
			symbols
		}).some(([name, enabled]) => enabled && name !== key)) return;
		const next = {
			...spec,
			[key]: on
		};
		if (key === "lowercase") setLowercase(on);
		if (key === "uppercase") setUppercase(on);
		if (key === "digits") setDigits(on);
		if (key === "symbols") setSymbols(on);
		setList(Array.from({ length: bulkCount }, () => generatePassword(next)));
	};
	const copy = async (value, key) => {
		try {
			await navigator.clipboard.writeText(value);
			setCopied(key);
		} catch {
			setCopied(null);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "inline-flex rounded-panel border border-line",
						role: "group",
						"aria-label": "Modo",
						children: [["password", "Senha"], ["passphrase", "Frase"]].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-pressed": mode === id,
							onClick: () => void chooseMode(id),
							className: "min-h-11 px-3 text-sm " + (mode === id ? "bg-bg text-accent" : "text-muted hover:text-fg"),
							children: label
						}, id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs uppercase tracking-widest text-muted",
						"aria-live": "polite",
						children: [
							bits.toFixed(1),
							" bits · ",
							BANDS[strengthBand(bits)] ?? strengthBand(bits)
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "inline-flex rounded-panel border border-line",
						role: "group",
						"aria-label": "Quantidade",
						children: COUNTS.map((count) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-pressed": bulkCount === count,
							onClick: () => {
								setBulkCount(count);
								fill(mode, count);
							},
							className: "min-h-11 min-w-11 px-3 text-sm tabular-nums " + (bulkCount === count ? "bg-bg text-accent" : "text-muted hover:text-fg"),
							children: count
						}, count))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: mode === "passphrase" && wordStatus !== "ready",
						onClick: () => fill(),
						className: "inline-flex min-h-11 items-center gap-2 rounded-panel bg-accent px-3 text-sm font-medium text-accent-ink disabled:opacity-40",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-4" }), "Gerar"]
					})
				]
			}),
			mode === "password" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex min-h-11 items-center gap-3 rounded-panel border border-line px-3 sm:col-span-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-muted",
							children: "Comprimento"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: 8,
							max: 128,
							value: length,
							"aria-label": "Comprimento",
							onChange: (event) => {
								const next = Number(event.target.value);
								setLength(next);
								setList(Array.from({ length: bulkCount }, () => generatePassword({
									...spec,
									length: next
								})));
							},
							className: "min-w-0 flex-1"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-8 text-right text-sm tabular-nums text-fg",
							children: length
						})
					]
				}), [
					[
						"Minúsculas",
						lowercase,
						(on) => setClass("lowercase", on)
					],
					[
						"Maiúsculas",
						uppercase,
						(on) => setClass("uppercase", on)
					],
					[
						"Números",
						digits,
						(on) => setClass("digits", on)
					],
					[
						"Símbolos",
						symbols,
						(on) => setClass("symbols", on)
					],
					[
						"Sem parecidos",
						excludeAmbiguous,
						(on) => {
							setExcludeAmbiguous(on);
							setList(Array.from({ length: bulkCount }, () => generatePassword({
								...spec,
								excludeAmbiguous: on
							})));
						}
					]
				].map(([label, on, change]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-h-11 items-center justify-between gap-3 rounded-panel border border-line px-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-fg",
						children: label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
						on,
						label,
						onChange: change
					})]
				}, label))]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex min-h-11 items-center gap-3 rounded-panel border border-line px-3 sm:col-span-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-muted",
								children: "Palavras"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "range",
								min: 3,
								max: 10,
								value: wordCount,
								"aria-label": "Palavras",
								onChange: (event) => {
									const next = Number(event.target.value);
									setWordCount(next);
									if (words) setList(Array.from({ length: bulkCount }, () => buildPassphrase(words, {
										words: next,
										separator,
										capitaliseFirst,
										trailingDigit
									})));
								},
								className: "min-w-0 flex-1"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-8 text-right text-sm tabular-nums text-fg",
								children: wordCount
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-h-11 flex-wrap items-center justify-between gap-2 rounded-panel border border-line px-3 sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-muted",
							children: "Separador"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex rounded-panel border border-line",
							children: SEPARATORS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": item.label,
								"aria-pressed": separator === item.value,
								onClick: () => {
									setSeparator(item.value);
									if (words) setList(Array.from({ length: bulkCount }, () => buildPassphrase(words, {
										words: wordCount,
										separator: item.value,
										capitaliseFirst,
										trailingDigit
									})));
								},
								className: "min-h-11 px-3 text-sm " + (separator === item.value ? "bg-bg text-accent" : "text-muted hover:text-fg"),
								children: item.text
							}, item.label))
						})]
					}),
					[[
						"Maiúscula na primeira",
						capitaliseFirst,
						setCapitaliseFirst
					], [
						"Dígito no fim",
						trailingDigit,
						setTrailingDigit
					]].map(([label, on, change]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-h-11 items-center justify-between gap-3 rounded-panel border border-line px-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-fg",
							children: label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
							on,
							label,
							onChange: (next) => {
								change(next);
								if (!words) return;
								const phrase = {
									words: wordCount,
									separator,
									capitaliseFirst: label.startsWith("Maiúscula") ? next : capitaliseFirst,
									trailingDigit: label.startsWith("Dígito") ? next : trailingDigit
								};
								setList(Array.from({ length: bulkCount }, () => buildPassphrase(words, phrase)));
							}
						})]
					}, label)),
					wordStatus === "loading" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted sm:col-span-2",
						children: "Carregando a lista de palavras…"
					}) : null,
					wordStatus === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-3 sm:col-span-2",
						role: "alert",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "A lista de palavras não carregou. O modo senha continua funcionando."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => void ensureWords().then((loaded) => loaded && fill("passphrase", bulkCount, loaded)),
							className: "inline-flex min-h-11 items-center gap-2 rounded-panel border border-line px-3 text-sm text-muted hover:text-fg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-4" }), "Tentar de novo"]
						})]
					}) : null
				]
			}),
			list.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs uppercase tracking-widest text-muted",
						children: ["Lista · ", list.length]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => void copy(list.join("\n"), "all"),
						className: "inline-flex min-h-11 items-center gap-2 rounded-panel border border-line px-3 text-xs uppercase tracking-widest text-muted hover:text-fg",
						children: [copied === "all" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-accent" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), "Copiar todas"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col",
					children: list.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-2 border-b border-line py-1 last:border-b-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "min-w-0 flex-1 break-all font-mono text-sm leading-relaxed",
							children: [...item].map((ch, charIndex) => {
								const kind = charKind(ch);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: kind === "digit" ? "text-accent" : kind === "symbol" ? "text-muted" : "text-fg",
									children: ch === " " ? "\xA0" : ch
								}, charIndex);
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": `Copiar senha ${index + 1}`,
							onClick: () => void copy(item, index),
							className: "inline-flex size-11 shrink-0 items-center justify-center text-muted hover:text-fg",
							children: copied === index ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-accent" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" })
						})]
					}, `${index}-${item}`))
				})]
			}) : null
		]
	});
}
//#endregion
export { Passwords };
