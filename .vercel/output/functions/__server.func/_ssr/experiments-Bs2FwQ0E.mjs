import { i as __toESM } from "../_runtime.mjs";
import { G as require_jsx_runtime, K as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as DEFAULT_FIELD, r as useLab } from "./routes-C5UEIqT5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/experiments-Bs2FwQ0E.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var INK_SWATCHES = [
	"#ff4d55",
	"#ff9a2e",
	"#e8ff57",
	"#3ee0a0",
	"#49b7ff",
	"#c084fc",
	"#eceae3"
];
function readInk(name, fallback) {
	return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}
function Raios() {
	const { field, setField } = useLab();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-xl text-sm leading-relaxed text-pretty text-muted",
				children: "Os raios atrás da interface são o campo do Prisma. Muda a densidade, o alcance das ligações e o quanto cada feixe se abre em vermelho, lima e ciano."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4",
				children: [
					{
						key: "count",
						label: "Densidade",
						min: 24,
						max: 120,
						step: 1
					},
					{
						key: "link",
						label: "Alcance",
						min: 50,
						max: 200,
						step: 1
					},
					{
						key: "speed",
						label: "Velocidade",
						min: 0,
						max: 1.6,
						step: .01
					},
					{
						key: "dispersion",
						label: "Dispersão",
						min: 0,
						max: 28,
						step: 1
					}
				].map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex flex-col gap-2 text-xs text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center justify-between uppercase tracking-widest",
						children: [row.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums text-fg",
							children: row.step < 1 ? field[row.key].toFixed(2) : Math.round(field[row.key])
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "range",
						min: row.min,
						max: row.max,
						step: row.step,
						value: field[row.key],
						onChange: (event) => setField({ [row.key]: Number(event.target.value) })
					})]
				}, row.key))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setField(DEFAULT_FIELD),
				className: "min-h-11 self-start rounded-panel border border-line px-4 text-xs uppercase tracking-widest text-muted hover:text-fg",
				children: "Restaurar campo"
			})
		]
	});
}
var ASCII_CHARS = " .:-=+*#%@";
function AsciiPrism() {
	const wrapRef = (0, import_react.useRef)(null);
	const canvasRef = (0, import_react.useRef)(null);
	const imageRef = (0, import_react.useRef)(null);
	const mouseRef = (0, import_react.useRef)({
		x: -9999,
		y: -9999,
		on: false
	});
	const [fileName, setFileName] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
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
			sctx.lineTo(162, 86);
			sctx.lineTo(18, 86);
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
			const h = Math.max(240, Math.min(420, Math.round(w * .56)));
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
			const rows = Math.floor(h / 12);
			const pixels = sctx.getImageData(0, 0, source.width, source.height).data;
			const mx = mouseRef.current.on ? mouseRef.current.x : w / 2;
			const my = mouseRef.current.on ? mouseRef.current.y : h / 2;
			for (let y = 0; y < rows; y += 1) for (let x = 0; x < cols; x += 1) {
				let sx = x / cols * source.width;
				let sy = y / rows * source.height;
				if (!reduce && mouseRef.current.on) {
					const px = x * cell;
					const py = y * 12;
					const dx = px - mx;
					const dy = py - my;
					const dist = Math.hypot(dx, dy) || 1;
					const pull = Math.max(0, 1 - dist / 180);
					const ang = Math.atan2(dy, dx) + pull * 1.15;
					sx = (mx + Math.cos(ang) * dist) / w * source.width;
					sy = (my + Math.sin(ang) * dist) / h * source.height;
				}
				const ix = Math.max(0, Math.min(source.width - 1, Math.floor(sx)));
				const i = (Math.max(0, Math.min(source.height - 1, Math.floor(sy))) * source.width + ix) * 4;
				const lum = ((pixels[i] ?? 0) + (pixels[i + 1] ?? 0) + (pixels[i + 2] ?? 0)) / 3;
				const glyph = ASCII_CHARS[Math.min(9, Math.floor(lum / 255 * 9))] ?? " ";
				if (glyph !== " ") ctx.fillText(glyph, x * cell, y * 12 + 10);
			}
			if (!reduce) raf = requestAnimationFrame(frame);
		};
		raf = requestAnimationFrame(frame);
		return () => {
			running = false;
			cancelAnimationFrame(raf);
		};
	}, [fileName]);
	const loadFile = (file) => {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: wrapRef,
				className: "overflow-hidden rounded-panel border border-line",
				onPointerMove: (event) => {
					const rect = event.currentTarget.getBoundingClientRect();
					mouseRef.current = {
						x: event.clientX - rect.left,
						y: event.clientY - rect.top,
						on: true
					};
				},
				onPointerLeave: () => {
					mouseRef.current.on = false;
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
					ref: canvasRef,
					className: "block w-full"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "min-h-11 cursor-pointer rounded-panel border border-line px-4 text-xs uppercase tracking-widest text-muted hover:text-fg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "inline-flex min-h-11 items-center",
						children: "Soltar imagem"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "file",
						accept: "image/*",
						className: "sr-only",
						onChange: (event) => loadFile(event.target.files?.[0])
					})]
				}), fileName ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "min-h-11 rounded-panel px-3 text-xs text-muted hover:text-fg",
					onClick: () => {
						imageRef.current = null;
						setFileName(null);
					},
					children: ["Limpar · ", fileName]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted",
					children: "Move o cursor pra torcer o prisma."
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-fg",
				children: error
			}) : null
		]
	});
}
function rgbToHex(r, g, b) {
	return `#${[
		r,
		g,
		b
	].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}
function extractPalette(img) {
	const canvas = document.createElement("canvas");
	const size = 72;
	canvas.width = size;
	canvas.height = size;
	const ctx = canvas.getContext("2d", { willReadFrequently: true });
	if (!ctx) return [];
	ctx.drawImage(img, 0, 0, size, size);
	const data = ctx.getImageData(0, 0, size, size).data;
	const buckets = /* @__PURE__ */ new Map();
	for (let i = 0; i < data.length; i += 4) {
		if ((data[i + 3] ?? 0) < 128) continue;
		const r = Math.round((data[i] ?? 0) / 24) * 24;
		const g = Math.round((data[i + 1] ?? 0) / 24) * 24;
		const b = Math.round((data[i + 2] ?? 0) / 24) * 24;
		const key = `${r},${g},${b}`;
		const found = buckets.get(key);
		if (found) found.count += 1;
		else buckets.set(key, {
			r,
			g,
			b,
			hex: rgbToHex(Math.min(255, r), Math.min(255, g), Math.min(255, b)),
			count: 1
		});
	}
	return [...buckets.values()].sort((a, b) => b.count - a.count).slice(0, 6);
}
function Paleta() {
	const [preview, setPreview] = (0, import_react.useState)(null);
	const [swatches, setSwatches] = (0, import_react.useState)([]);
	const [note, setNote] = (0, import_react.useState)("Solta uma imagem pra extrair a paleta.");
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		return () => {
			if (preview) URL.revokeObjectURL(preview);
		};
	}, [preview]);
	const loadFile = (file) => {
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
	const copy = async (hex) => {
		try {
			await navigator.clipboard.writeText(hex);
			setNote(`${hex} copiado.`);
		} catch {
			setNote(hex);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex min-h-36 cursor-pointer flex-col items-center justify-center gap-2 rounded-panel border border-dashed border-line px-4 text-center text-sm text-muted hover:text-fg",
				onDragOver: (event) => event.preventDefault(),
				onDrop: (event) => {
					event.preventDefault();
					loadFile(event.dataTransfer.files?.[0]);
				},
				children: [preview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: preview,
					alt: "Imagem enviada para extração de paleta",
					className: "max-h-48 rounded-panel object-contain"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Arrasta uma imagem ou clica pra escolher." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "file",
					accept: "image/*",
					className: "sr-only",
					onChange: (event) => loadFile(event.target.files?.[0])
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-2 sm:grid-cols-3",
				children: swatches.map((swatch) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => void copy(swatch.hex),
					className: "flex min-h-16 items-end rounded-panel border border-line p-2 text-left text-xs",
					style: { background: swatch.hex },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-panel bg-bg/80 px-2 py-1 font-medium uppercase tracking-widest text-fg",
						children: swatch.hex
					})
				}, swatch.hex))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: error ?? note
			})
		]
	});
}
var COLS = 28;
var ROWS = 16;
function Grade() {
	const canvasRef = (0, import_react.useRef)(null);
	const cellsRef = (0, import_react.useRef)(Array.from({ length: 448 }, () => 0));
	const colorRef = (0, import_react.useRef)(3);
	const painting = (0, import_react.useRef)(false);
	const [color, setColor] = (0, import_react.useState)(3);
	const [tick, setTick] = (0, import_react.useState)(0);
	const { theme } = useLab();
	colorRef.current = color;
	(0, import_react.useEffect)(() => {
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
			const x = i % COLS * cw;
			const y = Math.floor(i / COLS) * ch;
			if (value > 0) {
				ctx.fillStyle = INK_SWATCHES[value - 1] ?? "#eceae3";
				ctx.fillRect(x + 1, y + 1, cw - 2, ch - 2);
			}
			ctx.strokeStyle = readInk("--color-line", "#2e2d2a");
			ctx.strokeRect(x, y, cw, ch);
		}
	}, [tick, theme]);
	const paintAt = (event) => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const rect = canvas.getBoundingClientRect();
		const x = Math.floor((event.clientX - rect.left) / rect.width * COLS);
		const y = Math.floor((event.clientY - rect.top) / rect.height * ROWS);
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref: canvasRef,
				className: "w-full touch-none rounded-panel border border-line",
				onPointerDown: (event) => {
					painting.current = true;
					event.currentTarget.setPointerCapture(event.pointerId);
					paintAt(event);
				},
				onPointerMove: (event) => {
					if (painting.current) paintAt(event);
				},
				onPointerUp: () => {
					painting.current = false;
				},
				onPointerLeave: () => {
					painting.current = false;
				},
				onContextMenu: (event) => event.preventDefault()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setColor(0),
					className: "min-h-11 rounded-panel border px-3 text-xs uppercase tracking-widest " + (color === 0 ? "border-accent text-fg" : "border-line text-muted"),
					children: "Apagar"
				}), INK_SWATCHES.map((swatch, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": `Cor ${index + 1}`,
					onClick: () => setColor(index + 1),
					className: "size-11 rounded-panel border",
					style: {
						background: swatch,
						borderColor: color === index + 1 ? "var(--color-fg)" : "transparent"
					}
				}, swatch))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: exportPng,
					className: "min-h-11 rounded-panel bg-accent px-4 text-sm font-medium text-accent-ink",
					children: "Exportar PNG"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						cellsRef.current = Array.from({ length: 448 }, () => 0);
						setTick((value) => value + 1);
					},
					className: "min-h-11 rounded-panel border border-line px-4 text-xs uppercase tracking-widest text-muted hover:text-fg",
					children: "Limpar grade"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: "Segura Shift pra apagar enquanto desenha."
			})
		]
	});
}
function Sobre() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex max-w-xl flex-col gap-4 text-sm leading-relaxed text-pretty",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Prisma. Experimental Design Studio • Creative Technology Lab. A casca é um estúdio: campo no fundo, árvore de experimentos, e cada ferramenta roda aqui mesmo." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted",
				children: "Raios mexe no campo que fica atrás de todas as telas. O Youtube Mixer toca vários vídeos do YouTube juntos, cada um com volume. ASCII transforma o prisma — ou uma imagem tua — num vórtice de caracteres. Palette Extractor puxa as cores dominantes. Tailwind Shades monta a escala 50–950 de uma cor. Palette Collection guarda paletas prontas. Password Generator cria senhas e frases-passe. QR Generator monta código de texto, Wi-Fi, contato ou um lote. Gradient Generator mistura linear, cantos ou malha. Grade desenha em células e baixa um PNG."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted",
				children: "Feito pra ser o lugar do app Prisma. Nada sai do navegador: sem conta, sem upload pra servidor. Tema e último experimento ficam só neste aparelho."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid grid-cols-2 gap-3 border-t border-line pt-4 text-xs uppercase tracking-widest text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Estúdio" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 text-fg",
						children: "Prisma Lab"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Origem" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 text-fg",
						children: "Brasil"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Versão" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 tabular-nums text-fg",
						children: "v0.1"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Campo" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 text-fg",
						children: "Ao vivo"
					})] })
				]
			})
		]
	});
}
//#endregion
export { AsciiPrism, Grade, Paleta, Raios, Sobre };
