import { i as __toESM } from "../_runtime.mjs";
import { G as require_jsx_runtime, K as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Download, D as Check, E as Copy, S as Lock, T as Search, _ as Trash2, b as Minus, v as Shuffle, w as ArrowLeft, x as LockOpen, y as Plus } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/collection-DqpEf3ky.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STRATEGY_CATEGORIES = {
	random: "Random",
	"color-theory": "Color Theory",
	mood: "Moods",
	era: "Decades & Eras",
	nature: "Nature & Scenes",
	cultural: "Art & Culture"
};
var STRATEGY_INFO = {
	"true-random": {
		name: "Chaos",
		description: "Completely random, no rules",
		category: "random"
	},
	"random-cohesive": {
		name: "Random",
		description: "Random cohesive palette",
		category: "random"
	},
	analogous: {
		name: "Analogous",
		description: "Adjacent hues on the colour wheel",
		category: "color-theory"
	},
	complementary: {
		name: "Complementary",
		description: "Opposite hues for high contrast",
		category: "color-theory"
	},
	triadic: {
		name: "Triadic",
		description: "Three evenly spaced hues",
		category: "color-theory"
	},
	"split-complementary": {
		name: "Split-Comp",
		description: "Base + two adjacent to complement",
		category: "color-theory"
	},
	tetradic: {
		name: "Tetradic",
		description: "Four evenly spaced hues",
		category: "color-theory"
	},
	monochromatic: {
		name: "Mono",
		description: "Single hue, varied lightness",
		category: "color-theory"
	},
	thermos: {
		name: "Thermos",
		description: "Warm, cozy, retro tones",
		category: "mood"
	},
	specimen: {
		name: "Specimen",
		description: "Cool, clinical, preserved",
		category: "mood"
	},
	souvenir: {
		name: "Souvenir",
		description: "Soft, faded pastels",
		category: "mood"
	},
	curfew: {
		name: "Curfew",
		description: "Dark, moody depths",
		category: "mood"
	},
	telegraph: {
		name: "Telegraph",
		description: "Muted vintage sepia",
		category: "mood"
	},
	"70s": {
		name: "1970s",
		description: "Earth tones, burnt orange, avocado",
		category: "era"
	},
	"80s": {
		name: "1980s",
		description: "Neon pink, electric blue, hot purple",
		category: "era"
	},
	"90s": {
		name: "1990s",
		description: "Grunge, forest green, burgundy",
		category: "era"
	},
	y2k: {
		name: "Y2K",
		description: "Chrome, cyan, magenta",
		category: "era"
	},
	"ocean-sunset": {
		name: "Ocean Sunset",
		description: "Coral, rose, ocean blue, dusk",
		category: "nature"
	},
	"forest-morning": {
		name: "Forest Morning",
		description: "Fresh greens, mist, golden light",
		category: "nature"
	},
	"desert-dusk": {
		name: "Desert Dusk",
		description: "Terracotta, sand, dusty rose",
		category: "nature"
	},
	arctic: {
		name: "Arctic",
		description: "Ice blue, white, pale cyan",
		category: "nature"
	},
	volcanic: {
		name: "Volcanic",
		description: "Black, deep red, orange, ash",
		category: "nature"
	},
	meadow: {
		name: "Meadow",
		description: "Grass green, wildflowers, sky blue",
		category: "nature"
	},
	bauhaus: {
		name: "Bauhaus",
		description: "Primary colors, geometric, bold",
		category: "cultural"
	},
	"art-deco": {
		name: "Art Deco",
		description: "Gold, black, cream, emerald",
		category: "cultural"
	},
	japanese: {
		name: "Japanese",
		description: "Indigo, vermillion, gold, cream",
		category: "cultural"
	},
	scandinavian: {
		name: "Scandinavian",
		description: "White, pale grey, muted pastels",
		category: "cultural"
	},
	mexican: {
		name: "Mexican",
		description: "Hot pink, orange, turquoise, yellow",
		category: "cultural"
	}
};
function rgbToHex(r, g, b) {
	return "#" + [
		r,
		g,
		b
	].map((x) => Math.round(Math.max(0, Math.min(255, x))).toString(16).padStart(2, "0")).join("");
}
function linearToSrgb(c) {
	const v = c <= .0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - .055;
	return Math.max(0, Math.min(255, v * 255));
}
function oklchToRgb(L, c, h) {
	const hRad = h * Math.PI / 180;
	const a = c * Math.cos(hRad);
	const b = c * Math.sin(hRad);
	const l = Math.pow(L + .3963377774 * a + .2158037573 * b, 3);
	const m = Math.pow(L - .1055613458 * a - .0638541728 * b, 3);
	const s = Math.pow(L - .0894841775 * a - 1.291485548 * b, 3);
	const lr = 4.0767416621 * l - 3.3077115913 * m + .2309699292 * s;
	const lg = -1.2684380046 * l + 2.6097574011 * m - .3413193965 * s;
	const lb = -.0041960863 * l - .7034186147 * m + 1.707614701 * s;
	return [
		linearToSrgb(lr),
		linearToSrgb(lg),
		linearToSrgb(lb)
	];
}
function clampOklch(L, c, h) {
	L = Math.max(0, Math.min(1, L));
	c = Math.max(0, Math.min(.4, c));
	h = (h % 360 + 360) % 360;
	return [
		L,
		c,
		h
	];
}
function oklchToHex(L, c, h) {
	const [cL, cC, cH] = clampOklch(L, c, h);
	const rgb = oklchToRgb(cL, cC, cH);
	return rgbToHex(Math.round(Math.max(0, Math.min(255, rgb[0]))), Math.round(Math.max(0, Math.min(255, rgb[1]))), Math.round(Math.max(0, Math.min(255, rgb[2]))));
}
function randomInRange(min, max) {
	return Math.random() * (max - min) + min;
}
function generateRandomBase() {
	return [
		randomInRange(.4, .75),
		randomInRange(.08, .2),
		randomInRange(0, 360)
	];
}
function pickFromHueRanges(ranges, defaultL, defaultC) {
	const totalWeight = ranges.reduce((sum, r) => sum + r.weight, 0);
	let random = Math.random() * totalWeight;
	let selectedRange = ranges[0];
	for (const range of ranges) {
		random -= range.weight;
		if (random <= 0) {
			selectedRange = range;
			break;
		}
	}
	const h = randomInRange(selectedRange.h[0], selectedRange.h[1]);
	return oklchToHex(randomInRange(...selectedRange.L || defaultL), randomInRange(...selectedRange.c || defaultC), h);
}
function generateTrueRandomPalette(count) {
	return Array.from({ length: count }, () => {
		return rgbToHex(Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256));
	});
}
function generateAnalogousPalette(count) {
	const [baseL, baseC, baseH] = generateRandomBase();
	const spread = 40;
	const step = spread / (count - 1);
	const startH = baseH - spread / 2;
	return Array.from({ length: count }, (_, i) => {
		const h = startH + step * i;
		return oklchToHex(baseL + randomInRange(-.1, .1), baseC + randomInRange(-.05, .05), h);
	});
}
function generateComplementaryPalette(count) {
	const [baseL, baseC, baseH] = generateRandomBase();
	const complementH = (baseH + 180) % 360;
	const colours = [];
	const halfCount = Math.ceil(count / 2);
	for (let i = 0; i < halfCount; i++) {
		const hVariation = randomInRange(-15, 15);
		const L = baseL + randomInRange(-.15, .15);
		const c = baseC + randomInRange(-.05, .05);
		colours.push(oklchToHex(L, c, baseH + hVariation));
	}
	for (let i = halfCount; i < count; i++) {
		const hVariation = randomInRange(-15, 15);
		const L = baseL + randomInRange(-.15, .15);
		const c = baseC + randomInRange(-.05, .05);
		colours.push(oklchToHex(L, c, complementH + hVariation));
	}
	return colours;
}
function generateTriadicPalette(count) {
	const [baseL, baseC, baseH] = generateRandomBase();
	const angles = [
		baseH,
		(baseH + 120) % 360,
		(baseH + 240) % 360
	];
	return Array.from({ length: count }, (_, i) => {
		const angleIndex = i % 3;
		const h = angles[angleIndex] + randomInRange(-10, 10);
		return oklchToHex(baseL + randomInRange(-.15, .15), baseC + randomInRange(-.05, .05), h);
	});
}
function generateSplitComplementaryPalette(count) {
	const [baseL, baseC, baseH] = generateRandomBase();
	const angles = [
		baseH,
		(baseH + 150) % 360,
		(baseH + 210) % 360
	];
	return Array.from({ length: count }, (_, i) => {
		const angleIndex = i % 3;
		const h = angles[angleIndex] + randomInRange(-10, 10);
		return oklchToHex(baseL + randomInRange(-.15, .15), baseC + randomInRange(-.05, .05), h);
	});
}
function generateTetradicPalette(count) {
	const [baseL, baseC, baseH] = generateRandomBase();
	const angles = [
		baseH,
		(baseH + 90) % 360,
		(baseH + 180) % 360,
		(baseH + 270) % 360
	];
	return Array.from({ length: count }, (_, i) => {
		const angleIndex = i % 4;
		const h = angles[angleIndex] + randomInRange(-10, 10);
		return oklchToHex(baseL + randomInRange(-.15, .15), baseC + randomInRange(-.05, .05), h);
	});
}
function generateMonochromaticPalette(count) {
	const h = randomInRange(0, 360);
	const baseC = randomInRange(.1, .2);
	const lMax = .85;
	const lStep = .55 / (count - 1);
	return Array.from({ length: count }, (_, i) => {
		const L = lMax - lStep * i;
		return oklchToHex(L, baseC * (L < .4 || L > .75 ? .7 : 1), h);
	});
}
function generateRandomCohesivePalette(count) {
	const strategies = [
		generateAnalogousPalette,
		generateComplementaryPalette,
		generateTriadicPalette,
		generateSplitComplementaryPalette,
		generateTetradicPalette,
		generateMonochromaticPalette
	];
	const strategy = strategies[Math.floor(Math.random() * strategies.length)];
	return strategy(count);
}
function generateThermosPalette(count) {
	return Array.from({ length: count }, () => {
		const h = randomInRange(15, 55);
		return oklchToHex(randomInRange(.45, .75), randomInRange(.08, .18), h);
	});
}
function generateSpecimenPalette(count) {
	return Array.from({ length: count }, () => {
		const h = randomInRange(170, 220);
		return oklchToHex(randomInRange(.6, .9), randomInRange(.03, .12), h);
	});
}
function generateSouvenirPalette(count) {
	return Array.from({ length: count }, () => {
		const h = randomInRange(0, 360);
		return oklchToHex(randomInRange(.75, .92), randomInRange(.04, .1), h);
	});
}
function generateCurfewPalette(count) {
	return Array.from({ length: count }, () => {
		const h = randomInRange(0, 360);
		return oklchToHex(randomInRange(.15, .35), randomInRange(.05, .15), h);
	});
}
function generateTelegraphPalette(count) {
	return Array.from({ length: count }, () => {
		const h = randomInRange(30, 60);
		return oklchToHex(randomInRange(.4, .7), randomInRange(.02, .08), h);
	});
}
function generate70sPalette(count) {
	const ranges = [
		{
			h: [25, 45],
			weight: 3
		},
		{
			h: [75, 100],
			weight: 2
		},
		{
			h: [15, 30],
			weight: 2
		},
		{
			h: [45, 65],
			weight: 1
		}
	];
	return Array.from({ length: count }, () => pickFromHueRanges(ranges, [.35, .65], [.08, .18]));
}
function generate80sPalette(count) {
	const colours = [];
	for (let i = 0; i < count; i++) if (Math.random() < .2) {
		const h = randomInRange(0, 360);
		colours.push(oklchToHex(randomInRange(.12, .22), randomInRange(.02, .08), h));
	} else colours.push(pickFromHueRanges([
		{
			h: [320, 350],
			weight: 3
		},
		{
			h: [220, 270],
			weight: 2
		},
		{
			h: [280, 320],
			weight: 2
		},
		{
			h: [170, 200],
			weight: 1
		}
	], [.55, .75], [.18, .3]));
	return colours;
}
function generate90sPalette(count) {
	const ranges = [
		{
			h: [140, 170],
			weight: 2
		},
		{
			h: [350, 20],
			weight: 2
		},
		{
			h: [220, 250],
			weight: 2
		},
		{
			h: [30, 50],
			weight: 1
		}
	];
	return Array.from({ length: count }, () => pickFromHueRanges(ranges, [.3, .55], [.05, .14]));
}
function generateY2KPalette(count) {
	const colours = [];
	for (let i = 0; i < count; i++) if (Math.random() < .3) {
		const h = randomInRange(200, 280);
		colours.push(oklchToHex(randomInRange(.7, .88), randomInRange(.01, .04), h));
	} else colours.push(pickFromHueRanges([
		{
			h: [180, 200],
			weight: 2
		},
		{
			h: [310, 340],
			weight: 2
		},
		{
			h: [260, 290],
			weight: 1
		},
		{
			h: [50, 70],
			weight: 1
		}
	], [.55, .75], [.15, .28]));
	return colours;
}
function generateOceanSunsetPalette(count) {
	const ranges = [
		{
			h: [15, 40],
			weight: 2,
			L: [.6, .75]
		},
		{
			h: [340, 360],
			weight: 2,
			L: [.55, .7]
		},
		{
			h: [200, 230],
			weight: 2,
			L: [.35, .55]
		},
		{
			h: [260, 290],
			weight: 1,
			L: [.25, .45]
		}
	];
	return Array.from({ length: count }, () => pickFromHueRanges(ranges, [.45, .7], [.1, .2]));
}
function generateForestMorningPalette(count) {
	const colours = [];
	for (let i = 0; i < count; i++) if (Math.random() < .25) {
		const h = randomInRange(90, 150);
		colours.push(oklchToHex(randomInRange(.8, .92), randomInRange(.02, .06), h));
	} else colours.push(pickFromHueRanges([
		{
			h: [100, 140],
			weight: 3
		},
		{
			h: [75, 100],
			weight: 2
		},
		{
			h: [45, 60],
			weight: 1
		},
		{
			h: [25, 40],
			weight: 1
		}
	], [.4, .7], [.08, .18]));
	return colours;
}
function generateDesertDuskPalette(count) {
	const ranges = [
		{
			h: [15, 35],
			weight: 3,
			L: [.45, .65]
		},
		{
			h: [40, 55],
			weight: 2,
			L: [.7, .85]
		},
		{
			h: [350, 15],
			weight: 2,
			L: [.55, .7]
		},
		{
			h: [280, 310],
			weight: 1,
			L: [.25, .4]
		}
	];
	return Array.from({ length: count }, () => pickFromHueRanges(ranges, [.45, .7], [.06, .16]));
}
function generateArcticPalette(count) {
	const colours = [];
	for (let i = 0; i < count; i++) if (Math.random() < .3) {
		const h = randomInRange(200, 220);
		colours.push(oklchToHex(randomInRange(.92, .98), randomInRange(.005, .02), h));
	} else colours.push(pickFromHueRanges([
		{
			h: [200, 220],
			weight: 3
		},
		{
			h: [180, 200],
			weight: 2
		},
		{
			h: [220, 250],
			weight: 1
		}
	], [.7, .9], [.02, .08]));
	return colours;
}
function generateVolcanicPalette(count) {
	const colours = [];
	for (let i = 0; i < count; i++) {
		const roll = Math.random();
		if (roll < .25) colours.push(oklchToHex(randomInRange(.12, .22), randomInRange(.01, .03), randomInRange(0, 360)));
		else if (roll < .4) colours.push(oklchToHex(randomInRange(.5, .65), randomInRange(.01, .03), randomInRange(20, 40)));
		else colours.push(pickFromHueRanges([
			{
				h: [0, 20],
				weight: 2
			},
			{
				h: [20, 45],
				weight: 2
			},
			{
				h: [45, 60],
				weight: 1
			}
		], [.4, .65], [.15, .25]));
	}
	return colours;
}
function generateMeadowPalette(count) {
	const ranges = [
		{
			h: [100, 135],
			weight: 3
		},
		{
			h: [280, 320],
			weight: 2
		},
		{
			h: [55, 75],
			weight: 2
		},
		{
			h: [200, 220],
			weight: 1
		}
	];
	return Array.from({ length: count }, () => pickFromHueRanges(ranges, [.55, .75], [.12, .22]));
}
function generateBauhausPalette(count) {
	const colours = [];
	for (let i = 0; i < count; i++) {
		const roll = Math.random();
		if (roll < .2) colours.push(oklchToHex(randomInRange(.08, .18), randomInRange(0, .02), randomInRange(0, 360)));
		else if (roll < .3) colours.push(oklchToHex(randomInRange(.92, .97), randomInRange(.01, .025), randomInRange(80, 100)));
		else colours.push(pickFromHueRanges([
			{
				h: [15, 35],
				weight: 3,
				L: [.5, .62],
				c: [.18, .26]
			},
			{
				h: [85, 105],
				weight: 3,
				L: [.8, .88],
				c: [.14, .2]
			},
			{
				h: [240, 265],
				weight: 3,
				L: [.4, .52],
				c: [.12, .18]
			},
			{
				h: [35, 55],
				weight: 1,
				L: [.65, .75],
				c: [.15, .2]
			},
			{
				h: [140, 160],
				weight: 1,
				L: [.45, .55],
				c: [.1, .15]
			},
			{
				h: [0, 15],
				weight: 1,
				L: [.45, .55],
				c: [.2, .26]
			}
		], [.5, .7], [.15, .22]));
	}
	return colours;
}
function generateArtDecoPalette(count) {
	const colours = [];
	for (let i = 0; i < count; i++) {
		const roll = Math.random();
		if (roll < .25) colours.push(oklchToHex(randomInRange(.7, .8), randomInRange(.12, .18), randomInRange(85, 100)));
		else if (roll < .4) colours.push(oklchToHex(randomInRange(.12, .2), randomInRange(.01, .03), randomInRange(0, 360)));
		else if (roll < .55) colours.push(oklchToHex(randomInRange(.9, .96), randomInRange(.015, .03), randomInRange(80, 100)));
		else colours.push(pickFromHueRanges([
			{
				h: [155, 175],
				weight: 2
			},
			{
				h: [180, 200],
				weight: 1
			},
			{
				h: [0, 15],
				weight: 1
			}
		], [.35, .55], [.1, .18]));
	}
	return colours;
}
function generateJapanesePalette(count) {
	const colours = [];
	for (let i = 0; i < count; i++) {
		const roll = Math.random();
		if (roll < .15) colours.push(oklchToHex(randomInRange(.88, .95), randomInRange(.01, .03), randomInRange(70, 100)));
		else if (roll < .25) colours.push(oklchToHex(randomInRange(.4, .55), randomInRange(.05, .1), randomInRange(35, 60)));
		else colours.push(pickFromHueRanges([
			{
				h: [245, 270],
				weight: 3,
				L: [.25, .45],
				c: [.06, .14]
			},
			{
				h: [18, 35],
				weight: 2,
				L: [.45, .58],
				c: [.14, .22]
			},
			{
				h: [0, 18],
				weight: 1,
				L: [.35, .48],
				c: [.12, .18]
			},
			{
				h: [75, 95],
				weight: 2,
				L: [.7, .82],
				c: [.1, .16]
			},
			{
				h: [120, 145],
				weight: 2,
				L: [.35, .5],
				c: [.06, .12]
			},
			{
				h: [290, 320],
				weight: 1,
				L: [.5, .7],
				c: [.08, .14]
			},
			{
				h: [340, 360],
				weight: 1,
				L: [.75, .88],
				c: [.06, .12]
			},
			{
				h: [35, 50],
				weight: 1,
				L: [.55, .68],
				c: [.12, .18]
			}
		], [.4, .6], [.08, .15]));
	}
	return colours;
}
function generateScandinavianPalette(count) {
	const colours = [];
	for (let i = 0; i < count; i++) {
		const roll = Math.random();
		if (roll < .35) colours.push(oklchToHex(randomInRange(.93, .98), randomInRange(.005, .015), randomInRange(80, 110)));
		else if (roll < .55) colours.push(oklchToHex(randomInRange(.8, .9), randomInRange(.005, .015), randomInRange(200, 260)));
		else if (roll < .75) colours.push(oklchToHex(randomInRange(.8, .9), randomInRange(.02, .05), randomInRange(0, 360)));
		else colours.push(oklchToHex(randomInRange(.55, .7), randomInRange(.04, .08), randomInRange(50, 80)));
	}
	return colours;
}
function generateMexicanPalette(count) {
	const ranges = [
		{
			h: [330, 350],
			weight: 2
		},
		{
			h: [20, 40],
			weight: 2
		},
		{
			h: [175, 195],
			weight: 2
		},
		{
			h: [55, 70],
			weight: 2
		},
		{
			h: [280, 310],
			weight: 1
		}
	];
	return Array.from({ length: count }, () => pickFromHueRanges(ranges, [.55, .72], [.18, .28]));
}
function generatePalette(count, strategy) {
	switch (strategy) {
		case "true-random": return generateTrueRandomPalette(count);
		case "random-cohesive": return generateRandomCohesivePalette(count);
		case "analogous": return generateAnalogousPalette(count);
		case "complementary": return generateComplementaryPalette(count);
		case "triadic": return generateTriadicPalette(count);
		case "split-complementary": return generateSplitComplementaryPalette(count);
		case "tetradic": return generateTetradicPalette(count);
		case "monochromatic": return generateMonochromaticPalette(count);
		case "thermos": return generateThermosPalette(count);
		case "specimen": return generateSpecimenPalette(count);
		case "souvenir": return generateSouvenirPalette(count);
		case "curfew": return generateCurfewPalette(count);
		case "telegraph": return generateTelegraphPalette(count);
		case "70s": return generate70sPalette(count);
		case "80s": return generate80sPalette(count);
		case "90s": return generate90sPalette(count);
		case "y2k": return generateY2KPalette(count);
		case "ocean-sunset": return generateOceanSunsetPalette(count);
		case "forest-morning": return generateForestMorningPalette(count);
		case "desert-dusk": return generateDesertDuskPalette(count);
		case "arctic": return generateArcticPalette(count);
		case "volcanic": return generateVolcanicPalette(count);
		case "meadow": return generateMeadowPalette(count);
		case "bauhaus": return generateBauhausPalette(count);
		case "art-deco": return generateArtDecoPalette(count);
		case "japanese": return generateJapanesePalette(count);
		case "scandinavian": return generateScandinavianPalette(count);
		case "mexican": return generateMexicanPalette(count);
		default: return generateRandomCohesivePalette(count);
	}
}
function getStrategiesByCategory() {
	const result = {
		random: [],
		"color-theory": [],
		mood: [],
		era: [],
		nature: [],
		cultural: []
	};
	for (const [key, info] of Object.entries(STRATEGY_INFO)) result[info.category].push({
		key,
		info
	});
	return result;
}
var MIN = 2;
var MAX = 11;
var CATEGORY_LABEL = {
	random: "Aleatório",
	"color-theory": "Teoria da cor",
	mood: "Clima",
	era: "Épocas",
	nature: "Natureza",
	cultural: "Arte e cultura"
};
function nextId() {
	return Math.random().toString(36).slice(2, 9);
}
function swatch(hex) {
	return {
		id: nextId(),
		hex,
		locked: false
	};
}
function hexToRgb(hex) {
	const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());
	if (!match) return null;
	return [
		parseInt(match[1], 16),
		parseInt(match[2], 16),
		parseInt(match[3], 16)
	];
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
function srgbToLinear(channel) {
	const value = channel / 255;
	return value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4;
}
function oklchOf(hex) {
	const rgb = hexToRgb(hex);
	if (!rgb) return null;
	const [r, g, b] = rgb;
	const lr = srgbToLinear(r);
	const lg = srgbToLinear(g);
	const lb = srgbToLinear(b);
	const l = Math.cbrt(.4122214708 * lr + .5363325363 * lg + .0514459929 * lb);
	const m = Math.cbrt(.2119034982 * lr + .6806995451 * lg + .1073969566 * lb);
	const s = Math.cbrt(.0883024619 * lr + .2817188376 * lg + .6299787005 * lb);
	const L = .2104542553 * l + .793617785 * m - .0040720468 * s;
	const a = 1.9779984951 * l - 2.428592205 * m + .4505937099 * s;
	const bLab = .0259040371 * l + .7827717662 * m - .808675766 * s;
	let h = Math.atan2(bLab, a) * 180 / Math.PI;
	if (h < 0) h += 360;
	return `L${(L * 100).toFixed(0)} C${Math.sqrt(a * a + bLab * bLab).toFixed(2)} H${h.toFixed(0)}`;
}
function Genny({ name, colors, onBack }) {
	const [colours, setColours] = (0, import_react.useState)(() => colors.map(swatch));
	const [strategy, setStrategy] = (0, import_react.useState)("random-cohesive");
	const [copied, setCopied] = (0, import_react.useState)(null);
	const groups = (0, import_react.useMemo)(() => getStrategiesByCategory(), []);
	(0, import_react.useEffect)(() => {
		if (!copied) return;
		const id = window.setTimeout(() => setCopied(null), 1500);
		return () => window.clearTimeout(id);
	}, [copied]);
	(0, import_react.useEffect)(() => {
		const onKey = (event) => {
			const target = event.target;
			if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement) return;
			if (event.code !== "Space") return;
			event.preventDefault();
			regenerate();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	});
	const copy = async (value, key) => {
		try {
			await navigator.clipboard.writeText(value);
			setCopied(key);
		} catch {
			setCopied(null);
		}
	};
	const regenerate = () => {
		const fresh = generatePalette(colours.length, strategy);
		setColours((current) => current.map((colour, index) => colour.locked ? colour : swatch(fresh[index] ?? colour.hex)));
	};
	const update = (id, hex) => {
		if (!hexToRgb(hex)) return;
		setColours((current) => current.map((colour) => colour.id === id ? {
			...colour,
			hex
		} : colour));
	};
	const download = () => {
		const width = 1200;
		const height = 630;
		const pad = 40;
		const gap = 12;
		const canvas = document.createElement("canvas");
		canvas.width = width;
		canvas.height = height;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const swatchH = 470;
		const swatchW = (1120 - (colours.length - 1) * gap) / colours.length;
		ctx.fillStyle = "#f5f0e6";
		ctx.fillRect(0, 0, width, height);
		colours.forEach((colour, index) => {
			const x = pad + index * (swatchW + gap);
			ctx.fillStyle = colour.hex;
			ctx.beginPath();
			ctx.roundRect(x, pad, swatchW, swatchH, 16);
			ctx.fill();
			ctx.fillStyle = "#1a1a1a";
			ctx.font = "bold 20px system-ui, sans-serif";
			ctx.textAlign = "center";
			ctx.fillText(colour.hex.toUpperCase(), x + swatchW / 2, 570);
		});
		ctx.fillStyle = "#666666";
		ctx.font = "16px system-ui, sans-serif";
		ctx.textAlign = "right";
		ctx.fillText(name, 1160, 614);
		const link = document.createElement("a");
		link.href = canvas.toDataURL("image/png");
		link.download = `${name.toLowerCase().replace(/\s+/g, "-") || "paleta"}.png`;
		link.click();
	};
	const css = `:root {\n${colours.map((colour, index) => `  --palette-${index + 1}: ${colour.hex};`).join("\n")}\n}`;
	const json = JSON.stringify(colours.map((colour) => colour.hex), null, 2);
	const grid = colours.length > 4;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: onBack,
					className: "inline-flex min-h-11 items-center gap-2 rounded-panel border border-line px-3 text-xs uppercase tracking-widest text-muted hover:text-fg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Voltar"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "min-w-0 flex-1 truncate font-display text-2xl font-extrabold tracking-tight",
					children: name
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-2 " + (grid ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2 sm:grid-cols-none sm:flex"),
				children: colours.map((colour, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "flex min-w-0 flex-1 flex-col overflow-hidden rounded-panel border border-line bg-bg/40",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "relative block h-36 cursor-pointer sm:h-48",
						style: { background: colour.hex },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "color",
								value: colour.hex,
								"aria-label": `Editar cor ${colour.hex}`,
								onChange: (event) => update(colour.id, event.target.value),
								className: "absolute inset-0 cursor-pointer opacity-0"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "pointer-events-none absolute left-2 top-2 text-xs font-medium tabular-nums",
								style: { color: ink(colour.hex) },
								children: String(index + 1).padStart(2, "0")
							}),
							colour.locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
								className: "pointer-events-none absolute right-2 top-2 size-4",
								style: { color: ink(colour.hex) }
							}) : null
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2 px-2 py-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate font-mono text-xs text-fg",
							children: colour.hex
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": colour.locked ? "Destravar cor" : "Travar cor",
									onClick: () => setColours((current) => current.map((item) => item.id === colour.id ? {
										...item,
										locked: !item.locked
									} : item)),
									className: "inline-flex size-11 items-center justify-center text-muted hover:text-fg",
									children: colour.locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-4 text-accent" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockOpen, { className: "size-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": `Copiar ${colour.hex}`,
									onClick: () => void copy(colour.hex, colour.id),
									className: "inline-flex size-11 items-center justify-center text-muted hover:text-fg",
									children: copied === colour.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-accent" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": "Remover cor",
									disabled: colours.length <= MIN,
									onClick: () => setColours((current) => current.filter((item) => item.id !== colour.id)),
									className: "inline-flex size-11 items-center justify-center text-muted hover:text-fg disabled:opacity-40",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
								})
							]
						})]
					})]
				}, colour.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						"aria-label": "Estratégia da paleta",
						value: strategy,
						onChange: (event) => setStrategy(event.target.value),
						className: "min-h-11 min-w-0 flex-1 rounded-panel border border-line bg-bg px-3 text-sm text-fg",
						children: Object.keys(STRATEGY_CATEGORIES).map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("optgroup", {
							label: CATEGORY_LABEL[category],
							children: groups[category].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: item.key,
								children: [
									item.info.name,
									" — ",
									item.info.description
								]
							}, item.key))
						}, category))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: regenerate,
						className: "inline-flex min-h-11 items-center gap-2 rounded-panel bg-accent px-3 text-sm font-medium text-accent-ink",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shuffle, { className: "size-4" }), "Gerar"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "inline-flex items-center rounded-panel border border-line",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Tirar uma cor",
								disabled: colours.length <= MIN,
								onClick: () => setColours((current) => current.slice(0, -1)),
								className: "inline-flex size-11 items-center justify-center text-muted hover:text-fg disabled:opacity-40",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-6 text-center text-sm tabular-nums",
								children: colours.length
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Somar uma cor",
								disabled: colours.length >= MAX,
								onClick: () => setColours((current) => [...current, swatch(generatePalette(1, strategy)[0] ?? "#888888")]),
								className: "inline-flex size-11 items-center justify-center text-muted hover:text-fg disabled:opacity-40",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted",
				children: [STRATEGY_INFO[strategy].description, ". Espaço gera de novo. Cor travada fica no lugar."]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => void copy(colours.map((colour) => colour.hex).join(", "), "all"),
						className: "inline-flex min-h-11 items-center gap-2 rounded-panel border border-line px-3 text-xs uppercase tracking-widest text-muted hover:text-fg",
						children: [copied === "all" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-accent" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), "Copiar cores"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => void copy(css, "css"),
						className: "inline-flex min-h-11 items-center gap-2 rounded-panel border border-line px-3 text-xs uppercase tracking-widest text-muted hover:text-fg",
						children: [copied === "css" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-accent" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), "CSS"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => void copy(json, "json"),
						className: "inline-flex min-h-11 items-center gap-2 rounded-panel border border-line px-3 text-xs uppercase tracking-widest text-muted hover:text-fg",
						children: [copied === "json" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-accent" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), "JSON"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: download,
						className: "inline-flex min-h-11 items-center gap-2 rounded-panel border border-line px-3 text-xs uppercase tracking-widest text-muted hover:text-fg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), "Baixar imagem"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col",
				children: colours.map((colour) => {
					const rgb = hexToRgb(colour.hex);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-3 border-b border-line py-2 last:border-b-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "size-11 shrink-0 rounded-panel border border-line",
								style: { background: colour.hex }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-sm text-fg",
									children: colour.hex
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "truncate text-xs text-muted",
									children: [rgb ? `RGB ${rgb.join(" ")}` : "", oklchOf(colour.hex) ? ` · ${oklchOf(colour.hex)}` : ""]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": `Copiar ${colour.hex} da lista`,
								onClick: () => void copy(colour.hex, `list-${colour.id}`),
								className: "inline-flex size-11 items-center justify-center text-muted hover:text-fg",
								children: copied === `list-${colour.id}` ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-accent" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" })
							})
						]
					}, colour.id);
				})
			})
		]
	});
}
var COLLECTION_CATEGORIES = {
	classic: {
		label: "Classic",
		description: "Timeless, elegant combinations"
	},
	nature: {
		label: "Nature",
		description: "Inspired by the natural world"
	},
	keycaps: {
		label: "Keycaps",
		description: "Inspired by popular keycap sets"
	},
	vintage: {
		label: "Vintage",
		description: "Retro and nostalgic palettes"
	},
	modern: {
		label: "Modern",
		description: "Contemporary and trendy"
	},
	bold: {
		label: "Bold",
		description: "Vibrant and eye-catching"
	},
	soft: {
		label: "Soft",
		description: "Gentle and calming tones"
	},
	monochrome: {
		label: "Monochrome",
		description: "Single-hue explorations"
	},
	seasonal: {
		label: "Seasonal",
		description: "Capturing the seasons"
	},
	artistic: {
		label: "Artistic",
		description: "Inspired by art movements"
	}
};
var CURATED_PALETTES = [
	{
		id: "mayfair",
		name: "Mayfair",
		colors: [
			"#1a2634",
			"#2d4a3e",
			"#6b1c2a",
			"#c9b896",
			"#f5f0e6"
		],
		category: "classic"
	},
	{
		id: "piccadilly",
		name: "Piccadilly",
		colors: [
			"#0d0d0d",
			"#1a1a2e",
			"#c9a227",
			"#f0d060",
			"#f5efe6"
		],
		category: "classic"
	},
	{
		id: "bond-street",
		name: "Bond Street",
		colors: [
			"#0a0a0a",
			"#d4af37",
			"#f5e6d3",
			"#fff8f0",
			"#cc0033"
		],
		category: "classic"
	},
	{
		id: "leicester-square",
		name: "Leicester Square",
		colors: [
			"#000000",
			"#2d2d2d",
			"#ffffff",
			"#cc2936",
			"#f5e6e0"
		],
		category: "classic"
	},
	{
		id: "temple",
		name: "Temple",
		colors: [
			"#1a120a",
			"#3d2914",
			"#6b4423",
			"#c9a227",
			"#f5e6d3"
		],
		category: "classic"
	},
	{
		id: "westminster",
		name: "Westminster",
		colors: [
			"#1a0f0a",
			"#4a2c17",
			"#8b4513",
			"#c77b4a",
			"#d4c4a8"
		],
		category: "classic"
	},
	{
		id: "south-kensington",
		name: "South Kensington",
		colors: [
			"#1a3d1a",
			"#2d5a3d",
			"#f5f0e6",
			"#c9a86c",
			"#1a2744"
		],
		category: "classic"
	},
	{
		id: "hampstead",
		name: "Hampstead",
		colors: [
			"#1a2744",
			"#4a1a2e",
			"#2d4a3e",
			"#c9a86c",
			"#f5f0e6"
		],
		category: "classic"
	},
	{
		id: "sloane-square",
		name: "Sloane Square",
		colors: [
			"#0d1a26",
			"#1a3d4a",
			"#2e6a7a",
			"#c9d4dc",
			"#f5f8fa"
		],
		category: "classic"
	},
	{
		id: "tower-hill",
		name: "Tower Hill",
		colors: [
			"#0a1628",
			"#1a3a5c",
			"#ffffff",
			"#cc2936",
			"#c9a227"
		],
		category: "classic"
	},
	{
		id: "baker-street",
		name: "Baker Street",
		colors: [
			"#2c1810",
			"#5c3a28",
			"#8b6914",
			"#c9a86c",
			"#e8dcc8"
		],
		category: "classic"
	},
	{
		id: "green-park",
		name: "Green Park",
		colors: [
			"#0d0d0d",
			"#1a472a",
			"#c9a227",
			"#f5f0e6"
		],
		category: "classic"
	},
	{
		id: "holland-park",
		name: "Holland Park",
		colors: [
			"#1a2744",
			"#3d5a80",
			"#98c1d9",
			"#e0e1dd",
			"#c9a86c"
		],
		category: "classic"
	},
	{
		id: "notting-hill-gate",
		name: "Notting Hill Gate",
		colors: [
			"#1a0f0a",
			"#6b4423",
			"#c77b4a",
			"#e8c9a0",
			"#2d5a3d"
		],
		category: "classic"
	},
	{
		id: "regents-park",
		name: "Regent's Park",
		colors: [
			"#1a3d1a",
			"#4a7c59",
			"#f5f0e6",
			"#d4af37",
			"#2d2d2d"
		],
		category: "classic"
	},
	{
		id: "bank",
		name: "Bank",
		colors: [
			"#0d0a1a",
			"#2e1a47",
			"#6b1c2a",
			"#c9a227",
			"#f0d060"
		],
		category: "classic"
	},
	{
		id: "canary-wharf",
		name: "Canary Wharf",
		colors: [
			"#1a3a5c",
			"#5a8faa",
			"#c9d4dc",
			"#f5f8fa",
			"#2d4a3e"
		],
		category: "classic"
	},
	{
		id: "mansion-house",
		name: "Mansion House",
		colors: [
			"#1a120a",
			"#4a2c17",
			"#8b6914",
			"#c9a227",
			"#f0e6d3",
			"#6b1c2a"
		],
		category: "classic"
	},
	{
		id: "oxford-circus",
		name: "Oxford Circus",
		colors: [
			"#1a1a2e",
			"#2d2d4a",
			"#4a4a6b",
			"#8b8ba8",
			"#c9c9dc"
		],
		category: "classic"
	},
	{
		id: "high-street-kensington",
		name: "High Street Kensington",
		colors: [
			"#2d1a2e",
			"#5c3a5c",
			"#8b6b8b",
			"#c9a8c9",
			"#f0e6f0"
		],
		category: "classic"
	},
	{
		id: "st-james-park",
		name: "St. James's Park",
		colors: [
			"#1a2634",
			"#3d5066",
			"#c9a227",
			"#f5f0e6"
		],
		category: "classic"
	},
	{
		id: "ellesmere",
		name: "Ellesmere",
		colors: [
			"#E4CAA7",
			"#735B47",
			"#4F4331",
			"#3B2919",
			"#120D03"
		],
		category: "nature"
	},
	{
		id: "sequoia",
		name: "Sequoia",
		colors: [
			"#1a0f0a",
			"#4a2c17",
			"#8b4513",
			"#2d5a3d",
			"#6b8e6b"
		],
		category: "nature"
	},
	{
		id: "mojave",
		name: "Mojave",
		colors: [
			"#f5deb3",
			"#d4a574",
			"#c77b4a",
			"#8b4513",
			"#4a2c17"
		],
		category: "nature"
	},
	{
		id: "monterey",
		name: "Monterey",
		colors: [
			"#1a3d4a",
			"#2e6b7a",
			"#5a9baa",
			"#8ab4c4",
			"#c9dce6"
		],
		category: "nature"
	},
	{
		id: "big-sur",
		name: "Big Sur",
		colors: [
			"#c9d4dc",
			"#dce4e8",
			"#e8f0f0",
			"#f5f8fa",
			"#5a7a8a"
		],
		category: "nature"
	},
	{
		id: "muir-woods",
		name: "Muir Woods",
		colors: [
			"#4a1a0a",
			"#8b3a1a",
			"#1a3d1a",
			"#2e6b3d",
			"#4a8b5a"
		],
		category: "nature"
	},
	{
		id: "antelope",
		name: "Antelope Canyon",
		colors: [
			"#8b4513",
			"#cd853f",
			"#deb887",
			"#f5deb3",
			"#2d1810"
		],
		category: "nature"
	},
	{
		id: "hoh",
		name: "Hoh Rainforest",
		colors: [
			"#0d0a14",
			"#1a142e",
			"#2e1a47",
			"#2e4a2e",
			"#4a6b4a"
		],
		category: "nature"
	},
	{
		id: "yellowstone",
		name: "Yellowstone",
		colors: [
			"#1a1a1a",
			"#3d3d3d",
			"#ff4500",
			"#ff6347",
			"#ffa07a"
		],
		category: "nature"
	},
	{
		id: "perito-moreno",
		name: "Perito Moreno",
		colors: [
			"#e8f4f8",
			"#b8d8e8",
			"#88c4d8",
			"#58a8c8",
			"#2890b8"
		],
		category: "nature"
	},
	{
		id: "atacama",
		name: "Atacama",
		colors: [
			"#f5deb3",
			"#d4a574",
			"#ff69b4",
			"#da70d6",
			"#8b4513"
		],
		category: "nature"
	},
	{
		id: "pantanal",
		name: "Pantanal",
		colors: [
			"#1a2e1a",
			"#2e4a2e",
			"#4a6b4a",
			"#6b8b6b",
			"#8bb88b"
		],
		category: "nature"
	},
	{
		id: "galapagos",
		name: "Galápagos",
		colors: [
			"#0a1a1a",
			"#1a3d3d",
			"#2e5c5c",
			"#4a8b7a",
			"#6bb89b"
		],
		category: "nature"
	},
	{
		id: "svalbard",
		name: "Svalbard",
		colors: [
			"#e8f0f0",
			"#c9d4dc",
			"#8ba8b8",
			"#5a7080",
			"#3d4a52"
		],
		category: "nature"
	},
	{
		id: "tromso",
		name: "Tromsø",
		colors: [
			"#0a0a1a",
			"#1a472a",
			"#2e8b57",
			"#48d1cc",
			"#9370db"
		],
		category: "nature"
	},
	{
		id: "dartmoor",
		name: "Dartmoor",
		colors: [
			"#4a5c4a",
			"#6b8b6b",
			"#8ba88b",
			"#a8a8a0",
			"#6b6b5c"
		],
		category: "nature"
	},
	{
		id: "cairngorms",
		name: "Cairngorms",
		colors: [
			"#6b8b6b",
			"#8ba88b",
			"#a8c4a8",
			"#c4d4b8",
			"#dce8c9"
		],
		category: "nature"
	},
	{
		id: "bialowieza",
		name: "Białowieża",
		colors: [
			"#4a3c2e",
			"#6b5c4a",
			"#8b7a6b",
			"#a89b8b",
			"#c9b8a8"
		],
		category: "nature"
	},
	{
		id: "stromboli",
		name: "Stromboli",
		colors: [
			"#1a1a1a",
			"#2d2d2d",
			"#ff4500",
			"#ff6347",
			"#ffd700"
		],
		category: "nature"
	},
	{
		id: "connemara",
		name: "Connemara",
		colors: [
			"#1a120a",
			"#3d2914",
			"#5c4a2e",
			"#8b7a5c",
			"#a89b7a"
		],
		category: "nature"
	},
	{
		id: "plitvice",
		name: "Plitvice",
		colors: [
			"#0d1a26",
			"#1a3a5c",
			"#3d6b8a",
			"#8ab4c4",
			"#e8f0f5"
		],
		category: "nature"
	},
	{
		id: "cherrapunji",
		name: "Cherrapunji",
		colors: [
			"#1a2634",
			"#3d5066",
			"#5a7a8a",
			"#8ba8b8",
			"#c9d4dc"
		],
		category: "nature"
	},
	{
		id: "arashiyama",
		name: "Arashiyama",
		colors: [
			"#6b8e23",
			"#9acd32",
			"#c4e854",
			"#f0f8e0"
		],
		category: "nature"
	},
	{
		id: "sundarbans",
		name: "Sundarbans",
		colors: [
			"#1a2e1a",
			"#2e4a2e",
			"#4a6b4a",
			"#6b8b6b",
			"#c9a86c"
		],
		category: "nature"
	},
	{
		id: "zhangjiajie",
		name: "Zhangjiajie",
		colors: [
			"#3d4a52",
			"#5a7080",
			"#7a9098",
			"#98b0b8",
			"#b8d0d8"
		],
		category: "nature"
	},
	{
		id: "socotra",
		name: "Socotra",
		colors: [
			"#9b59b6",
			"#e74c8b",
			"#f39c12",
			"#27ae60",
			"#3498db"
		],
		category: "nature"
	},
	{
		id: "serengeti",
		name: "Serengeti",
		colors: [
			"#f5e6c8",
			"#d4b896",
			"#c9a227",
			"#8b6914",
			"#4a3c1a"
		],
		category: "nature"
	},
	{
		id: "namaqualand",
		name: "Namaqualand",
		colors: [
			"#ff6347",
			"#ffd700",
			"#ff69b4",
			"#9acd32",
			"#8b4513"
		],
		category: "nature"
	},
	{
		id: "okavango",
		name: "Okavango",
		colors: [
			"#1a1a2e",
			"#2e2e4a",
			"#4a4a6b",
			"#6b6b8b",
			"#ffd700"
		],
		category: "nature"
	},
	{
		id: "namib",
		name: "Namib",
		colors: [
			"#f5deb3",
			"#d4a574",
			"#c77b4a",
			"#8b4513",
			"#1a1a2e"
		],
		category: "nature"
	},
	{
		id: "blue-mountains",
		name: "Blue Mountains",
		colors: [
			"#3d5c4a",
			"#5a8b6b",
			"#8bb89b",
			"#a8d4b8",
			"#d4e8dc"
		],
		category: "nature"
	},
	{
		id: "tasmania",
		name: "Tasmania",
		colors: [
			"#0a1a1a",
			"#1a3d3d",
			"#2e5c5c",
			"#4a8b7a",
			"#8bb89b"
		],
		category: "nature"
	},
	{
		id: "milford-sound",
		name: "Milford Sound",
		colors: [
			"#0d1a26",
			"#1a3a5c",
			"#3d6b8a",
			"#8ab4c4",
			"#c9dce8"
		],
		category: "nature"
	},
	{
		id: "palau",
		name: "Palau",
		colors: [
			"#0a3d5c",
			"#1a6b8a",
			"#ff6b6b",
			"#ffa07a",
			"#f5deb3"
		],
		category: "nature"
	},
	{
		id: "hokitika",
		name: "Hokitika",
		colors: [
			"#5c5c52",
			"#8b8b7a",
			"#a8a898",
			"#c4c4b8",
			"#e0e0d4"
		],
		category: "nature"
	},
	{
		id: "vieques",
		name: "Vieques",
		colors: [
			"#0a0a1a",
			"#1a1a3d",
			"#00ffff",
			"#00ff7f",
			"#7fffd4"
		],
		category: "nature"
	},
	{
		id: "mcmurdo",
		name: "McMurdo",
		colors: [
			"#f0f8ff",
			"#e0f0f8",
			"#b0d8e8",
			"#80c0d8",
			"#50a8c8"
		],
		category: "nature"
	},
	{
		id: "karelia",
		name: "Karelia",
		colors: [
			"#f5f5f0",
			"#e8e8dc",
			"#c9c9b8",
			"#5c5c4a",
			"#2d2d1a"
		],
		category: "nature"
	},
	{
		id: "naica",
		name: "Naica",
		colors: [
			"#2e1a47",
			"#5c3a8b",
			"#8b5cb8",
			"#b88bd4",
			"#d4b8e8"
		],
		category: "nature"
	},
	{
		id: "2600",
		name: "2600",
		colors: [
			"#ffffff",
			"#eae146",
			"#75397f",
			"#6588c2",
			"#262626"
		],
		category: "keycaps"
	},
	{
		id: "8008",
		name: "8008",
		colors: [
			"#23242f",
			"#6c727f",
			"#be5567",
			"#dcdcdc"
		],
		category: "keycaps"
	},
	{
		id: "9009",
		name: "9009",
		colors: [
			"#FEFFF5",
			"#E2E1CA",
			"#E0B9C5",
			"#B2C7A6",
			"#3A3936"
		],
		category: "keycaps"
	},
	{
		id: "dualshot",
		name: "Dualshot",
		colors: [
			"#5F6161",
			"#B54743",
			"#B89B23",
			"#469B9F",
			"#4C6A95",
			"#232524"
		],
		category: "keycaps"
	},
	{
		id: "handarbeit-r2",
		name: "Handarbeit R2",
		colors: [
			"#BE897D",
			"#AC4438",
			"#DDAC3C",
			"#709F48",
			"#3A7D4A",
			"#86A285",
			"#4359A0"
		],
		category: "keycaps"
	},
	{
		id: "metropolis",
		name: "Metropolis",
		colors: [
			"#040A0D",
			"#2A3037",
			"#B45533",
			"#E0B95A",
			"#68D2B6"
		],
		category: "keycaps"
	},
	{
		id: "milkshake",
		name: "Milkshake",
		colors: [
			"#FFFFFF",
			"#E99FAC",
			"#F2F9A0",
			"#87E2D0",
			"#7CCAEC",
			"#B98FD9",
			"#9DA0AB"
		],
		category: "keycaps"
	},
	{
		id: "cafe",
		name: "Cafe",
		colors: [
			"#2d1810",
			"#6b4423",
			"#c9a86c",
			"#e8dcc8",
			"#f5f0e6"
		],
		category: "keycaps"
	},
	{
		id: "oblivion",
		name: "Oblivion",
		colors: [
			"#1a1a1a",
			"#2d2d2d",
			"#4a4a4a",
			"#9acd32",
			"#f5f5f0"
		],
		category: "keycaps"
	},
	{
		id: "godspeed",
		name: "Godspeed",
		colors: [
			"#1a2744",
			"#f5f0e6",
			"#f0c040",
			"#e8a030",
			"#2e5077"
		],
		category: "keycaps"
	},
	{
		id: "carbon",
		name: "Carbon",
		colors: [
			"#1a1a1a",
			"#3d3d3d",
			"#ff6600",
			"#ff9933",
			"#f5f5f0"
		],
		category: "keycaps"
	},
	{
		id: "miami",
		name: "Miami",
		colors: [
			"#00bcd4",
			"#e91e8b",
			"#f5f5f5",
			"#ff69b4",
			"#00e5ff"
		],
		category: "keycaps"
	},
	{
		id: "laser",
		name: "Laser",
		colors: [
			"#1a0a2e",
			"#2e1a47",
			"#ff00ff",
			"#00ffff",
			"#f5f0fa"
		],
		category: "keycaps"
	},
	{
		id: "nautilus",
		name: "Nautilus",
		colors: [
			"#0d1a26",
			"#1a3d5c",
			"#c9a227",
			"#f0d060",
			"#2e6b8a"
		],
		category: "keycaps"
	},
	{
		id: "botanical",
		name: "Botanical",
		colors: [
			"#f5f5f0",
			"#e8e8dc",
			"#2e6b3d",
			"#4a8b5a",
			"#6bb87a"
		],
		category: "keycaps"
	},
	{
		id: "serika",
		name: "Serika",
		colors: [
			"#1a1a1a",
			"#3d3d3d",
			"#e8c640",
			"#f0d860",
			"#f5f5f0"
		],
		category: "keycaps"
	},
	{
		id: "mizu",
		name: "Mizu",
		colors: [
			"#f5f8fa",
			"#c9dce8",
			"#5a9bba",
			"#3d7a9a",
			"#1a4a6b"
		],
		category: "keycaps"
	},
	{
		id: "bento",
		name: "Bento",
		colors: [
			"#1a1a1a",
			"#2d2d2d",
			"#e04040",
			"#f5f5f0",
			"#f0a0a0"
		],
		category: "keycaps"
	},
	{
		id: "olivia",
		name: "Olivia",
		colors: [
			"#1a1a1a",
			"#e8a8b8",
			"#f0c4cc",
			"#f5dce0",
			"#f5f5f0"
		],
		category: "keycaps"
	},
	{
		id: "dracula",
		name: "Dracula",
		colors: [
			"#282a36",
			"#44475a",
			"#bd93f9",
			"#ff79c6",
			"#50fa7b"
		],
		category: "keycaps"
	},
	{
		id: "nord-keys",
		name: "Nord",
		colors: [
			"#2e3440",
			"#3b4252",
			"#88c0d0",
			"#81a1c1",
			"#eceff4"
		],
		category: "keycaps"
	},
	{
		id: "bushido",
		name: "Bushido",
		colors: [
			"#1a1a1a",
			"#8b0000",
			"#c40000",
			"#f5f0e6",
			"#c9a86c"
		],
		category: "keycaps"
	},
	{
		id: "striker",
		name: "Striker",
		colors: [
			"#1a3d5c",
			"#2e6b8a",
			"#f5f5f0",
			"#e8e8dc",
			"#ffd700"
		],
		category: "keycaps"
	},
	{
		id: "modern-dolch",
		name: "Modern Dolch",
		colors: [
			"#2d2d2d",
			"#4a4a4a",
			"#6b8b8b",
			"#a8c8c8",
			"#e0f0f0"
		],
		category: "keycaps"
	},
	{
		id: "camping",
		name: "Camping",
		colors: [
			"#2d4a3e",
			"#4a7c59",
			"#f5f0e6",
			"#c77b4a",
			"#8b4513"
		],
		category: "keycaps"
	},
	{
		id: "noel",
		name: "Noel",
		colors: [
			"#f5f0e6",
			"#e8dcc8",
			"#c77b4a",
			"#8b4513",
			"#5c3a1a"
		],
		category: "keycaps"
	},
	{
		id: "vaporwave",
		name: "Vaporwave",
		colors: [
			"#ff71ce",
			"#01cdfe",
			"#05ffa1",
			"#b967ff",
			"#fffb96"
		],
		category: "keycaps"
	},
	{
		id: "hyperfuse",
		name: "Hyperfuse",
		colors: [
			"#3d3d4a",
			"#5a5a6b",
			"#6b4a8b",
			"#9b6bc4",
			"#c9a8e8"
		],
		category: "keycaps"
	},
	{
		id: "peaches-n-cream",
		name: "Peaches n Cream",
		colors: [
			"#f5f0e6",
			"#f0d8c8",
			"#e8b8a0",
			"#d4907a",
			"#c77060"
		],
		category: "keycaps"
	},
	{
		id: "terra",
		name: "Terra",
		colors: [
			"#2d2d2d",
			"#5c4a3d",
			"#8b6b52",
			"#c9a86c",
			"#f5e8d8"
		],
		category: "keycaps"
	},
	{
		id: "pulse",
		name: "Pulse",
		colors: [
			"#1a2634",
			"#2d4a5c",
			"#00bcd4",
			"#00e5ff",
			"#f5f5f5"
		],
		category: "keycaps"
	},
	{
		id: "evil-dolch",
		name: "Evil Dolch",
		colors: [
			"#1a1a1a",
			"#2d2d2d",
			"#4a4a4a",
			"#8b0000",
			"#c40000"
		],
		category: "keycaps"
	},
	{
		id: "taro",
		name: "Taro",
		colors: [
			"#f5f0fa",
			"#e8d8f0",
			"#c9a8d8",
			"#9b6bb8",
			"#6b3a8b"
		],
		category: "keycaps"
	},
	{
		id: "honeywell",
		name: "Honeywell",
		colors: [
			"#f5f5f0",
			"#e8e8dc",
			"#2d2d2d",
			"#8b0000",
			"#1a1a1a"
		],
		category: "keycaps"
	},
	{
		id: "belafonte",
		name: "Belafonte",
		colors: [
			"#F0F1F0",
			"#CC5E3D",
			"#F4CB43",
			"#89BFD2",
			"#56A6C3",
			"#272C30"
		],
		category: "vintage"
	},
	{
		id: "zissou",
		name: "Team Zissou",
		colors: [
			"#0d4a6b",
			"#2e8bb8",
			"#f5f0e6",
			"#c40000",
			"#f0c040"
		],
		category: "vintage"
	},
	{
		id: "tenenbaum",
		name: "375th Street",
		colors: [
			"#8b0000",
			"#d4907a",
			"#e8c9a0",
			"#f5f0e6",
			"#4a7c59"
		],
		category: "vintage"
	},
	{
		id: "darjeeling",
		name: "The Whitman Brothers",
		colors: [
			"#f0c040",
			"#e88030",
			"#5a9bba",
			"#c77060",
			"#f5f0e6"
		],
		category: "vintage"
	},
	{
		id: "moonrise",
		name: "Khaki Scout",
		colors: [
			"#f0d860",
			"#6b8e23",
			"#c77b4a",
			"#f5f0e6",
			"#5a4a3d"
		],
		category: "vintage"
	},
	{
		id: "grand-budapest",
		name: "Mendl's",
		colors: [
			"#d4658f",
			"#9c4070",
			"#f5e6d3",
			"#7b2d5b",
			"#f0c040"
		],
		category: "vintage"
	},
	{
		id: "apocalypse-now",
		name: "The Horror",
		colors: [
			"#2d4a3e",
			"#6b8b6b",
			"#c9a86c",
			"#8b4513",
			"#1a1a1a"
		],
		category: "vintage"
	},
	{
		id: "casablanca",
		name: "Here's Looking at You",
		colors: [
			"#0a0a0a",
			"#1a1a1a",
			"#3d3d3d",
			"#6b6b6b",
			"#a0a0a0"
		],
		category: "vintage"
	},
	{
		id: "citizen-kane",
		name: "Rosebud",
		colors: [
			"#2d2d2e",
			"#5a5a58",
			"#8b8b88",
			"#b8b8b4",
			"#e0e0dc"
		],
		category: "vintage"
	},
	{
		id: "saturday-night-fever",
		name: "Staying Alive",
		colors: [
			"#0d0d0d",
			"#c9a227",
			"#f0d060",
			"#ff00ff",
			"#00ffff"
		],
		category: "vintage"
	},
	{
		id: "boogie-nights",
		name: "Dirk Diggler",
		colors: [
			"#8b4513",
			"#ff6347",
			"#ffd700",
			"#9acd32",
			"#9370db"
		],
		category: "vintage"
	},
	{
		id: "thelma-louise",
		name: "Keep Driving",
		colors: [
			"#c40000",
			"#f5f0e6",
			"#4a7c8a",
			"#c9a227",
			"#2d2d2d"
		],
		category: "vintage"
	},
	{
		id: "amelie",
		name: "Café des Deux Moulins",
		colors: [
			"#ff6347",
			"#ffd700",
			"#4682b4",
			"#228b22",
			"#f5f5dc"
		],
		category: "vintage"
	},
	{
		id: "gatsby",
		name: "Old Sport",
		colors: [
			"#0d0d0d",
			"#1a1a2e",
			"#c9a227",
			"#2e8b8b",
			"#f5f0e6"
		],
		category: "vintage"
	},
	{
		id: "maschinenmensch",
		name: "Maschinenmensch",
		colors: [
			"#000000",
			"#dd0100",
			"#fac901",
			"#225095",
			"#ffffff"
		],
		category: "vintage"
	},
	{
		id: "american-graffiti",
		name: "Mel's Drive-In",
		colors: [
			"#c9a86c",
			"#8b6914",
			"#4a3c1a",
			"#c40000",
			"#f5f0e6"
		],
		category: "vintage"
	},
	{
		id: "grease",
		name: "Rydell High",
		colors: [
			"#ff1493",
			"#00ced1",
			"#ffd700",
			"#ff4500",
			"#1a1a1a"
		],
		category: "vintage"
	},
	{
		id: "rebel",
		name: "Chickie Run",
		colors: [
			"#1a1a2e",
			"#ff4500",
			"#ffd700",
			"#f5f0e6",
			"#8b0000"
		],
		category: "vintage"
	},
	{
		id: "psycho",
		name: "Bates Motel",
		colors: [
			"#1a1a2e",
			"#ff1493",
			"#00ffff",
			"#ff6600",
			"#f5f0e6"
		],
		category: "vintage"
	},
	{
		id: "memento",
		name: "Remember Sammy Jankis",
		colors: [
			"#f5f5f0",
			"#ff4500",
			"#ffd700",
			"#228b22",
			"#4169e1"
		],
		category: "vintage"
	},
	{
		id: "videodrome",
		name: "Long Live the New Flesh",
		colors: [
			"#1a1a1a",
			"#0000ff",
			"#ff0000",
			"#00ff00",
			"#ffffff"
		],
		category: "vintage"
	},
	{
		id: "tron",
		name: "End of Line",
		colors: [
			"#000000",
			"#ff4136",
			"#ff851b",
			"#2ecc40",
			"#7fdbff"
		],
		category: "vintage"
	},
	{
		id: "blade-runner",
		name: "Voight-Kampff",
		colors: [
			"#40318d",
			"#7869c4",
			"#5a4fc4",
			"#a0a0ff",
			"#ffffff"
		],
		category: "vintage"
	},
	{
		id: "crimson-peak",
		name: "Allerdale Hall",
		colors: [
			"#2d1a2e",
			"#5c3a5c",
			"#8b6b8b",
			"#c9a227",
			"#f5f0e6"
		],
		category: "vintage"
	},
	{
		id: "chicago",
		name: "Cell Block Tango",
		colors: [
			"#1a0f0a",
			"#3d2914",
			"#c9a227",
			"#f0d060",
			"#8b0000"
		],
		category: "vintage"
	},
	{
		id: "la-la-land",
		name: "Griffith Observatory",
		colors: [
			"#1a1a2e",
			"#8b0000",
			"#c9a227",
			"#f5f0e6",
			"#2e4a6b"
		],
		category: "vintage"
	},
	{
		id: "tech-startup",
		name: "Tech Startup",
		colors: [
			"#0d0d0d",
			"#1a1a2e",
			"#4361ee",
			"#7209b7",
			"#f72585"
		],
		category: "modern"
	},
	{
		id: "canabalt",
		name: "Canabalt",
		colors: [
			"#111111",
			"#333333",
			"#666666",
			"#999999",
			"#ffffff"
		],
		category: "modern"
	},
	{
		id: "neon-tokyo",
		name: "Neon Tokyo",
		colors: [
			"#0f0e17",
			"#2e2157",
			"#ff2a6d",
			"#05d9e8",
			"#d1f7ff"
		],
		category: "modern"
	},
	{
		id: "linkedin",
		name: "Easy Apply",
		colors: [
			"#1a365d",
			"#2b6cb0",
			"#4299e1",
			"#bee3f8",
			"#ebf8ff"
		],
		category: "modern"
	},
	{
		id: "melatonin",
		name: "Melatonin",
		colors: [
			"#667eea",
			"#764ba2",
			"#f093fb",
			"#f5576c",
			"#ffd89b"
		],
		category: "modern"
	},
	{
		id: "figma",
		name: "Auto Layout",
		colors: [
			"#0acf83",
			"#a259ff",
			"#f24e1e",
			"#ff7262",
			"#1abcfe"
		],
		category: "modern"
	},
	{
		id: "notion",
		name: "Synced Block",
		colors: [
			"#000000",
			"#37352f",
			"#9b9a97",
			"#e8e8e8",
			"#ffffff"
		],
		category: "modern"
	},
	{
		id: "vercel",
		name: "Edge Request",
		colors: [
			"#000000",
			"#171717",
			"#333333",
			"#666666",
			"#ffffff"
		],
		category: "modern"
	},
	{
		id: "stripe",
		name: "Test Mode",
		colors: [
			"#0a2540",
			"#425466",
			"#635bff",
			"#80e9ff",
			"#ffffff"
		],
		category: "modern"
	},
	{
		id: "discord",
		name: "Kitten Daddy",
		colors: [
			"#23272a",
			"#2c2f33",
			"#5865f2",
			"#99aab5",
			"#ffffff"
		],
		category: "modern"
	},
	{
		id: "spotify",
		name: "War Machine",
		colors: [
			"#121212",
			"#1db954",
			"#191414",
			"#b3b3b3",
			"#ffffff"
		],
		category: "modern"
	},
	{
		id: "duolingo",
		name: "Class Traitor",
		colors: [
			"#58cc02",
			"#89e219",
			"#ffc800",
			"#ff4b4b",
			"#ffffff"
		],
		category: "modern"
	},
	{
		id: "calm-app",
		name: "Sleep Story",
		colors: [
			"#1e3a5f",
			"#2e5a8a",
			"#6b9dc4",
			"#a8d8ea",
			"#f5f8fa"
		],
		category: "modern"
	},
	{
		id: "linear",
		name: "Triage",
		colors: [
			"#000000",
			"#171717",
			"#5e6ad2",
			"#a1a5ff",
			"#ffffff"
		],
		category: "modern"
	},
	{
		id: "arc-browser",
		name: "Chromatic",
		colors: [
			"#1a1a2e",
			"#4a90d9",
			"#f65f53",
			"#fbbc04",
			"#34a853"
		],
		category: "modern"
	},
	{
		id: "obsidian",
		name: "Graph View",
		colors: [
			"#1e1e1e",
			"#262626",
			"#483699",
			"#7f6df2",
			"#d4c4ff"
		],
		category: "modern"
	},
	{
		id: "tailwind",
		name: "Utility First",
		colors: [
			"#0f172a",
			"#38bdf8",
			"#818cf8",
			"#f472b6",
			"#fbbf24"
		],
		category: "modern"
	},
	{
		id: "supabase",
		name: "Row Level Security",
		colors: [
			"#1c1c1c",
			"#2e2e2e",
			"#3ecf8e",
			"#1c8656",
			"#f5f5f5"
		],
		category: "modern"
	},
	{
		id: "github",
		name: "Force Push",
		colors: [
			"#0d1117",
			"#161b22",
			"#238636",
			"#58a6ff",
			"#f0f6fc"
		],
		category: "modern"
	},
	{
		id: "raycast",
		name: "Hotkey",
		colors: [
			"#1a1a1a",
			"#2d2d2d",
			"#ff6363",
			"#ff7eb3",
			"#ffffff"
		],
		category: "modern"
	},
	{
		id: "framer",
		name: "Code Override",
		colors: [
			"#0055ff",
			"#00aaff",
			"#7b61ff",
			"#000000",
			"#ffffff"
		],
		category: "modern"
	},
	{
		id: "glassmorphism",
		name: "Glassmorphism",
		colors: [
			"#ffffff20",
			"#ffffff40",
			"#c9d4dc",
			"#e8f0f0",
			"#f5f8fa"
		],
		category: "modern"
	},
	{
		id: "brutalist",
		name: "Brutalist",
		colors: [
			"#000000",
			"#ffffff",
			"#ff0000",
			"#0000ff",
			"#ffff00"
		],
		category: "modern"
	},
	{
		id: "neumorphism",
		name: "Neumorphism",
		colors: [
			"#e0e5ec",
			"#c8d0db",
			"#a3b1c6",
			"#9baacf",
			"#ffffff"
		],
		category: "modern"
	},
	{
		id: "dark-mode",
		name: "Dark Mode",
		colors: [
			"#0d0d0d",
			"#1a1a1a",
			"#2d2d2d",
			"#4a4a4a",
			"#6b6b6b"
		],
		category: "modern"
	},
	{
		id: "tropical-punch",
		name: "Tropical Punch",
		colors: [
			"#ff595e",
			"#ffca3a",
			"#8ac926",
			"#1982c4",
			"#6a4c93"
		],
		category: "bold"
	},
	{
		id: "holmquist",
		name: "Holmquist",
		colors: [
			"#f72585",
			"#b5179e",
			"#7209b7",
			"#560bad",
			"#480ca8"
		],
		category: "bold"
	},
	{
		id: "candy-shop",
		name: "Candy Shop",
		colors: [
			"#ff69b4",
			"#ff6b6b",
			"#feca57",
			"#48dbfb",
			"#1dd1a1"
		],
		category: "bold"
	},
	{
		id: "pinata",
		name: "Piñata",
		colors: [
			"#ff1493",
			"#ff6600",
			"#ffd700",
			"#00ff7f",
			"#00bfff"
		],
		category: "bold"
	},
	{
		id: "carnival",
		name: "Carnival",
		colors: [
			"#e41a1c",
			"#377eb8",
			"#4daf4a",
			"#984ea3",
			"#ff7f00"
		],
		category: "bold"
	},
	{
		id: "neon-sign",
		name: "Neon Sign",
		colors: [
			"#ff00ff",
			"#00ffff",
			"#ff0080",
			"#80ff00",
			"#ff8000"
		],
		category: "bold"
	},
	{
		id: "memphis-design",
		name: "Memphis Design",
		colors: [
			"#ff4d6d",
			"#45caff",
			"#ffda22",
			"#ff9a3c",
			"#24d05a"
		],
		category: "bold"
	},
	{
		id: "pop-art",
		name: "Pop Art",
		colors: [
			"#ff0000",
			"#ffff00",
			"#0000ff",
			"#ff00ff",
			"#00ffff"
		],
		category: "bold"
	},
	{
		id: "highlighter",
		name: "Highlighter",
		colors: [
			"#ffff00",
			"#ff69b4",
			"#00ff00",
			"#ff8c00",
			"#00ffff"
		],
		category: "bold"
	},
	{
		id: "pride",
		name: "Pride",
		colors: [
			"#e40303",
			"#ff8c00",
			"#ffed00",
			"#008026",
			"#004dff",
			"#750787"
		],
		category: "bold"
	},
	{
		id: "fiesta",
		name: "Fiesta",
		colors: [
			"#e41a1c",
			"#ff7f00",
			"#ffd700",
			"#4daf4a",
			"#377eb8"
		],
		category: "bold"
	},
	{
		id: "mardi-gras",
		name: "Mardi Gras",
		colors: [
			"#7b1fa2",
			"#ffc107",
			"#388e3c"
		],
		category: "bold"
	},
	{
		id: "circus",
		name: "Circus",
		colors: [
			"#e41a1c",
			"#ffd700",
			"#1e88e5",
			"#ffffff",
			"#000000"
		],
		category: "bold"
	},
	{
		id: "gumball",
		name: "Gumball",
		colors: [
			"#ff6b6b",
			"#4ecdc4",
			"#ffe66d",
			"#95e1d3",
			"#f38181"
		],
		category: "bold"
	},
	{
		id: "roller-rink",
		name: "Roller Rink",
		colors: [
			"#ff00ff",
			"#00ffff",
			"#ff6600",
			"#ffff00",
			"#ff0080"
		],
		category: "bold"
	},
	{
		id: "arcade",
		name: "Arcade",
		colors: [
			"#ff0000",
			"#00ff00",
			"#0000ff",
			"#ffff00",
			"#ff00ff"
		],
		category: "bold"
	},
	{
		id: "jelly-bean",
		name: "Jelly Bean",
		colors: [
			"#ff6b6b",
			"#ffd93d",
			"#6bcb77",
			"#4d96ff",
			"#c56cf0"
		],
		category: "bold"
	},
	{
		id: "beach-towel",
		name: "Beach Towel",
		colors: [
			"#ff6b35",
			"#f7c59f",
			"#efefd0",
			"#004e89",
			"#1a659e"
		],
		category: "bold"
	},
	{
		id: "kindergarten",
		name: "Kindergarten",
		colors: [
			"#ff595e",
			"#ffca3a",
			"#8ac926",
			"#1982c4",
			"#6a4c93"
		],
		category: "bold"
	},
	{
		id: "fruit-salad",
		name: "Fruit Salad",
		colors: [
			"#ff6b6b",
			"#ffa502",
			"#2ed573",
			"#ff4757",
			"#7bed9f"
		],
		category: "bold"
	},
	{
		id: "electric",
		name: "Electric",
		colors: [
			"#00f5ff",
			"#f400a1",
			"#e6fb04",
			"#7fff00"
		],
		category: "bold"
	},
	{
		id: "cashmere",
		name: "Cashmere",
		colors: [
			"#f5f0e6",
			"#e8dcc8",
			"#d4c4a8",
			"#c9b896",
			"#b8a888"
		],
		category: "soft"
	},
	{
		id: "macaron",
		name: "Macaron",
		colors: [
			"#f8b4c4",
			"#f0e6a8",
			"#b8e8c8",
			"#a8d8f0",
			"#d4b8f0"
		],
		category: "soft"
	},
	{
		id: "rose-quartz",
		name: "Rose Quartz",
		colors: [
			"#f7cac9",
			"#f0b8b8",
			"#e8a8a8",
			"#f5dcd8",
			"#fdf5f5"
		],
		category: "soft"
	},
	{
		id: "linen",
		name: "Linen",
		colors: [
			"#faf0e6",
			"#f5e6d3",
			"#e8d8c4",
			"#dcc8b4",
			"#d0b8a4"
		],
		category: "soft"
	},
	{
		id: "powder-room",
		name: "Powder Room",
		colors: [
			"#fdf5f5",
			"#f8e8e8",
			"#f0d8d8",
			"#e8c8c8",
			"#e0b8b8"
		],
		category: "soft"
	},
	{
		id: "hygge",
		name: "Hygge",
		colors: [
			"#f5f0e6",
			"#e8dcc8",
			"#c9a86c",
			"#8b6b52",
			"#5c4a3d"
		],
		category: "soft"
	},
	{
		id: "lavender-fields",
		name: "Lavender Fields",
		colors: [
			"#e6e6fa",
			"#d8d8f0",
			"#c9c9e8",
			"#b8b8dc",
			"#a8a8d0"
		],
		category: "soft"
	},
	{
		id: "cherry-blossom",
		name: "Cherry Blossom",
		colors: [
			"#ffb7c5",
			"#ffc8d4",
			"#ffd8e0",
			"#ffe8ec",
			"#fff5f7"
		],
		category: "soft"
	},
	{
		id: "dawn",
		name: "Dawn",
		colors: [
			"#ffecd2",
			"#fcb69f",
			"#f8a4a4",
			"#e8b4b8",
			"#d8c4cc"
		],
		category: "soft"
	},
	{
		id: "mist",
		name: "Mist",
		colors: [
			"#e8f0f0",
			"#dce8e8",
			"#d0e0e0",
			"#c4d8d8",
			"#b8d0d0"
		],
		category: "soft"
	},
	{
		id: "seashell",
		name: "Seashell",
		colors: [
			"#fff5ee",
			"#ffe4d4",
			"#ffd4c4",
			"#ffc4b4",
			"#ffb4a4"
		],
		category: "soft"
	},
	{
		id: "dove",
		name: "Dove",
		colors: [
			"#f5f5f5",
			"#e8e8e8",
			"#dcdcdc",
			"#d0d0d0",
			"#c4c4c4"
		],
		category: "soft"
	},
	{
		id: "petal",
		name: "Petal",
		colors: [
			"#fce4ec",
			"#f8bbd9",
			"#f48fb1",
			"#f06292",
			"#ec407a"
		],
		category: "soft"
	},
	{
		id: "cotton",
		name: "Cotton",
		colors: [
			"#ffffff",
			"#faf8f5",
			"#f5f0eb",
			"#f0e8e0",
			"#ebe0d6"
		],
		category: "soft"
	},
	{
		id: "blush",
		name: "Blush",
		colors: [
			"#fef0f0",
			"#fce0e0",
			"#fad0d0",
			"#f8c0c0",
			"#f6b0b0"
		],
		category: "soft"
	},
	{
		id: "whisper",
		name: "Whisper",
		colors: [
			"#f8f8ff",
			"#f0f0f8",
			"#e8e8f0",
			"#e0e0e8",
			"#d8d8e0"
		],
		category: "soft"
	},
	{
		id: "porcelain",
		name: "Porcelain",
		colors: [
			"#fefefe",
			"#f8f8f8",
			"#f0f0f0",
			"#e8e8e8",
			"#e0e0e0"
		],
		category: "soft"
	},
	{
		id: "oat-milk",
		name: "Oat Milk",
		colors: [
			"#f8f4ef",
			"#f0e8dc",
			"#e8dcc8",
			"#e0d0b4",
			"#d8c4a0"
		],
		category: "soft"
	},
	{
		id: "seafoam",
		name: "Seafoam",
		colors: [
			"#e8f8f0",
			"#d8f0e8",
			"#c8e8e0",
			"#b8e0d8",
			"#a8d8d0"
		],
		category: "soft"
	},
	{
		id: "peach-fuzz",
		name: "Peach Fuzz",
		colors: [
			"#ffcdb2",
			"#ffb4a2",
			"#e5989b",
			"#b5838d",
			"#6d6875"
		],
		category: "soft"
	},
	{
		id: "cloud",
		name: "Cloud",
		colors: [
			"#f0f4f8",
			"#e4e8ec",
			"#d8dce0",
			"#ccd0d4",
			"#c0c4c8"
		],
		category: "soft"
	},
	{
		id: "buttercream",
		name: "Buttercream",
		colors: [
			"#fffef0",
			"#fff8dc",
			"#fff0c8",
			"#ffe8b4",
			"#ffe0a0"
		],
		category: "soft"
	},
	{
		id: "ballet",
		name: "Ballet",
		colors: [
			"#f8e8ec",
			"#f0d8e0",
			"#e8c8d4",
			"#e0b8c8",
			"#d8a8bc"
		],
		category: "soft"
	},
	{
		id: "morning-dew",
		name: "Morning Dew",
		colors: [
			"#e8f4e8",
			"#d8ecd8",
			"#c8e4c8",
			"#b8dcb8",
			"#a8d4a8"
		],
		category: "soft"
	},
	{
		id: "chamomile",
		name: "Chamomile",
		colors: [
			"#fdfcf0",
			"#faf8e0",
			"#f7f4d0",
			"#f4f0c0",
			"#f1ecb0"
		],
		category: "soft"
	},
	{
		id: "blue-mono",
		name: "Blue Mono",
		colors: [
			"#03045e",
			"#023e8a",
			"#0077b6",
			"#00b4d8",
			"#90e0ef"
		],
		category: "monochrome"
	},
	{
		id: "forest-mono",
		name: "Forest Mono",
		colors: [
			"#1a2f1a",
			"#2d4a2d",
			"#3f6b3f",
			"#5a8f5a",
			"#7ab67a"
		],
		category: "monochrome"
	},
	{
		id: "burgunmono",
		name: "Burgundy Mono",
		colors: [
			"#2d0a1e",
			"#5c1a3b",
			"#8b2a5c",
			"#b83d78",
			"#d66b9a"
		],
		category: "monochrome"
	},
	{
		id: "urine",
		name: "Urine Mono",
		colors: [
			"#5c4813",
			"#8b6914",
			"#c49b1a",
			"#e6c229",
			"#f5dc69"
		],
		category: "monochrome"
	},
	{
		id: "steel-mono",
		name: "Steel Mono",
		colors: [
			"#1e2832",
			"#374955",
			"#5a7186",
			"#8da1b4",
			"#c7d4df"
		],
		category: "monochrome"
	},
	{
		id: "terracotta-mono",
		name: "Terracotta Mono",
		colors: [
			"#4a2c17",
			"#7d4e2c",
			"#b87240",
			"#d9956a",
			"#f0c4a0"
		],
		category: "monochrome"
	},
	{
		id: "violet-mono",
		name: "Violet Mono",
		colors: [
			"#1a0a2e",
			"#3d1a5c",
			"#6b2d8a",
			"#9a47b8",
			"#c77ddb"
		],
		category: "monochrome"
	},
	{
		id: "midnight-mono",
		name: "Midnight Mono",
		colors: [
			"#0a0a14",
			"#14142b",
			"#232346",
			"#3d3d6b",
			"#5c5c94"
		],
		category: "monochrome"
	},
	{
		id: "sage-mono",
		name: "Sage Mono",
		colors: [
			"#3d4a3d",
			"#5a6b5a",
			"#7a8b7a",
			"#9aab9a",
			"#bacbba"
		],
		category: "monochrome"
	},
	{
		id: "rust-mono",
		name: "Rust Mono",
		colors: [
			"#4a1a0a",
			"#7a2d14",
			"#aa4020",
			"#da5430",
			"#ea7850"
		],
		category: "monochrome"
	},
	{
		id: "charcoal-mono",
		name: "Charcoal Mono",
		colors: [
			"#1a1a1a",
			"#2d2d2d",
			"#404040",
			"#535353",
			"#666666"
		],
		category: "monochrome"
	},
	{
		id: "plum-mono",
		name: "Plum Mono",
		colors: [
			"#2e1a2e",
			"#4a2e4a",
			"#664266",
			"#825a82",
			"#9e729e"
		],
		category: "monochrome"
	},
	{
		id: "slate-mono",
		name: "Slate Mono",
		colors: [
			"#1e293b",
			"#334155",
			"#475569",
			"#64748b",
			"#94a3b8"
		],
		category: "monochrome"
	},
	{
		id: "copper-mono",
		name: "Copper Mono",
		colors: [
			"#4a2c17",
			"#7a4a2a",
			"#aa6840",
			"#ca8860",
			"#eaa880"
		],
		category: "monochrome"
	},
	{
		id: "indigo-mono",
		name: "Indigo Mono",
		colors: [
			"#1a1a4a",
			"#2e2e6b",
			"#42428c",
			"#5656ad",
			"#6a6ace"
		],
		category: "monochrome"
	},
	{
		id: "olive-mono",
		name: "Olive Mono",
		colors: [
			"#2a2e1a",
			"#3f452a",
			"#545c3a",
			"#69734a",
			"#7e8a5a"
		],
		category: "monochrome"
	},
	{
		id: "amber-mono",
		name: "Amber Mono",
		colors: [
			"#4a3000",
			"#7a5000",
			"#aa7000",
			"#da9000",
			"#fab000"
		],
		category: "monochrome"
	},
	{
		id: "wine-mono",
		name: "Wine Mono",
		colors: [
			"#2e0a14",
			"#5c1428",
			"#8a1e3c",
			"#b82850",
			"#d64070"
		],
		category: "monochrome"
	},
	{
		id: "ink-mono",
		name: "Ink Mono",
		colors: [
			"#0a0a0f",
			"#14141f",
			"#1e1e2f",
			"#28283f",
			"#32324f"
		],
		category: "monochrome"
	},
	{
		id: "cream-mono",
		name: "Cream Mono",
		colors: [
			"#c8c0b0",
			"#d4ccc0",
			"#e0d8d0",
			"#ece4e0",
			"#f8f0f0"
		],
		category: "monochrome"
	},
	{
		id: "teal-mono",
		name: "Teal Mono",
		colors: [
			"#0a2a2a",
			"#144040",
			"#1e5656",
			"#286c6c",
			"#328282"
		],
		category: "monochrome"
	},
	{
		id: "mauve-mono",
		name: "Mauve Mono",
		colors: [
			"#3c2a3c",
			"#5a3e5a",
			"#785278",
			"#966696",
			"#b47ab4"
		],
		category: "monochrome"
	},
	{
		id: "espresso-mono",
		name: "Espresso Mono",
		colors: [
			"#1a0f0a",
			"#2e1a14",
			"#42251e",
			"#563028",
			"#6a3b32"
		],
		category: "monochrome"
	},
	{
		id: "storm-mono",
		name: "Storm Mono",
		colors: [
			"#1a1e2e",
			"#2e3446",
			"#424a5e",
			"#566076",
			"#6a768e"
		],
		category: "monochrome"
	},
	{
		id: "january",
		name: "January",
		colors: [
			"#e8f4f8",
			"#c9dce8",
			"#8ab4c4",
			"#5a8faa",
			"#2d5a6b"
		],
		category: "seasonal"
	},
	{
		id: "february",
		name: "February",
		colors: [
			"#fce4ec",
			"#f8bbd9",
			"#ec407a",
			"#ad1457",
			"#880e4f"
		],
		category: "seasonal"
	},
	{
		id: "march",
		name: "March",
		colors: [
			"#e8f5e9",
			"#a5d6a7",
			"#66bb6a",
			"#43a047",
			"#2e7d32"
		],
		category: "seasonal"
	},
	{
		id: "april",
		name: "April",
		colors: [
			"#b8d8e8",
			"#90c4d8",
			"#68b0c8",
			"#409cb8",
			"#2088a8"
		],
		category: "seasonal"
	},
	{
		id: "may",
		name: "May",
		colors: [
			"#ffebee",
			"#f8bbd9",
			"#ce93d8",
			"#ba68c8",
			"#ab47bc"
		],
		category: "seasonal"
	},
	{
		id: "june",
		name: "June",
		colors: [
			"#fff8e1",
			"#ffecb3",
			"#ffd54f",
			"#ffca28",
			"#ffc107"
		],
		category: "seasonal"
	},
	{
		id: "july",
		name: "July",
		colors: [
			"#ff8a65",
			"#ff7043",
			"#ff5722",
			"#f4511e",
			"#e64a19"
		],
		category: "seasonal"
	},
	{
		id: "august",
		name: "August",
		colors: [
			"#fff3e0",
			"#ffe0b2",
			"#ffb74d",
			"#ffa726",
			"#ff9800"
		],
		category: "seasonal"
	},
	{
		id: "september",
		name: "September",
		colors: [
			"#efebe9",
			"#d7ccc8",
			"#a1887f",
			"#8d6e63",
			"#6d4c41"
		],
		category: "seasonal"
	},
	{
		id: "october",
		name: "October",
		colors: [
			"#1a1a1a",
			"#4e342e",
			"#bf360c",
			"#e65100",
			"#f57c00"
		],
		category: "seasonal"
	},
	{
		id: "november",
		name: "November",
		colors: [
			"#3e2723",
			"#5d4037",
			"#795548",
			"#a1887f",
			"#d7ccc8"
		],
		category: "seasonal"
	},
	{
		id: "december",
		name: "December",
		colors: [
			"#1b5e20",
			"#c62828",
			"#ffd54f",
			"#efebe9",
			"#37474f"
		],
		category: "seasonal"
	},
	{
		id: "spring-equinox",
		name: "Spring Equinox",
		colors: [
			"#c8e6c9",
			"#a5d6a7",
			"#81c784",
			"#66bb6a",
			"#4caf50"
		],
		category: "seasonal"
	},
	{
		id: "summer-solstice",
		name: "Summer Solstice",
		colors: [
			"#fff59d",
			"#fff176",
			"#ffee58",
			"#ffeb3b",
			"#fdd835"
		],
		category: "seasonal"
	},
	{
		id: "autumn-equinox",
		name: "Autumn Equinox",
		colors: [
			"#8d6e63",
			"#a1887f",
			"#bcaaa4",
			"#d7ccc8",
			"#efebe9"
		],
		category: "seasonal"
	},
	{
		id: "winter-solstice",
		name: "Winter Solstice",
		colors: [
			"#0d1a26",
			"#1a3a5c",
			"#2e5a8a",
			"#4a8ab4",
			"#8ab8d8"
		],
		category: "seasonal"
	},
	{
		id: "first-frost",
		name: "First Frost",
		colors: [
			"#e3f2fd",
			"#bbdefb",
			"#90caf9",
			"#64b5f6",
			"#42a5f5"
		],
		category: "seasonal"
	},
	{
		id: "harvest-moon",
		name: "Harvest Moon",
		colors: [
			"#ffcc80",
			"#ffb74d",
			"#ffa726",
			"#ff9800",
			"#fb8c00"
		],
		category: "seasonal"
	},
	{
		id: "indian-summer",
		name: "Indian Summer",
		colors: [
			"#c9a86c",
			"#d4a574",
			"#deb887",
			"#e8c9a0",
			"#f5deb3"
		],
		category: "seasonal"
	},
	{
		id: "spring-rain",
		name: "Spring Rain",
		colors: [
			"#b0bec5",
			"#90a4ae",
			"#78909c",
			"#607d8b",
			"#546e7a"
		],
		category: "seasonal"
	},
	{
		id: "midwinter",
		name: "Midwinter",
		colors: [
			"#1a2634",
			"#2d4052",
			"#405a70",
			"#53748e",
			"#668eac"
		],
		category: "seasonal"
	},
	{
		id: "dog-days",
		name: "Dog Days",
		colors: [
			"#ff8a65",
			"#ffab91",
			"#ffccbc",
			"#fbe9e7",
			"#fff3e0"
		],
		category: "seasonal"
	},
	{
		id: "falling-leaves",
		name: "Falling Leaves",
		colors: [
			"#8d6e63",
			"#bf360c",
			"#e65100",
			"#ff9800",
			"#ffc107"
		],
		category: "seasonal"
	},
	{
		id: "snowfall",
		name: "Snowfall",
		colors: [
			"#eceff1",
			"#e0e0e0",
			"#bdbdbd",
			"#9e9e9e",
			"#757575"
		],
		category: "seasonal"
	},
	{
		id: "monet",
		name: "Monet",
		colors: [
			"#2b4a5c",
			"#4a7c8a",
			"#8ab4c4",
			"#c5dce6",
			"#e8f1f5"
		],
		category: "artistic"
	},
	{
		id: "van-gogh",
		name: "Vincent",
		colors: [
			"#0c1445",
			"#1e3a5f",
			"#2e5a7e",
			"#f0c14b",
			"#f5e6a3"
		],
		category: "artistic"
	},
	{
		id: "mondrian",
		name: "Mondrian",
		colors: [
			"#000000",
			"#ffffff",
			"#dd0100",
			"#fac901",
			"#225095"
		],
		category: "artistic"
	},
	{
		id: "klimt",
		name: "Klimt",
		colors: [
			"#1a1a0f",
			"#4a4528",
			"#8b7d3c",
			"#c9a227",
			"#f0d060"
		],
		category: "artistic"
	},
	{
		id: "go-fuck-yourself",
		name: "Warhol",
		colors: [
			"#f50057",
			"#ffea00",
			"#00e5ff",
			"#76ff03",
			"#d500f9"
		],
		category: "artistic"
	},
	{
		id: "rothko-chapel",
		name: "Rothko",
		colors: [
			"#1a1a1a",
			"#2d2d2d",
			"#3d3d3d",
			"#4a4a4a",
			"#5c5c5c"
		],
		category: "artistic"
	},
	{
		id: "hokusai-wave",
		name: "Hokusai",
		colors: [
			"#1a2744",
			"#2e5077",
			"#4e8aaa",
			"#8ab4c4",
			"#f5efe6"
		],
		category: "artistic"
	},
	{
		id: "picasso-blue",
		name: "Picasso (Blue)",
		colors: [
			"#0a1628",
			"#1a3a5c",
			"#2e5a8a",
			"#4a8ab4",
			"#8ab8d8"
		],
		category: "artistic"
	},
	{
		id: "matisse-cut-outs",
		name: "Matisse (Cut-Outs)",
		colors: [
			"#1a237e",
			"#e53935",
			"#fdd835",
			"#43a047",
			"#ff9800"
		],
		category: "artistic"
	},
	{
		id: "seurat-dots",
		name: "Seurat",
		colors: [
			"#5c7a4e",
			"#8b9a6b",
			"#d4c88e",
			"#e8d5a8",
			"#a67c52"
		],
		category: "artistic"
	},
	{
		id: "basquiat",
		name: "Basquiat",
		colors: [
			"#000000",
			"#ff0000",
			"#ffff00",
			"#0000ff",
			"#ffffff"
		],
		category: "artistic"
	},
	{
		id: "hockney",
		name: "Hockney",
		colors: [
			"#00bfff",
			"#40e0d0",
			"#ff6b6b",
			"#ffd93d",
			"#ff69b4"
		],
		category: "artistic"
	},
	{
		id: "okeeffe",
		name: "O'Keeffe",
		colors: [
			"#f5deb3",
			"#deb887",
			"#d2691e",
			"#8b4513",
			"#2f4f4f"
		],
		category: "artistic"
	},
	{
		id: "kahlo",
		name: "Kahlo",
		colors: [
			"#c62828",
			"#f9a825",
			"#2e7d32",
			"#1565c0",
			"#6a1b9a"
		],
		category: "artistic"
	},
	{
		id: "pollock",
		name: "Pollock",
		colors: [
			"#000000",
			"#ffffff",
			"#ffeb3b",
			"#2196f3",
			"#f44336"
		],
		category: "artistic"
	},
	{
		id: "kandinsky",
		name: "Kandinsky",
		colors: [
			"#1a237e",
			"#c62828",
			"#ffd600",
			"#000000",
			"#ffffff"
		],
		category: "artistic"
	},
	{
		id: "magritte",
		name: "Magritte",
		colors: [
			"#87ceeb",
			"#2e8b57",
			"#8b4513",
			"#f5f5dc",
			"#000000"
		],
		category: "artistic"
	},
	{
		id: "dali",
		name: "Dalí",
		colors: [
			"#f4a460",
			"#deb887",
			"#87ceeb",
			"#ffd700",
			"#8b0000"
		],
		category: "artistic"
	},
	{
		id: "vermeer",
		name: "Vermeer",
		colors: [
			"#1a1a2e",
			"#4a5568",
			"#f0e6d3",
			"#c9a227",
			"#2e5a8a"
		],
		category: "artistic"
	},
	{
		id: "rembrandt",
		name: "Rembrandt",
		colors: [
			"#1a0f0a",
			"#3d2914",
			"#6b4423",
			"#c9a86c",
			"#f0e6d3"
		],
		category: "artistic"
	},
	{
		id: "turner",
		name: "Turner",
		colors: [
			"#ffd89b",
			"#f0c040",
			"#e88030",
			"#c77060",
			"#8ab4c4"
		],
		category: "artistic"
	},
	{
		id: "whistler",
		name: "Whistler",
		colors: [
			"#2d2d2d",
			"#4a4a4a",
			"#6b6b6b",
			"#8b8b8b",
			"#ababab"
		],
		category: "artistic"
	},
	{
		id: "hopper",
		name: "Hopper",
		colors: [
			"#1a2634",
			"#c9a86c",
			"#8b0000",
			"#2e5a3d",
			"#f5f0e6"
		],
		category: "artistic"
	},
	{
		id: "thiebaud",
		name: "Thiebaud",
		colors: [
			"#ff69b4",
			"#fffacd",
			"#add8e6",
			"#f5deb3",
			"#ffffff"
		],
		category: "artistic"
	},
	{
		id: "lichtenstein",
		name: "Lichtenstein",
		colors: [
			"#ffff00",
			"#ff0000",
			"#0000ff",
			"#000000",
			"#ffffff"
		],
		category: "artistic"
	},
	{
		id: "koons",
		name: "Koons",
		colors: [
			"#ff69b4",
			"#00bfff",
			"#ffd700",
			"#ff4500",
			"#9400d3"
		],
		category: "artistic"
	},
	{
		id: "hirst",
		name: "Hirst",
		colors: [
			"#00ffff",
			"#ff00ff",
			"#ffff00",
			"#ff0000",
			"#00ff00"
		],
		category: "artistic"
	},
	{
		id: "banksy",
		name: "Banksy",
		colors: [
			"#000000",
			"#ff0000",
			"#ffffff",
			"#808080"
		],
		category: "artistic"
	},
	{
		id: "caravaggio",
		name: "Caravaggio",
		colors: [
			"#0a0a0a",
			"#1a1a1a",
			"#4a3c2e",
			"#8b6b52",
			"#c9a86c"
		],
		category: "artistic"
	},
	{
		id: "botticelli",
		name: "Botticelli",
		colors: [
			"#f0e6d3",
			"#e8c9a0",
			"#d4a574",
			"#8ab4c4",
			"#6b8e6b"
		],
		category: "artistic"
	},
	{
		id: "degas",
		name: "Degas",
		colors: [
			"#f8e8ec",
			"#e8c9d4",
			"#c9a8b8",
			"#a88b9b",
			"#8b6b7a"
		],
		category: "artistic"
	},
	{
		id: "renoir",
		name: "Renoir",
		colors: [
			"#ffcdb2",
			"#ffb4a2",
			"#e5989b",
			"#b5838d",
			"#6d6875"
		],
		category: "artistic"
	},
	{
		id: "cezanne",
		name: "Cézanne",
		colors: [
			"#6b8e6b",
			"#8bb89b",
			"#c9d4a8",
			"#e8c9a0",
			"#f0e6d3"
		],
		category: "artistic"
	},
	{
		id: "gauguin",
		name: "Gauguin",
		colors: [
			"#ff6347",
			"#ffd700",
			"#32cd32",
			"#4169e1",
			"#9932cc"
		],
		category: "artistic"
	},
	{
		id: "toulouse-lautrec",
		name: "Toulouse-Lautrec",
		colors: [
			"#000000",
			"#8b0000",
			"#ffd700",
			"#2e8b57",
			"#f5f5dc"
		],
		category: "artistic"
	},
	{
		id: "munch",
		name: "Munch",
		colors: [
			"#ff4500",
			"#ffd700",
			"#1e90ff",
			"#2e2e2e",
			"#f5f5dc"
		],
		category: "artistic"
	},
	{
		id: "schiele",
		name: "Schiele",
		colors: [
			"#2e2e2e",
			"#8b4513",
			"#d2691e",
			"#f4a460",
			"#f5f5dc"
		],
		category: "artistic"
	},
	{
		id: "klee",
		name: "Klee",
		colors: [
			"#ff69b4",
			"#ffd700",
			"#90ee90",
			"#87ceeb",
			"#dda0dd"
		],
		category: "artistic"
	},
	{
		id: "miro",
		name: "Miró",
		colors: [
			"#000000",
			"#ff0000",
			"#ffff00",
			"#0000ff",
			"#228b22"
		],
		category: "artistic"
	},
	{
		id: "chagall",
		name: "Chagall",
		colors: [
			"#4169e1",
			"#9932cc",
			"#ff69b4",
			"#ffd700",
			"#32cd32"
		],
		category: "artistic"
	},
	{
		id: "escher",
		name: "Escher",
		colors: [
			"#000000",
			"#333333",
			"#666666",
			"#999999",
			"#ffffff"
		],
		category: "artistic"
	},
	{
		id: "winslow-homer",
		name: "Winslow Homer",
		colors: [
			"#2e5a8a",
			"#4a8ab4",
			"#8ab8d8",
			"#c9dce8",
			"#f5f0e6"
		],
		category: "artistic"
	},
	{
		id: "sargent",
		name: "Sargent",
		colors: [
			"#1a1a2e",
			"#2d2d4a",
			"#f5f0e6",
			"#e8c9a0",
			"#c77b4a"
		],
		category: "artistic"
	},
	{
		id: "morisot",
		name: "Morisot",
		colors: [
			"#e8f0f0",
			"#c9dce8",
			"#a8c8d8",
			"#88b4c8",
			"#68a0b8"
		],
		category: "artistic"
	},
	{
		id: "cassatt",
		name: "Cassatt",
		colors: [
			"#f8e8ec",
			"#e8d0d8",
			"#d8b8c4",
			"#c8a0b0",
			"#b8889c"
		],
		category: "artistic"
	}
];
var FILTERS = [
	{
		key: "all",
		label: "Todas",
		description: ""
	},
	{
		key: "classic",
		label: "Clássicas",
		description: "Combinações atemporais."
	},
	{
		key: "nature",
		label: "Natureza",
		description: "Inspiradas no mundo natural."
	},
	{
		key: "keycaps",
		label: "Keycaps",
		description: "Inspiradas em conjuntos de teclas."
	},
	{
		key: "vintage",
		label: "Vintage",
		description: "Retrô e nostálgicas."
	},
	{
		key: "modern",
		label: "Modernas",
		description: "Contemporâneas."
	},
	{
		key: "bold",
		label: "Intensas",
		description: "Vivas e chamativas."
	},
	{
		key: "soft",
		label: "Suaves",
		description: "Tons calmos."
	},
	{
		key: "monochrome",
		label: "Monocromáticas",
		description: "Um só matiz."
	},
	{
		key: "seasonal",
		label: "Estações",
		description: "As quatro estações."
	},
	{
		key: "artistic",
		label: "Artísticas",
		description: "Inspiradas em movimentos de arte."
	}
];
function Collection() {
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [query, setQuery] = (0, import_react.useState)("");
	const [copied, setCopied] = (0, import_react.useState)(null);
	const [opened, setOpened] = (0, import_react.useState)(null);
	const byCategory = (0, import_react.useMemo)(() => {
		const groups = {};
		for (const key of Object.keys(COLLECTION_CATEGORIES)) groups[key] = [];
		for (const palette of CURATED_PALETTES) groups[palette.category].push(palette);
		return groups;
	}, []);
	const visible = (0, import_react.useMemo)(() => {
		const pool = filter === "all" ? CURATED_PALETTES : byCategory[filter];
		const needle = query.trim().toLowerCase();
		if (!needle) return pool;
		return pool.filter((palette) => palette.name.toLowerCase().includes(needle) || palette.colors.some((color) => color.toLowerCase().includes(needle)));
	}, [
		byCategory,
		filter,
		query
	]);
	const active = FILTERS.find((item) => item.key === filter) ?? FILTERS[0];
	const countLabel = query.trim() ? `${visible.length} ${visible.length === 1 ? "resultado" : "resultados"}` : `${CURATED_PALETTES.length} paletas`;
	const copy = async (value, key) => {
		try {
			await navigator.clipboard.writeText(value);
			setCopied(key);
			window.setTimeout(() => setCopied((current) => current === key ? null : current), 1500);
		} catch {
			setCopied(null);
		}
	};
	if (opened) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Genny, {
		name: opened.name,
		colors: opened.colors,
		onBack: () => setOpened(null)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2 sm:flex-row sm:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex min-h-11 min-w-0 flex-1 items-center gap-2 rounded-panel border border-line bg-bg px-3 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4 shrink-0 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: query,
						onChange: (event) => setQuery(event.target.value),
						placeholder: "Buscar paleta ou hex",
						"aria-label": "Buscar paletas",
						className: "min-h-11 w-full bg-transparent text-sm text-fg outline-none"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-widest text-muted",
					children: countLabel
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-4",
				role: "tablist",
				"aria-label": "Categorias",
				children: FILTERS.map((item) => {
					const count = item.key === "all" ? CURATED_PALETTES.length : byCategory[item.key].length;
					const on = filter === item.key;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						role: "tab",
						"aria-selected": on,
						onClick: () => setFilter(item.key),
						className: "flex min-h-11 items-center justify-between gap-2 rounded-panel border px-3 text-left text-sm " + (on ? "border-line bg-bg text-accent" : "border-transparent text-muted hover:border-line hover:text-fg"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "min-w-0",
							children: item.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "shrink-0 text-xs tabular-nums",
							children: count
						})]
					}, item.key);
				})
			}),
			filter !== "all" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: active.description
			}) : null,
			visible.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-3",
				children: visible.map((palette) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "relative overflow-hidden rounded-panel border border-line bg-bg/40 [content-visibility:auto] [contain-intrinsic-size:auto_7.5rem]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setOpened(palette),
						className: "block w-full text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex h-14",
							children: palette.colors.map((color) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "h-full min-w-0 flex-1",
								style: { background: color }
							}, color))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex items-center gap-2 px-3 py-2 pr-14",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block truncate text-sm text-fg",
									children: palette.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "block text-xs text-muted",
									children: [palette.colors.length, " cores"]
								})]
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": `Copiar paleta ${palette.name}`,
						onClick: () => void copy(palette.colors.join("\n"), palette.id),
						className: "absolute bottom-1 right-1 inline-flex size-11 items-center justify-center text-muted hover:text-fg",
						children: copied === palette.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-accent" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" })
					})]
				}, palette.id))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-panel border border-dashed border-line px-4 py-10 text-center text-sm text-muted",
				children: "Nenhuma paleta com esse filtro."
			})
		]
	});
}
//#endregion
export { Collection };
