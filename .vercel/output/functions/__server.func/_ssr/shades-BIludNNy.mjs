import { i as __toESM } from "../_runtime.mjs";
import { G as require_jsx_runtime, K as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as Check, E as Copy } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shades-BIludNNy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DEFAULT_COLOUR = "#3b82f6";
var SHADE_TARGETS = [
	[50, .97],
	[100, .93],
	[200, .87],
	[300, .78],
	[400, .66],
	[500, .55],
	[600, .47],
	[700, .4],
	[800, .33],
	[900, .27],
	[950, .2]
];
var MODES = [
	{
		value: "classic",
		label: "Clássico",
		description: "Escala no estilo Tailwind, com o mesmo matiz."
	},
	{
		value: "hue-shift",
		label: "Desvio de matiz",
		description: "Claros mais quentes, escuros mais frios."
	},
	{
		value: "luminance-anchored",
		label: "Ancorado",
		description: "Claros perto do branco e escuros perto do preto."
	},
	{
		value: "vivid",
		label: "Vívido",
		description: "Saturação alta em todos os tons."
	},
	{
		value: "muted",
		label: "Suave",
		description: "Tons dessaturados, mais discretos."
	}
];
var MODE_RAMPS = {
	classic: [
		.75,
		1,
		.85
	],
	"hue-shift": [
		.75,
		1,
		.85
	],
	"luminance-anchored": [
		.5,
		1,
		.6
	],
	vivid: [
		1,
		1.35,
		1.15
	],
	muted: [
		.3,
		.5,
		.4
	]
};
function hexToRgb(hex) {
	const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());
	if (!match) return null;
	return [
		parseInt(match[1], 16),
		parseInt(match[2], 16),
		parseInt(match[3], 16)
	];
}
function rgbToHex(r, g, b) {
	return "#" + [
		r,
		g,
		b
	].map((channel) => Math.round(Math.max(0, Math.min(255, channel))).toString(16).padStart(2, "0")).join("");
}
function srgbToLinear(channel) {
	const value = channel / 255;
	return value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4;
}
function linearToSrgb(channel) {
	const value = channel <= .0031308 ? 12.92 * channel : 1.055 * channel ** (1 / 2.4) - .055;
	return Math.round(Math.max(0, Math.min(255, value * 255)));
}
function lchToLab(l, c, h) {
	const rad = h * Math.PI / 180;
	return [
		l,
		c * Math.cos(rad),
		c * Math.sin(rad)
	];
}
function rgbToOklab(r, g, b) {
	const lr = srgbToLinear(r);
	const lg = srgbToLinear(g);
	const lb = srgbToLinear(b);
	const l = Math.cbrt(.4122214708 * lr + .5363325363 * lg + .0514459929 * lb);
	const m = Math.cbrt(.2119034982 * lr + .6806995451 * lg + .1073969566 * lb);
	const s = Math.cbrt(.0883024619 * lr + .2817188376 * lg + .6299787005 * lb);
	return [
		.2104542553 * l + .793617785 * m - .0040720468 * s,
		1.9779984951 * l - 2.428592205 * m + .4505937099 * s,
		.0259040371 * l + .7827717662 * m - .808675766 * s
	];
}
function oklabToLinearRgb(L, a, b) {
	const l = (L + .3963377774 * a + .2158037573 * b) ** 3;
	const m = (L - .1055613458 * a - .0638541728 * b) ** 3;
	const s = (L - .0894841775 * a - 1.291485548 * b) ** 3;
	return [
		4.0767416621 * l - 3.3077115913 * m + .2309699292 * s,
		-1.2684380046 * l + 2.6097574011 * m - .3413193965 * s,
		-.0041960863 * l - .7034186147 * m + 1.707614701 * s
	];
}
function oklabToRgb(L, a, b) {
	return oklabToLinearRgb(L, a, b).map(linearToSrgb);
}
function maxOklchChroma(l, h) {
	let lo = 0;
	let hi = .5;
	for (let step = 0; step < 24; step += 1) {
		const mid = (lo + hi) / 2;
		if (oklabToLinearRgb(...lchToLab(l, mid, h)).every((value) => value >= -1e-5 && value <= 1 + 1e-5)) lo = mid;
		else hi = mid;
	}
	return lo;
}
function rgbToOklch(r, g, b) {
	const [l, a, bLab] = rgbToOklab(r, g, b);
	let h = Math.atan2(bLab, a) * 180 / Math.PI;
	if (h < 0) h += 360;
	return [
		l,
		Math.sqrt(a * a + bLab * bLab),
		h
	];
}
function rampScale(index, mode) {
	const [light, mid, dark] = MODE_RAMPS[mode];
	const fromEnd = SHADE_TARGETS.length - 1 - index;
	if (index < 2) return light + (mid - light) * (index / 2);
	if (fromEnd < 2) return dark + (mid - dark) * (fromEnd / 2);
	return mid;
}
function shadeParams(index, targetL, baseSat, baseH, mode) {
	const fromEnd = SHADE_TARGETS.length - 1 - index;
	const l = mode !== "luminance-anchored" ? targetL : index < 2 ? targetL + (1 - targetL) * .3 : fromEnd < 2 ? targetL * .8 : targetL;
	const h = mode === "hue-shift" ? (baseH + (targetL - .5) * 2 * 15 + 360) % 360 : baseH;
	return [
		l,
		Math.min(1, baseSat * rampScale(index, mode)) * maxOklchChroma(l, h),
		h
	];
}
function generateShades(baseHex, mode) {
	const rgb = hexToRgb(baseHex);
	if (!rgb) return null;
	const [baseL, baseC, baseH] = rgbToOklch(...rgb);
	const baseMax = maxOklchChroma(baseL, baseH);
	const baseSat = baseMax > 0 ? Math.min(1, baseC / baseMax) : 0;
	return SHADE_TARGETS.map(([level, targetL], index) => {
		const oklch = shadeParams(index, targetL, baseSat, baseH, mode);
		return {
			level,
			hex: rgbToHex(...oklabToRgb(...lchToLab(...oklch))),
			oklch
		};
	});
}
function ink(hex) {
	const rgb = hexToRgb(hex);
	if (!rgb) return "var(--color-fg)";
	const [r, g, b] = rgb.map((channel) => {
		const value = channel / 255;
		return value <= .03928 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4;
	});
	return .2126 * r + .7152 * g + .0722 * b > .4 ? "var(--color-bg)" : "var(--color-fg)";
}
function Shades() {
	const [base, setBase] = (0, import_react.useState)(DEFAULT_COLOUR);
	const [name, setName] = (0, import_react.useState)("primary");
	const [mode, setMode] = (0, import_react.useState)("classic");
	const [copied, setCopied] = (0, import_react.useState)(null);
	const shades = generateShades(base, mode);
	const modeInfo = MODES.find((item) => item.value === mode) ?? MODES[0];
	const token = name || "primary";
	(0, import_react.useEffect)(() => {
		if (!copied) return;
		const id = window.setTimeout(() => setCopied(null), 1500);
		return () => window.clearTimeout(id);
	}, [copied]);
	const copy = async (value, key) => {
		try {
			await navigator.clipboard.writeText(value);
			setCopied(key);
		} catch {
			setCopied(null);
		}
	};
	const cssBlock = shades ? `:root {\n${shades.map((shade) => `  --${token}-${shade.level}: ${shade.hex};`).join("\n")}\n}` : "";
	const oklchBlock = shades ? `:root {\n${shades.map((shade) => `  --${token}-${shade.level}: oklch(${shade.oklch[0].toFixed(3)} ${shade.oklch[1].toFixed(3)} ${shade.oklch[2].toFixed(1)});`).join("\n")}\n}` : "";
	const tailwindBlock = shades ? `${token}: {\n${shades.map((shade) => `      ${shade.level}: '${shade.hex}',`).join("\n")}\n    },` : "";
	const blocks = [
		{
			key: "css",
			label: "Variáveis CSS",
			code: cssBlock
		},
		{
			key: "oklch",
			label: "Variáveis CSS (OKLCH)",
			code: oklchBlock
		},
		{
			key: "tailwind",
			label: "Config do Tailwind",
			code: tailwindBlock
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex flex-col gap-2 text-xs uppercase tracking-widest text-muted",
					children: ["Cor base", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "color",
							value: hexToRgb(base) ? base : "#000000",
							"aria-label": "Escolher cor base",
							onChange: (event) => setBase(event.target.value),
							className: "size-11 shrink-0 cursor-pointer rounded-panel border border-line bg-bg p-1"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: base,
							"aria-label": "Cor base",
							spellCheck: false,
							onChange: (event) => setBase(event.target.value),
							className: "min-h-11 min-w-0 flex-1 rounded-panel border border-line bg-bg px-3 font-mono text-sm normal-case tracking-normal text-fg"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex flex-col gap-2 text-xs uppercase tracking-widest text-muted",
					children: ["Nome da cor", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: name,
						"aria-label": "Nome da cor",
						spellCheck: false,
						onChange: (event) => setName(event.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "")),
						className: "min-h-11 rounded-panel border border-line bg-bg px-3 font-mono text-sm normal-case tracking-normal text-fg"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex flex-col gap-2 text-xs uppercase tracking-widest text-muted",
					children: [
						"Modo",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: mode,
							"aria-label": "Modo de geração",
							onChange: (event) => setMode(event.target.value),
							className: "min-h-11 rounded-panel border border-line bg-bg px-3 text-sm normal-case tracking-normal text-fg",
							children: MODES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item.value,
								children: item.label
							}, item.value))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "normal-case tracking-normal",
							children: modeInfo.description
						})
					]
				})
			]
		}), shades ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex w-full min-w-0 gap-1 overflow-x-auto",
				children: shades.map((shade) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => void copy(shade.hex, shade.hex),
					"aria-label": `Copiar ${shade.level}`,
					className: "flex h-16 min-w-11 flex-1 flex-col items-center justify-end rounded-panel border border-line pb-1 text-xs font-medium tabular-nums",
					style: {
						background: shade.hex,
						color: ink(shade.hex)
					},
					children: shade.level
				}, shade.level))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col",
				children: shades.map((shade) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-2 border-b border-line py-1 last:border-b-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-10 text-xs tabular-nums text-muted",
							children: shade.level
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "size-8 shrink-0 rounded-panel border border-line",
							style: { background: shade.hex }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "min-w-0 flex-1 truncate font-mono text-sm text-fg",
							children: shade.hex
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": `Copiar tom ${shade.level}`,
							onClick: () => void copy(shade.hex, shade.hex),
							className: "inline-flex size-11 items-center justify-center text-muted hover:text-fg",
							children: copied === shade.hex ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-accent" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" })
						})
					]
				}, shade.level))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 lg:grid-cols-3",
				children: blocks.map((block) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-col gap-2 rounded-panel border border-line bg-bg/40 p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xs uppercase tracking-widest text-muted",
							children: block.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => void copy(block.code, block.key),
							className: "inline-flex min-h-11 items-center gap-2 px-2 text-xs uppercase tracking-widest text-muted hover:text-fg",
							children: [copied === block.key ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-accent" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), copied === block.key ? "Copiado" : "Copiar"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "overflow-x-auto font-mono text-xs leading-relaxed text-fg",
						children: block.code
					})]
				}, block.key))
			})
		] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "Hex inválido. Usa seis dígitos, tipo #3b82f6."
		})]
	});
}
//#endregion
export { Shades };
