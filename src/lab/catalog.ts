export type ExperimentId = "mixer" | "raios" | "ascii" | "paleta" | "grade" | "shades" | "collection" | "passwords" | "qr" | "gradient" | "sobre";

export type Experiment = {
  id: ExperimentId;
  key: string;
  index: string;
  name: string;
  blurb: string;
};

export const EXPERIMENTS: Experiment[] = [
  {
    id: "mixer",
    key: "1",
    index: "01",
    name: "Youtube Mixer",
    blurb: "Vários vídeos do YouTube ao mesmo tempo, cada um com volume.",
  },
  {
    id: "raios",
    key: "2",
    index: "02",
    name: "Raios",
    blurb: "Dispersão do campo que fica atrás de tudo.",
  },
  {
    id: "ascii",
    key: "3",
    index: "03",
    name: "ASCII",
    blurb: "Vórtice de caracteres. Solta uma imagem.",
  },
  {
    id: "paleta",
    key: "4",
    index: "04",
    name: "Palette Extractor",
    blurb: "Extrai cores dominantes de uma foto.",
  },
  {
    id: "grade",
    key: "5",
    index: "05",
    name: "Grade",
    blurb: "Desenho em células. Exporta PNG.",
  },
  {
    id: "shades",
    key: "6",
    index: "06",
    name: "Tailwind Shade Generator",
    blurb: "Escala 50–950 no estilo Tailwind, a partir de uma cor.",
  },
  {
    id: "collection",
    key: "7",
    index: "07",
    name: "Palette Collection",
    blurb: "Paletas prontas para copiar. Busca por nome ou hex.",
  },
  {
    id: "passwords",
    key: "8",
    index: "08",
    name: "Password Generator",
    blurb: "Senhas e frases-passe. Copia uma ou a lista inteira.",
  },
  {
    id: "qr",
    key: "9",
    index: "09",
    name: "QR Generator",
    blurb: "Texto, Wi-Fi, contato ou um lote. Baixa PNG, SVG ou ZIP.",
  },
  {
    id: "gradient",
    key: "g",
    index: "10",
    name: "Gradient Generator",
    blurb: "Linear, cantos ou malha. Copia o CSS ou baixa um PNG.",
  },
  {
    id: "sobre",
    key: "0",
    index: "11",
    name: "Sobre",
    blurb: "O que é o Prisma.",
  },
];

export function findExperiment(id: string | null): Experiment | null {
  return EXPERIMENTS.find((item) => item.id === id) ?? null;
}
