import { i as __toESM } from "../_runtime.mjs";
import { G as require_jsx_runtime, K as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as Moon, h as Sun } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C5UEIqT5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var EXPERIMENTS = [
	{
		id: "mixer",
		key: "1",
		index: "01",
		name: "Youtube Mixer",
		blurb: "Vários vídeos do YouTube ao mesmo tempo, cada um com volume."
	},
	{
		id: "raios",
		key: "2",
		index: "02",
		name: "Raios",
		blurb: "Dispersão do campo que fica atrás de tudo."
	},
	{
		id: "ascii",
		key: "3",
		index: "03",
		name: "ASCII",
		blurb: "Vórtice de caracteres. Solta uma imagem."
	},
	{
		id: "paleta",
		key: "4",
		index: "04",
		name: "Palette Extractor",
		blurb: "Extrai cores dominantes de uma foto."
	},
	{
		id: "grade",
		key: "5",
		index: "05",
		name: "Grade",
		blurb: "Desenho em células. Exporta PNG."
	},
	{
		id: "shades",
		key: "6",
		index: "06",
		name: "Tailwind Shade Generator",
		blurb: "Escala 50–950 no estilo Tailwind, a partir de uma cor."
	},
	{
		id: "collection",
		key: "7",
		index: "07",
		name: "Palette Collection",
		blurb: "Paletas prontas para copiar. Busca por nome ou hex."
	},
	{
		id: "passwords",
		key: "8",
		index: "08",
		name: "Password Generator",
		blurb: "Senhas e frases-passe. Copia uma ou a lista inteira."
	},
	{
		id: "qr",
		key: "9",
		index: "09",
		name: "QR Generator",
		blurb: "Texto, Wi-Fi, contato ou um lote. Baixa PNG, SVG ou ZIP."
	},
	{
		id: "gradient",
		key: "g",
		index: "10",
		name: "Gradient Generator",
		blurb: "Linear, cantos ou malha. Copia o CSS ou baixa um PNG."
	},
	{
		id: "sobre",
		key: "0",
		index: "11",
		name: "Sobre",
		blurb: "O que é o Prisma."
	}
];
function findExperiment(id) {
	return EXPERIMENTS.find((item) => item.id === id) ?? null;
}
var DEFAULT_FIELD = {
	count: 72,
	link: 120,
	speed: .35,
	dispersion: 10
};
var LabContext = (0, import_react.createContext)(null);
var THEME_KEY = "prisma-theme";
var SECTION_KEY = "prisma-section";
function LabProvider({ children }) {
	const [theme, setTheme] = (0, import_react.useState)("dark");
	const [section, setSection] = (0, import_react.useState)(null);
	const [field, setFieldState] = (0, import_react.useState)(DEFAULT_FIELD);
	const [booted, setBooted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const storedTheme = localStorage.getItem(THEME_KEY);
		if (storedTheme === "light" || storedTheme === "dark") setTheme(storedTheme);
		const storedSection = localStorage.getItem(SECTION_KEY);
		if (findExperiment(storedSection)) setSection(storedSection);
		setBooted(true);
	}, []);
	(0, import_react.useEffect)(() => {
		document.documentElement.dataset.theme = theme;
		if (booted) localStorage.setItem(THEME_KEY, theme);
	}, [theme, booted]);
	const toggleTheme = (0, import_react.useCallback)(() => {
		setTheme((current) => current === "dark" ? "light" : "dark");
	}, []);
	const open = (0, import_react.useCallback)((id) => {
		setSection(id);
		if (id) localStorage.setItem(SECTION_KEY, id);
		else localStorage.removeItem(SECTION_KEY);
	}, []);
	const setField = (0, import_react.useCallback)((patch) => {
		setFieldState((current) => ({
			...current,
			...patch
		}));
	}, []);
	const value = (0, import_react.useMemo)(() => ({
		theme,
		toggleTheme,
		section,
		open,
		field,
		setField,
		booted
	}), [
		theme,
		toggleTheme,
		section,
		open,
		field,
		setField,
		booted
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabContext.Provider, {
		value,
		children
	});
}
function useLab() {
	const value = (0, import_react.useContext)(LabContext);
	if (!value) throw new Error("useLab fora do LabProvider");
	return value;
}
var INK = {
	dark: {
		bg: "#09090b",
		dot: "rgba(236,234,227,0.72)",
		link: "rgba(236,234,227,0.16)"
	},
	light: {
		bg: "#f3f1ea",
		dot: "rgba(22,22,20,0.62)",
		link: "rgba(22,22,20,0.14)"
	}
};
var CHANNELS = [
	"rgba(255,59,78,0.55)",
	"rgba(232,255,87,0.35)",
	"rgba(62,203,255,0.55)"
];
function FieldCanvas() {
	const canvasRef = (0, import_react.useRef)(null);
	const { theme, field } = useLab();
	const themeRef = (0, import_react.useRef)(theme);
	const fieldRef = (0, import_react.useRef)(field);
	themeRef.current = theme;
	fieldRef.current = field;
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const mouse = {
			x: -9999,
			y: -9999,
			on: false
		};
		let width = 0;
		let height = 0;
		let dpr = 1;
		let particles = [];
		let raf = 0;
		let running = true;
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const seed = () => {
			particles = Array.from({ length: 140 }, (_, index) => ({
				x: Math.random() * width,
				y: Math.random() * height,
				vx: (Math.random() - .5) * .45,
				vy: (Math.random() - .5) * .45,
				p: index / 140
			}));
		};
		const resize = () => {
			dpr = Math.min(window.devicePixelRatio || 1, 2);
			width = window.innerWidth;
			height = window.innerHeight;
			canvas.width = Math.floor(width * dpr);
			canvas.height = Math.floor(height * dpr);
			canvas.style.width = "100%";
			canvas.style.height = "100%";
			seed();
		};
		const drawRay = (x0, y0, angle, length, spread) => {
			const dx = Math.cos(angle);
			const dy = Math.sin(angle);
			const px = -dy;
			const py = dx;
			CHANNELS.forEach((color, index) => {
				const shift = (index - 1) * spread;
				ctx.beginPath();
				ctx.strokeStyle = color;
				ctx.lineWidth = 1.1;
				ctx.moveTo(x0 + px * shift, y0 + py * shift);
				ctx.lineTo(x0 + dx * length + px * shift, y0 + dy * length + py * shift);
				ctx.stroke();
			});
		};
		const frame = (time) => {
			if (!running) return;
			const ink = INK[themeRef.current];
			const params = fieldRef.current;
			const active = Math.max(12, Math.round(params.count * (width < 720 ? .55 : 1)));
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			ctx.fillStyle = ink.bg;
			ctx.fillRect(0, 0, width, height);
			const originX = mouse.on ? mouse.x : width * .5;
			const originY = mouse.on ? mouse.y : height * .42;
			const spin = reduce ? .4 : time * 18e-5 * (.4 + params.speed);
			for (let ray = 0; ray < 5; ray += 1) {
				const angle = spin + Math.PI * 2 * ray / 5;
				drawRay(originX, originY, angle, Math.min(width, height) * .42, params.dispersion);
			}
			const linkDist = params.link;
			for (let i = 0; i < active; i += 1) {
				const a = particles[i];
				if (!a) continue;
				if (!reduce) {
					a.x += a.vx * (.35 + params.speed);
					a.y += a.vy * (.35 + params.speed);
					if (mouse.on) {
						const dx = mouse.x - a.x;
						const dy = mouse.y - a.y;
						const dist = Math.hypot(dx, dy) || 1;
						if (dist < 180) {
							a.vx += dx / dist * .01;
							a.vy += dy / dist * .01;
						}
					}
					a.vx *= .992;
					a.vy *= .992;
					if (a.x < 0 || a.x > width) a.vx *= -1;
					if (a.y < 0 || a.y > height) a.vy *= -1;
					a.x = Math.max(0, Math.min(width, a.x));
					a.y = Math.max(0, Math.min(height, a.y));
				}
				for (let j = i + 1; j < active; j += 1) {
					const b = particles[j];
					if (!b) continue;
					const dx = a.x - b.x;
					const dy = a.y - b.y;
					if (Math.hypot(dx, dy) < linkDist) {
						ctx.strokeStyle = ink.link;
						ctx.lineWidth = 1;
						ctx.beginPath();
						ctx.moveTo(a.x, a.y);
						ctx.lineTo(b.x, b.y);
						ctx.stroke();
					}
				}
				ctx.fillStyle = ink.dot;
				ctx.beginPath();
				ctx.arc(a.x, a.y, a.p > .92 ? 2.2 : 1.15, 0, Math.PI * 2);
				ctx.fill();
			}
			if (!reduce) raf = requestAnimationFrame(frame);
		};
		const onMove = (event) => {
			mouse.x = event.clientX;
			mouse.y = event.clientY;
			mouse.on = true;
		};
		const onLeave = () => {
			mouse.on = false;
		};
		resize();
		raf = requestAnimationFrame(frame);
		window.addEventListener("resize", resize);
		window.addEventListener("pointermove", onMove, { passive: true });
		window.addEventListener("pointerleave", onLeave);
		return () => {
			running = false;
			cancelAnimationFrame(raf);
			window.removeEventListener("resize", resize);
			window.removeEventListener("pointermove", onMove);
			window.removeEventListener("pointerleave", onLeave);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref: canvasRef,
		"aria-hidden": "true",
		className: "pointer-events-none fixed inset-0 z-0 h-full w-full"
	});
}
var loadMixer = () => import("./mixer-CFhorxCx.mjs").then((mod) => ({ default: mod.Mixer }));
var loadShades = () => import("./shades-BIludNNy.mjs").then((mod) => ({ default: mod.Shades }));
var loadCollection = () => import("./collection-DqpEf3ky.mjs").then((mod) => ({ default: mod.Collection }));
var loadPasswords = () => import("./passwords-BMzY2n5b.mjs").then((mod) => ({ default: mod.Passwords }));
var loadQr = () => import("./qr-5rLvUows.mjs").then((mod) => ({ default: mod.QrTool }));
var loadGradient = () => import("./gradient-CsAO_znU.mjs").then((mod) => ({ default: mod.GradientTool }));
var loadRaios = () => import("./experiments-Bs2FwQ0E.mjs").then((mod) => ({ default: mod.Raios }));
var loadAscii = () => import("./experiments-Bs2FwQ0E.mjs").then((mod) => ({ default: mod.AsciiPrism }));
var loadPaleta = () => import("./experiments-Bs2FwQ0E.mjs").then((mod) => ({ default: mod.Paleta }));
var loadGrade = () => import("./experiments-Bs2FwQ0E.mjs").then((mod) => ({ default: mod.Grade }));
var loadSobre = () => import("./experiments-Bs2FwQ0E.mjs").then((mod) => ({ default: mod.Sobre }));
var Mixer = (0, import_react.lazy)(loadMixer);
var Shades = (0, import_react.lazy)(loadShades);
var Collection = (0, import_react.lazy)(loadCollection);
var Passwords = (0, import_react.lazy)(loadPasswords);
var QrTool = (0, import_react.lazy)(loadQr);
var GradientTool = (0, import_react.lazy)(loadGradient);
var Raios = (0, import_react.lazy)(loadRaios);
var AsciiPrism = (0, import_react.lazy)(loadAscii);
var Paleta = (0, import_react.lazy)(loadPaleta);
var Grade = (0, import_react.lazy)(loadGrade);
var Sobre = (0, import_react.lazy)(loadSobre);
var LOAD = {
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
	sobre: loadSobre
};
var warmed = /* @__PURE__ */ new Set();
function warm(id) {
	const key = id === "raios" || id === "ascii" || id === "paleta" || id === "grade" || id === "sobre" ? "studio" : id;
	if (warmed.has(key)) return;
	warmed.add(key);
	LOAD[id]();
}
function allowIdleWarm() {
	const connection = navigator.connection;
	if (!connection) return true;
	if (connection.saveData) return false;
	return connection.effectiveType !== "2g" && connection.effectiveType !== "slow-2g";
}
var BOOT = "> ACESSANDO PRISMA... CONEXÃO ESTABELECIDA";
function useClock() {
	const [value, setValue] = (0, import_react.useState)("––:––:––");
	(0, import_react.useEffect)(() => {
		const tick = () => {
			setValue((/* @__PURE__ */ new Date()).toLocaleTimeString("pt-BR", {
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
				timeZone: "America/Sao_Paulo"
			}));
		};
		tick();
		const id = window.setInterval(tick, 1e3);
		return () => window.clearInterval(id);
	}, []);
	return value;
}
function Wordmark() {
	const [{ x, y }, setOffset] = (0, import_react.useState)({
		x: 0,
		y: 0
	});
	(0, import_react.useEffect)(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		let frame = 0;
		const onMove = (event) => {
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
				setOffset({
					x: 0,
					y: 0
				});
				return;
			}
			const force = (1 - dist / reach) * 14;
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(() => {
				setOffset({
					x: -(dx / dist) * force,
					y: -(dy / dist) * force
				});
			});
		};
		window.addEventListener("pointermove", onMove, { passive: true });
		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener("pointermove", onMove);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		id: "prisma-word",
		className: "prism-title mx-auto max-w-full font-display text-5xl font-extrabold tracking-tight text-balance text-fg sm:text-7xl md:text-8xl",
		style: { transform: `translate(${x}px, ${y}px)` },
		children: "PRISMA"
	});
}
function Mark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: "size-5 text-fg",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M16 4 L28 27 H4 Z",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.4"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M16 11 L23 25 H9 Z",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.2",
			opacity: "0.55"
		})]
	});
}
var MATRIX = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789";
function MatrixLine({ text }) {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			el.textContent = text;
			return;
		}
		const chars = [...text];
		const spans = chars.map((char) => {
			const span = document.createElement("span");
			span.style.display = "inline-block";
			span.textContent = char === " " ? "\xA0" : MATRIX[Math.floor(Math.random() * 56)] ?? char;
			if (char !== " ") {
				span.style.color = "var(--color-accent)";
				span.style.textShadow = "0 0 10px var(--color-accent)";
			}
			return span;
		});
		el.replaceChildren(...spans);
		const intervals = [];
		const timeouts = [];
		spans.forEach((span, index) => {
			const char = chars[index] ?? "";
			if (char === " ") return;
			const scramble = window.setInterval(() => {
				span.textContent = MATRIX[Math.floor(Math.random() * 56)] ?? char;
			}, 50);
			intervals.push(scramble);
			const lockDelay = (index * .06 + Math.random() * .4) * 1e3;
			timeouts.push(window.setTimeout(() => {
				window.clearInterval(scramble);
				span.textContent = char;
				span.style.color = "";
				span.animate([{ textShadow: "0 0 16px var(--color-accent)" }, { textShadow: "0 0 0 transparent" }], {
					duration: 500,
					easing: "ease-out",
					fill: "forwards"
				});
			}, lockDelay));
		});
		return () => {
			intervals.forEach((id) => window.clearInterval(id));
			timeouts.forEach((id) => window.clearTimeout(id));
		};
	}, [text]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		ref,
		"aria-hidden": "true",
		children: text
	});
}
function TopBar() {
	const { theme, toggleTheme } = useLab();
	const clock = useClock();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid h-14 max-w-6xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden text-xs uppercase tracking-widest text-muted md:inline",
						children: "Prisma Lab"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"aria-label": BOOT,
					className: "truncate text-center text-[11px] uppercase text-muted sm:text-xs",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatrixLine, { text: BOOT })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden tabular-nums text-xs text-muted lg:inline",
							children: clock
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden text-xs uppercase tracking-widest text-muted sm:inline",
							children: "Brasil"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: toggleTheme,
							"aria-label": theme === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro",
							className: "inline-flex size-8 items-center justify-center rounded-panel border border-line text-fg hover:bg-surface",
							children: theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-3.5" })
						})
					]
				})
			]
		})
	});
}
function Tree({ compact = false, expanded, onToggle }) {
	const { section, open } = useLab();
	const [folderOpen, setFolderOpen] = (0, import_react.useState)(true);
	if (!expanded) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: onToggle,
		"aria-expanded": false,
		className: "flex min-h-11 w-full items-center gap-2 rounded-panel border border-line bg-surface/80 px-3 text-left text-sm text-muted backdrop-blur-md hover:text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "w-4 text-accent",
			"aria-hidden": "true",
			children: "+"
		}), "Tools"]
	});
	if (compact) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		"aria-label": "Tools",
		className: "flex gap-1 overflow-x-auto rounded-panel border border-line bg-surface/80 p-2 backdrop-blur-md",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onToggle,
				"aria-expanded": true,
				"aria-label": "Fechar menu",
				className: "inline-flex size-11 shrink-0 items-center justify-center rounded-panel text-accent hover:text-fg",
				children: "−"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => open(null),
				className: "min-h-11 shrink-0 rounded-panel px-3 text-sm " + (section === null ? "bg-bg text-fg" : "text-muted"),
				children: "Início"
			}),
			EXPERIMENTS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => open(item.id),
				onPointerEnter: () => warm(item.id),
				onFocus: () => warm(item.id),
				className: "min-h-11 shrink-0 rounded-panel px-3 text-sm " + (section === item.id ? "bg-bg text-accent" : "text-muted"),
				children: item.name
			}, item.id))
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		"aria-label": "Tools",
		className: "rounded-panel border border-line bg-surface/80 p-3 backdrop-blur-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: onToggle,
			"aria-expanded": true,
			className: "flex min-h-11 w-full items-center gap-2 border-b border-line px-2 text-left text-xs font-medium uppercase tracking-widest text-muted hover:text-fg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-accent",
				"aria-hidden": "true",
				children: "−"
			}), "Prisma Studio"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2 flex flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => open(null),
					className: "flex min-h-11 items-center gap-2 rounded-panel px-2 text-left text-sm " + (section === null ? "bg-bg text-fg" : "text-muted hover:text-fg"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: section === null ? "text-accent" : "text-muted",
						"aria-hidden": "true",
						children: "•"
					}), "Início"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setFolderOpen((value) => !value),
					"aria-expanded": folderOpen,
					className: "flex min-h-11 items-center gap-2 rounded-panel px-2 text-left text-xs uppercase tracking-widest text-muted hover:text-fg",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-4 text-accent",
							"aria-hidden": "true",
							children: folderOpen ? "−" : "+"
						}),
						"Tools (",
						EXPERIMENTS.length,
						")"
					]
				}),
				folderOpen ? EXPERIMENTS.map((item) => {
					const active = section === item.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => open(item.id),
						onPointerEnter: () => warm(item.id),
						onFocus: () => warm(item.id),
						className: "flex min-h-11 w-full items-center rounded-panel px-2 text-left text-xs whitespace-nowrap " + (active ? "bg-bg text-fg" : "text-muted hover:text-fg"),
						children: item.name
					}, item.id);
				}) : null
			]
		})]
	});
}
function ExperimentView({ id }) {
	const { open } = useLab();
	const item = findExperiment(id);
	if (!item) return null;
	const mixer = id === "mixer";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-panel border border-line bg-surface/85 backdrop-blur-md " + (mixer ? "p-3 md:p-4" : "p-4 md:p-6"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-start justify-between gap-3 " + (mixer ? "mb-3" : "mb-5"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-widest text-accent",
						children: item.index
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display font-extrabold tracking-tight text-balance " + (mixer ? "text-2xl md:text-3xl" : "text-3xl"),
						children: item.name
					}),
					mixer ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: item.blurb
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => open(null),
				className: "min-h-11 rounded-panel border border-line px-3 text-xs uppercase tracking-widest text-muted hover:text-fg",
				children: "Fechar"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Suspense, {
			fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-6 text-sm text-muted",
				children: "Carregando…"
			}),
			children: [
				id === "mixer" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mixer, {}) : null,
				id === "raios" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Raios, {}) : null,
				id === "ascii" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AsciiPrism, {}) : null,
				id === "paleta" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paleta, {}) : null,
				id === "grade" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grade, {}) : null,
				id === "shades" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shades, {}) : null,
				id === "collection" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection, {}) : null,
				id === "passwords" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Passwords, {}) : null,
				id === "qr" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrTool, {}) : null,
				id === "gradient" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GradientTool, {}) : null,
				id === "sobre" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sobre, {}) : null
			]
		})]
	});
}
function HomeStage() {
	const { open } = useLab();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-panel border border-line bg-surface/75 px-4 py-10 text-center backdrop-blur-md md:py-14",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-6 max-w-xl text-xs uppercase leading-relaxed tracking-widest text-muted",
					children: "Experimental Design Studio • Creative Technology Lab"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-3 max-w-md text-sm leading-relaxed text-pretty text-fg/80",
					children: "Um campo espectral com ferramentas vivas. Abre uma ferramenta — o fundo reage junto."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "overflow-hidden rounded-panel border border-line bg-surface/80 backdrop-blur-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-b border-line px-4 py-3 text-xs uppercase tracking-widest text-muted",
				children: "> prisma --lab"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: EXPERIMENTS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "border-b border-line last:border-b-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => open(item.id),
					onPointerEnter: () => warm(item.id),
					onFocus: () => warm(item.id),
					className: "flex min-h-14 w-full items-center gap-3 px-4 text-left hover:bg-bg/60",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-8 shrink-0 text-xs tabular-nums text-accent",
							children: item.key
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "min-w-0 flex-1 text-sm text-fg sm:w-56 sm:flex-none",
							children: item.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden flex-1 text-sm text-muted sm:block",
							children: item.blurb
						})
					]
				})
			}, item.id)) })]
		})]
	});
}
function LabShell() {
	const { section, open } = useLab();
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		if (!allowIdleWarm()) return;
		const id = window.requestIdleCallback(() => {
			warm("raios");
			warm("shades");
			warm("passwords");
		}, { timeout: 2500 });
		return () => window.cancelIdleCallback(id);
	}, []);
	(0, import_react.useEffect)(() => {
		const onKey = (event) => {
			const target = event.target;
			if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement) return;
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldCanvas, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": "true",
				className: "pointer-events-none fixed inset-0 z-10 opacity-10",
				style: { backgroundImage: "repeating-linear-gradient(to bottom, transparent 0 2px, var(--color-fg) 2px 3px)" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "relative z-20 mx-auto flex max-w-6xl flex-col gap-4 px-4 pb-16 pt-20 " + (mixer ? "" : "md:flex-row"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: mixer ? "" : "md:sticky md:top-20 md:shrink-0 md:self-start " + (menuOpen ? "md:w-64" : "md:w-44"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tree, {
						compact: mixer,
						expanded: menuOpen,
						onToggle: () => setMenuOpen((value) => !value)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-w-0 flex-1",
					children: section ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExperimentView, { id: section }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeStage, {})
				})]
			})
		]
	});
}
function LabApp() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabShell, {}) });
}
var routes_exports = /* @__PURE__ */ __exportAll({ component: () => Home });
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabApp, {});
}
//#endregion
export { DEFAULT_FIELD as n, useLab as r, routes_exports as t };
