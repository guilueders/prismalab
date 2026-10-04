import { i as __toESM } from "../_runtime.mjs";
import { G as require_jsx_runtime, K as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Download, D as Check, E as Copy } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/qr-5rLvUows.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EMPTY_CARD = {
	firstName: "",
	lastName: "",
	organization: "",
	title: "",
	email: "",
	phone: "",
	website: "",
	address: ""
};
var DOTS = [
	{
		value: "square",
		label: "Quadrado"
	},
	{
		value: "rounded",
		label: "Redondo"
	},
	{
		value: "dots",
		label: "Pontos"
	},
	{
		value: "classy",
		label: "Caligráfico"
	},
	{
		value: "classy-rounded",
		label: "Misto"
	},
	{
		value: "extra-rounded",
		label: "Bolha"
	}
];
var CORNER_SQUARES = [
	{
		value: "square",
		label: "Quadrado"
	},
	{
		value: "dot",
		label: "Círculo"
	},
	{
		value: "extra-rounded",
		label: "Arredondado"
	}
];
var CORNER_DOTS = [{
	value: "square",
	label: "Quadrado"
}, {
	value: "dot",
	label: "Círculo"
}];
var LEVELS = [
	{
		value: "L",
		label: "Baixa"
	},
	{
		value: "M",
		label: "Média"
	},
	{
		value: "Q",
		label: "Alta"
	},
	{
		value: "H",
		label: "Máxima"
	}
];
var PRESETS = [
	{
		label: "URL",
		value: "https://example.com"
	},
	{
		label: "E-mail",
		value: "mailto:hello@example.com"
	},
	{
		label: "Telefone",
		value: "tel:+5511999999999"
	},
	{
		label: "Wi-Fi",
		value: "WIFI:T:WPA;S:NetworkName;P:password;;"
	},
	{
		label: "SMS",
		value: "sms:+5511999999999?body=Oi"
	},
	{
		label: "Local",
		value: "geo:-27.157,-48.596"
	}
];
var QUICK = [
	{
		label: "Clássico",
		dot: "square",
		square: "square",
		corner: "square",
		fg: "#000000",
		bg: "#ffffff"
	},
	{
		label: "Redondo",
		dot: "rounded",
		square: "extra-rounded",
		corner: "dot",
		fg: "#000000",
		bg: "#ffffff"
	},
	{
		label: "Pontos",
		dot: "dots",
		square: "dot",
		corner: "dot",
		fg: "#000000",
		bg: "#ffffff"
	},
	{
		label: "Elegante",
		dot: "classy-rounded",
		square: "extra-rounded",
		corner: "dot",
		fg: "#000000",
		bg: "#ffffff"
	},
	{
		label: "Índigo",
		dot: "rounded",
		square: "extra-rounded",
		corner: "dot",
		fg: "#6366f1",
		bg: "#ffffff"
	},
	{
		label: "Rosa",
		dot: "extra-rounded",
		square: "extra-rounded",
		corner: "dot",
		fg: "#e11d48",
		bg: "#ffffff"
	},
	{
		label: "Verde",
		dot: "classy",
		square: "square",
		corner: "square",
		fg: "#0d9488",
		bg: "#ffffff"
	},
	{
		label: "Âmbar",
		dot: "rounded",
		square: "extra-rounded",
		corner: "dot",
		fg: "#d97706",
		bg: "#ffffff"
	},
	{
		label: "Violeta",
		dot: "classy-rounded",
		square: "extra-rounded",
		corner: "dot",
		fg: "#7c3aed",
		bg: "#ffffff"
	}
];
var field = "min-h-11 w-full rounded-panel border border-line bg-bg px-3 text-sm text-fg";
var label = "flex flex-col gap-2 text-xs uppercase tracking-widest text-muted";
function sealSvgSeams(svg, strokeWidth = .5) {
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
function escapeWifi(value) {
	return value.replace(/[\\;,":]/g, "\\$&");
}
function vcardString(data) {
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
function wifiString(data) {
	if (!data.ssid.trim()) return "";
	if (data.securityType !== "nopass" && !data.password) return "";
	let out = `WIFI:T:${data.securityType};S:${escapeWifi(data.ssid)}`;
	if (data.securityType !== "nopass") out += `;P:${escapeWifi(data.password)}`;
	if (data.isHidden) out += ";H:true";
	return `${out};;`;
}
function downloadBlob(blob, name) {
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = name;
	link.click();
	URL.revokeObjectURL(url);
}
function blobToDataUrl(blob) {
	return new Promise((resolve) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(String(reader.result));
		reader.readAsDataURL(blob);
	});
}
function QrTool() {
	const [mode, setMode] = (0, import_react.useState)("single");
	const [content, setContent] = (0, import_react.useState)("https://example.com");
	const [card, setCard] = (0, import_react.useState)(EMPTY_CARD);
	const [wifi, setWifi] = (0, import_react.useState)({
		ssid: "",
		password: "",
		securityType: "WPA",
		isHidden: false
	});
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [batch, setBatch] = (0, import_react.useState)("");
	const [size, setSize] = (0, import_react.useState)(300);
	const [margin, setMargin] = (0, import_react.useState)(8);
	const [foreground, setForeground] = (0, import_react.useState)("#000000");
	const [background, setBackground] = (0, import_react.useState)("#ffffff");
	const [transparent, setTransparent] = (0, import_react.useState)(false);
	const [dotType, setDotType] = (0, import_react.useState)("square");
	const [cornerSquare, setCornerSquare] = (0, import_react.useState)("square");
	const [cornerDot, setCornerDot] = (0, import_react.useState)("square");
	const [level, setLevel] = (0, import_react.useState)("M");
	const [logo, setLogo] = (0, import_react.useState)(null);
	const [logoSize, setLogoSize] = (0, import_react.useState)(.3);
	const [logoMargin, setLogoMargin] = (0, import_react.useState)(4);
	const [image, setImage] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [failed, setFailed] = (0, import_react.useState)(false);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [zipping, setZipping] = (0, import_react.useState)(false);
	const qrRef = (0, import_react.useRef)(null);
	const lines = batch.split(/\r?\n/).map((line) => line.trim()).filter((line) => line.length > 0);
	const cardReady = Object.values(card).some((value) => value.trim());
	const payload = mode === "wifi" ? wifiString(wifi) : mode === "vcard" ? cardReady ? vcardString(card) : "" : mode === "batch" ? lines[0] ?? "" : content;
	const style = () => {
		const options = {
			width: size,
			height: size,
			type: "svg",
			data: payload,
			margin,
			qrOptions: { errorCorrectionLevel: level },
			dotsOptions: {
				type: dotType,
				color: foreground
			},
			cornersSquareOptions: {
				type: cornerSquare,
				color: foreground
			},
			cornersDotOptions: {
				type: cornerDot,
				color: foreground
			},
			backgroundOptions: { color: transparent ? "transparent" : background }
		};
		if (logo) {
			options.image = logo;
			options.imageOptions = {
				crossOrigin: "anonymous",
				margin: logoMargin,
				imageSize: logoSize,
				hideBackgroundDots: true
			};
		}
		return options;
	};
	(0, import_react.useEffect)(() => {
		if (!payload.trim()) {
			qrRef.current = null;
			setImage(null);
			setFailed(false);
			setBusy(false);
			return;
		}
		let cancel = false;
		const timer = window.setTimeout(() => {
			(async () => {
				setBusy(true);
				try {
					const { default: Styling } = await import("../_libs/qr-code-styling.mjs").then((n) => /* @__PURE__ */ __toESM(n.t()));
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
	}, [
		payload,
		size,
		margin,
		foreground,
		background,
		transparent,
		dotType,
		cornerSquare,
		cornerDot,
		level,
		logo,
		logoSize,
		logoMargin
	]);
	const download = async (format) => {
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
		downloadBlob(raw instanceof Blob ? raw : new Blob([raw], { type: "image/png" }), `qr-code-${stamp}.png`);
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
			const [{ default: Styling }, { default: JSZip }] = await Promise.all([import("../_libs/qr-code-styling.mjs").then((n) => /* @__PURE__ */ __toESM(n.t())), import("../_libs/jszip+[...].mjs").then((n) => /* @__PURE__ */ __toESM(n.t()))]);
			const zip = new JSZip();
			for (const line of lines) {
				const blob = await new Styling({
					...style(),
					data: line
				}).getRawData("png");
				if (!(blob instanceof Blob)) continue;
				const safe = line.slice(0, 30).replace(/[^a-zA-Z0-9]/g, "_") || "qr";
				zip.file(`qr-${safe}.png`, blob);
			}
			downloadBlob(await zip.generateAsync({ type: "blob" }), `qr-codes-${Date.now()}.zip`);
		} finally {
			setZipping(false);
		}
	};
	const readLogo = (file) => {
		if (!file) return;
		const reader = new FileReader();
		reader.onload = () => setLogo(String(reader.result));
		reader.readAsDataURL(file);
	};
	const empty = mode === "wifi" ? wifi.ssid.trim() && wifi.securityType !== "nopass" && !wifi.password ? "Coloca a senha pra gerar o código." : "Preenche a rede pra gerar o código." : mode === "vcard" ? "Preenche o contato pra gerar o código." : mode === "batch" ? "Uma linha por código." : "Escreve um texto ou uma URL.";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "inline-flex flex-wrap rounded-panel border border-line",
				role: "group",
				"aria-label": "Modo",
				children: [
					["single", "Texto"],
					["wifi", "Wi-Fi"],
					["vcard", "Contato"],
					["batch", "Lote"]
				].map(([id, name]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-pressed": mode === id,
					onClick: () => setMode(id),
					className: "min-h-11 px-3 text-sm " + (mode === id ? "bg-bg text-accent" : "text-muted hover:text-fg"),
					children: name
				}, id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3",
					children: [
						mode === "single" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: label,
							children: ["Conteúdo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: content,
								"aria-label": "Conteúdo",
								onChange: (event) => setContent(event.target.value),
								placeholder: "URL, texto ou dado",
								className: field + " min-h-24 py-3"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-1",
							children: PRESETS.map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setContent(preset.value),
								className: "min-h-11 rounded-panel border border-line px-3 text-xs uppercase tracking-widest text-muted hover:text-fg",
								children: preset.label
							}, preset.label))
						})] }) : null,
						mode === "wifi" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: label + " sm:col-span-2",
									children: ["Nome da rede", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: wifi.ssid,
										"aria-label": "Nome da rede",
										onChange: (event) => setWifi({
											...wifi,
											ssid: event.target.value
										}),
										className: field
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: label,
									children: ["Segurança", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: wifi.securityType,
										"aria-label": "Segurança",
										onChange: (event) => setWifi({
											...wifi,
											securityType: event.target.value
										}),
										className: field,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "nopass",
												children: "Sem senha"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "WPA",
												children: "WPA/WPA2"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "WEP",
												children: "WEP"
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: label,
									children: ["Senha", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: showPassword ? "text" : "password",
											value: wifi.securityType === "nopass" ? "" : wifi.password,
											disabled: wifi.securityType === "nopass",
											"aria-label": "Senha da rede",
											placeholder: wifi.securityType === "nopass" ? "Rede aberta" : "Senha da rede",
											onChange: (event) => setWifi({
												...wifi,
												password: event.target.value
											}),
											className: field + " disabled:opacity-40"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											"aria-pressed": showPassword,
											disabled: wifi.securityType === "nopass",
											onClick: () => setShowPassword((value) => !value),
											className: "min-h-11 rounded-panel border border-line px-3 text-xs uppercase tracking-widest text-muted hover:text-fg disabled:opacity-40",
											children: showPassword ? "Ocultar" : "Ver"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex min-h-11 items-center justify-between gap-3 rounded-panel border border-line px-3 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm text-fg",
										children: "Rede oculta"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: wifi.isHidden,
										onChange: (event) => setWifi({
											...wifi,
											isHidden: event.target.checked
										}),
										className: "size-5 accent-accent"
									})]
								})
							]
						}) : null,
						mode === "vcard" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-3 sm:grid-cols-2",
							children: [
								["firstName", "Nome"],
								["lastName", "Sobrenome"],
								["organization", "Organização"],
								["title", "Cargo"],
								["email", "E-mail"],
								["phone", "Telefone"],
								["website", "Site"],
								["address", "Endereço"]
							].map(([key, name]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: label,
								children: [name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: card[key],
									"aria-label": name,
									onChange: (event) => setCard({
										...card,
										[key]: event.target.value
									}),
									className: field
								})]
							}, key))
						}) : null,
						mode === "batch" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: label,
							children: ["Uma linha por código", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: batch,
								"aria-label": "Lista do lote",
								onChange: (event) => setBatch(event.target.value),
								placeholder: "https://um.com\nhttps://dois.com",
								className: field + " min-h-36 py-3"
							})]
						}) : null
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 rounded-panel border border-line bg-bg/40 p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex aspect-square items-center justify-center overflow-hidden rounded-panel bg-white",
							children: image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: image,
								alt: "Código QR",
								className: "h-full w-full object-contain"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "px-4 text-center text-sm text-black/60",
								children: failed ? "Esse conteúdo não cabe num QR." : empty
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									disabled: !image,
									onClick: () => void download("png"),
									className: "inline-flex min-h-11 items-center gap-2 rounded-panel bg-accent px-3 text-sm font-medium text-accent-ink disabled:opacity-40",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), "PNG"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									disabled: !image,
									onClick: () => void download("svg"),
									className: "inline-flex min-h-11 items-center gap-2 rounded-panel border border-line px-3 text-xs uppercase tracking-widest text-muted hover:text-fg disabled:opacity-40",
									children: "SVG"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									disabled: !image,
									onClick: () => void copy(),
									className: "inline-flex min-h-11 items-center gap-2 rounded-panel border border-line px-3 text-xs uppercase tracking-widest text-muted hover:text-fg disabled:opacity-40",
									children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-accent" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), copied ? "Copiado" : "Copiar"]
								})
							]
						}),
						mode === "batch" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: !lines.length || zipping,
							onClick: () => void downloadZip(),
							className: "inline-flex min-h-11 items-center justify-center rounded-panel border border-line px-3 text-xs uppercase tracking-widest text-muted hover:text-fg disabled:opacity-40",
							children: zipping ? "Gerando…" : `Baixar ZIP · ${lines.length}`
						}) : null,
						busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-widest text-muted",
							children: "Gerando…"
						}) : null
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-widest text-muted",
						children: "Estilo"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-1",
						children: QUICK.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								setDotType(item.dot);
								setCornerSquare(item.square);
								setCornerDot(item.corner);
								setForeground(item.fg);
								setBackground(item.bg);
								setTransparent(false);
							},
							className: "inline-flex min-h-11 items-center gap-2 rounded-panel border border-line px-3 text-sm text-muted hover:text-fg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "size-4 rounded-panel border border-line",
								style: { background: item.fg }
							}), item.label]
						}, item.label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: label,
								children: ["Módulos", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: dotType,
									"aria-label": "Módulos",
									onChange: (event) => setDotType(event.target.value),
									className: field,
									children: DOTS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: item.value,
										children: item.label
									}, item.value))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: label,
								children: ["Cantos", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: cornerSquare,
									"aria-label": "Cantos",
									onChange: (event) => setCornerSquare(event.target.value),
									className: field,
									children: CORNER_SQUARES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: item.value,
										children: item.label
									}, item.value))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: label,
								children: ["Centro do canto", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: cornerDot,
									"aria-label": "Centro do canto",
									onChange: (event) => setCornerDot(event.target.value),
									className: field,
									children: CORNER_DOTS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: item.value,
										children: item.label
									}, item.value))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: label,
								children: ["Cor", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "color",
										value: foreground,
										"aria-label": "Cor do código",
										onChange: (event) => setForeground(event.target.value),
										className: "size-11 shrink-0 cursor-pointer rounded-panel border border-line bg-bg p-1"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: foreground,
										"aria-label": "Cor do código em hex",
										onChange: (event) => setForeground(event.target.value),
										className: field + " font-mono"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: label,
								children: ["Fundo", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "color",
										value: background,
										disabled: transparent,
										"aria-label": "Cor de fundo",
										onChange: (event) => setBackground(event.target.value),
										className: "size-11 shrink-0 cursor-pointer rounded-panel border border-line bg-bg p-1 disabled:opacity-40"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: background,
										disabled: transparent,
										"aria-label": "Fundo em hex",
										onChange: (event) => setBackground(event.target.value),
										className: field + " font-mono disabled:opacity-40"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex min-h-11 items-center justify-between gap-3 rounded-panel border border-line px-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-fg",
									children: "Fundo transparente"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: transparent,
									onChange: (event) => setTransparent(event.target.checked),
									className: "size-5 accent-accent"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: label + " sm:col-span-2 lg:col-span-3",
								children: ["Correção", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "inline-flex flex-wrap rounded-panel border border-line",
									role: "group",
									"aria-label": "Correção de erro",
									children: LEVELS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										"aria-pressed": level === item.value,
										onClick: () => setLevel(item.value),
										className: "min-h-11 px-3 text-sm " + (level === item.value ? "bg-bg text-accent" : "text-muted hover:text-fg"),
										children: item.label
									}, item.value))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex min-h-11 items-center gap-3 rounded-panel border border-line px-3 sm:col-span-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm text-muted",
										children: "Margem"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "range",
										min: 0,
										max: 32,
										value: margin,
										"aria-label": "Margem",
										onChange: (event) => setMargin(Number(event.target.value)),
										className: "min-w-0 flex-1"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-8 text-right text-sm tabular-nums",
										children: margin
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex min-h-11 items-center gap-3 rounded-panel border border-line px-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm text-muted",
										children: "Tamanho"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "range",
										min: 160,
										max: 640,
										step: 20,
										value: size,
										"aria-label": "Tamanho",
										onChange: (event) => setSize(Number(event.target.value)),
										className: "min-w-0 flex-1"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-10 text-right text-sm tabular-nums",
										children: size
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "inline-flex min-h-11 cursor-pointer items-center rounded-panel border border-line px-3 text-xs uppercase tracking-widest text-muted hover:text-fg",
							children: ["Logo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "file",
								accept: "image/*",
								className: "sr-only",
								onChange: (event) => readLogo(event.target.files?.[0])
							})]
						}), logo ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setLogo(null),
							className: "min-h-11 rounded-panel border border-line px-3 text-xs uppercase tracking-widest text-muted hover:text-fg",
							children: "Tirar logo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex min-h-11 min-w-48 flex-1 items-center gap-3 rounded-panel border border-line px-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-muted",
								children: "Logo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "range",
								min: .15,
								max: .4,
								step: .01,
								value: logoSize,
								"aria-label": "Tamanho da logo",
								onChange: (event) => setLogoSize(Number(event.target.value)),
								className: "min-w-0 flex-1"
							})]
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Um logo no centro pede correção alta."
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { QrTool };
