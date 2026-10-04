import { memo, useCallback, useEffect, useRef, useState } from "react";
import ClipboardPaste from "lucide-react/dist/esm/icons/clipboard-paste.js";
import Copy from "lucide-react/dist/esm/icons/copy.js";
import Eye from "lucide-react/dist/esm/icons/eye.js";
import EyeOff from "lucide-react/dist/esm/icons/eye-off.js";
import PanelLeft from "lucide-react/dist/esm/icons/panel-left.js";
import Pause from "lucide-react/dist/esm/icons/pause.js";
import Play from "lucide-react/dist/esm/icons/play.js";
import Plus from "lucide-react/dist/esm/icons/plus.js";
import Save from "lucide-react/dist/esm/icons/save.js";
import Shuffle from "lucide-react/dist/esm/icons/shuffle.js";
import SkipBack from "lucide-react/dist/esm/icons/skip-back.js";
import SkipForward from "lucide-react/dist/esm/icons/skip-forward.js";
import Trash2 from "lucide-react/dist/esm/icons/trash-2.js";
import Volume2 from "lucide-react/dist/esm/icons/volume-2.js";
import VolumeX from "lucide-react/dist/esm/icons/volume-x.js";
import X from "lucide-react/dist/esm/icons/x.js";

type Slot = {
  id: string;
  input: string;
  videoId: string | null;
  listId: string | null;
  audioUrl: string | null;
  audioName: string | null;
  volume: number;
};

type Preset = { name: string; url: string };
type Mix = { id: string; name: string; slots: { url: string; volume: number }[]; builtIn?: boolean };

type YtHandle = {
  playVideo: () => void;
  pauseVideo: () => void;
  setVolume: (volume: number) => void;
  nextVideo?: () => void;
  previousVideo?: () => void;
  setShuffle?: (on: boolean) => void;
  destroy?: () => void;
};

declare global {
  interface Window {
    YT?: { Player: new (el: HTMLElement, options: Record<string, unknown>) => YtHandle };
    onYouTubeIframeAPIReady?: () => void;
  }
}

const IDS = ["a", "b", "c", "d"] as const;
const SAVES_KEY = "prisma-mixer-saves";
const RECENT_KEY = "prisma-mixer-recent";

const TEXTURES: Preset[] = [
  { name: "Chuva", url: "https://www.youtube.com/watch?v=M-Q2Extc6z8" },
  { name: "Neve", url: "https://www.youtube.com/watch?v=WoFKSR6ed2Q" },
  { name: "Pássaros", url: "https://www.youtube.com/watch?v=EwgVwlcWn4Y" },
  { name: "Tempestade", url: "https://www.youtube.com/watch?v=FfVaHQXI-TQ" },
  { name: "Vinil", url: "https://www.youtube.com/watch?v=DUhdSWsapuA" },
  { name: "Fogo", url: "https://www.youtube.com/watch?v=mSX3OyW9Rao" },
  { name: "Makita", url: "https://www.youtube.com/watch?v=BFl_AvhXsOE" },
  { name: "Grilos", url: "https://www.youtube.com/watch?v=3u2FkPfIwBc" },
  { name: "Rádio", url: "https://www.youtube.com/watch?v=gm7z_27oraI" },
  { name: "Biblioteca", url: "https://www.youtube.com/watch?v=4vIQON2fDWM" },
  { name: "Mar", url: "https://www.youtube.com/watch?v=JekUNGo-RVk" },
  { name: "Crianças", url: "https://www.youtube.com/watch?v=bGIDRa4lRuU" },
  { name: "Ruído", url: "https://www.youtube.com/watch?v=AmR6MGnAYc0" },
  { name: "Lago", url: "https://www.youtube.com/watch?v=SgEQrUIKJ6Y" },
  { name: "Vento", url: "https://www.youtube.com/watch?v=7uKvdJ8A9lw" },
  { name: "Cidade", url: "https://www.youtube.com/watch?v=T5d8bzcMbeQ" },
];

const LOOPS: Preset[] = [
  { name: "175 BPM", url: "https://www.youtube.com/watch?v=2nn_VWbFzKE" },
  { name: "152 BPM", url: "https://www.youtube.com/watch?v=Uw6V_i6ZYqI" },
  { name: "80 BPM", url: "https://www.youtube.com/watch?v=49ttJ4W6R60" },
  { name: "67 BPM", url: "https://www.youtube.com/watch?v=G4EBjnhy9aM" },
  { name: "Voltmix", url: "https://www.youtube.com/watch?v=whw1PxFkaos" },
];

const SCENES: Preset[] = [
  { name: "Oregon", url: "https://www.youtube.com/watch?v=nZ3wV6Z68Vk" },
  { name: "Deep", url: "https://www.youtube.com/watch?v=rmOzpR0AchA" },
  { name: "Swamp", url: "https://www.youtube.com/watch?v=2pv3g5SVcfc" },
  { name: "Brasil", url: "https://www.youtube.com/watch?v=9ScVvOI32yE" },
  { name: "Tarde", url: "https://www.youtube.com/watch?v=jtjB_Ucn8_k" },
  { name: "Deserto", url: "https://www.youtube.com/watch?v=v4M6kLRGGCo" },
  { name: "Manhã", url: "https://www.youtube.com/watch?v=zGs8ykoH_2Q" },
  { name: "Alien", url: "https://www.youtube.com/watch?v=u9a1EQS_9Wo&list=PLVovUzLdR8iNvRVPUEZ5jd0ibKdKlSZab" },
  { name: "Mount Shrine", url: "https://www.youtube.com/watch?v=nVRbAL03GIs" },
  { name: "Cosmic City", url: "https://youtu.be/7rgG3sboipg" },
  { name: "Nuketown", url: "https://youtu.be/JTVtlfKr8qU" },
];

const byName = (name: string) =>
  [...TEXTURES, ...LOOPS, ...SCENES].find((item) => item.name === name)?.url ?? "";

const STARTER: Mix[] = [
  { id: "chuva-vinil", name: "Chuva e vinil", builtIn: true, slots: [mixSlot("Chuva"), mixSlot("Vinil")] },
  { id: "fogueira", name: "Fogueira", builtIn: true, slots: [mixSlot("Fogo"), mixSlot("Grilos")] },
  { id: "cidade", name: "Cidade molhada", builtIn: true, slots: [mixSlot("Cidade"), mixSlot("Chuva")] },
  { id: "biblioteca", name: "Biblioteca", builtIn: true, slots: [mixSlot("Biblioteca"), mixSlot("Chuva", 40)] },
  { id: "mar", name: "Mar e vento", builtIn: true, slots: [mixSlot("Mar"), mixSlot("Vento", 55)] },
  { id: "lago", name: "Lago", builtIn: true, slots: [mixSlot("Lago"), mixSlot("Pássaros", 45)] },
  { id: "brasil", name: "Brasil", builtIn: true, slots: [mixSlot("Brasil")] },
  { id: "oregon", name: "Noite no Oregon", builtIn: true, slots: [mixSlot("Oregon"), mixSlot("Grilos", 35)] },
];

function mixSlot(name: string, volume = 80) {
  return { url: byName(name), volume };
}

function blank(id: string): Slot {
  return { id, input: "", videoId: null, listId: null, audioUrl: null, audioName: null, volume: 80 };
}

function nextId(current: Slot[]) {
  const used = new Set(current.map((slot) => slot.id));
  return IDS.find((id) => !used.has(id)) ?? `s${current.length}`;
}

function parseYouTube(raw: string): { videoId: string | null; listId: string | null } | null {
  const text = raw.trim();
  if (!text) return null;
  if (/^[\w-]{11}$/.test(text)) return { videoId: text, listId: null };
  let url: URL;
  try {
    url = new URL(text.startsWith("http") ? text : `https://${text}`);
  } catch {
    return null;
  }
  const host = url.hostname.replace(/^www\./, "");
  const listId = url.searchParams.get("list");
  if (host === "youtu.be") {
    const videoId = url.pathname.split("/").filter(Boolean)[0] ?? null;
    if (!videoId && !listId) return null;
    return { videoId, listId };
  }
  if (host.endsWith("youtube.com") || host === "music.youtube.com" || host === "m.youtube.com") {
    const shorts = url.pathname.match(/\/(?:shorts|embed|live)\/([\w-]{11})/);
    const videoId = url.searchParams.get("v") || shorts?.[1] || null;
    if (!videoId && !listId) return null;
    return { videoId, listId };
  }
  return null;
}

let ytPromise: Promise<void> | null = null;

function loadYouTube() {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.YT?.Player) return Promise.resolve();
  if (ytPromise) return ytPromise;
  ytPromise = new Promise((resolve) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve();
    };
    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(script);
    }
  });
  return ytPromise;
}

const YtPlayer = memo(function YtPlayer({
  slotId,
  videoId,
  listId,
  register,
  level,
}: {
  slotId: string;
  videoId: string | null;
  listId: string | null;
  register: (id: string, player: YtHandle | null) => void;
  level: (id: string) => number;
}) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let dead = false;
    let player: YtHandle | null = null;
    void loadYouTube().then(() => {
      if (dead || !hostRef.current || !window.YT?.Player) return;
      host.innerHTML = "";
      const mount = document.createElement("div");
      mount.className = "h-full w-full";
      host.appendChild(mount);
      player = new window.YT.Player(mount, {
        videoId: videoId ?? undefined,
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 1,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          list: listId || undefined,
          origin: window.location.origin,
        },
        events: {
          onReady: (event: { target: YtHandle }) => {
            const frame = host.querySelector("iframe");
            if (frame) {
              frame.style.width = "100%";
              frame.style.height = "100%";
            }
            event.target.setVolume(level(slotId));
            event.target.playVideo();
            register(slotId, event.target);
          },
        },
      });
    });
    return () => {
      dead = true;
      register(slotId, null);
      try {
        player?.destroy?.();
      } catch {
        /* player may already be gone */
      }
      host.innerHTML = "";
    };
  }, [slotId, videoId, listId, register, level]);

  return <div ref={hostRef} className="yt-host h-full w-full" />;
});

function readSaves(): Mix[] {
  try {
    const raw = localStorage.getItem(SAVES_KEY);
    const parsed = raw ? (JSON.parse(raw) as Mix[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function Mixer() {
  const [slots, setSlots] = useState<Slot[]>(() => [blank("a"), blank("b")]);
  const [master, setMaster] = useState(100);
  const [playing, setPlaying] = useState(false);
  const [hideVideos, setHideVideos] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [panels, setPanels] = useState(true);
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<Mix[]>([]);
  const [mixName, setMixName] = useState("");
  const [help, setHelp] = useState(false);
  const [note, setNote] = useState("Cola um link, solta um preset ou um .mp3.");
  const [recent, setRecent] = useState<string[]>([]);
  const [focusId, setFocusId] = useState<string | null>(null);
  const playersRef = useRef(new Map<string, YtHandle>());
  const audiosRef = useRef(new Map<string, HTMLAudioElement>());
  const levels = useRef({ master: 100, volumes: {} as Record<string, number> });
  const playingRef = useRef(false);
  const beforeMute = useRef(100);
  levels.current.master = master;
  for (const slot of slots) levels.current.volumes[slot.id] = slot.volume;

  const levelFor = useCallback((id: string) => {
    return Math.round(((levels.current.volumes[id] ?? 80) * levels.current.master) / 100);
  }, []);

  const register = useCallback((id: string, player: YtHandle | null) => {
    if (player) playersRef.current.set(id, player);
    else playersRef.current.delete(id);
  }, []);

  const registerAudio = useCallback((id: string, audio: HTMLAudioElement | null) => {
    if (audio) audiosRef.current.set(id, audio);
    else audiosRef.current.delete(id);
  }, []);

  useEffect(() => {
    setSaved(readSaves());
    try {
      const raw = localStorage.getItem(RECENT_KEY);
      const parsed = raw ? (JSON.parse(raw) as string[]) : [];
      if (Array.isArray(parsed)) setRecent(parsed.slice(0, 6));
    } catch {
      /* ignore broken storage */
    }
    if (window.matchMedia("(max-width: 768px)").matches) setPanels(false);
  }, []);

  useEffect(() => {
    slots.forEach((slot) => {
      const volume = levelFor(slot.id);
      try {
        playersRef.current.get(slot.id)?.setVolume(volume);
      } catch {
        /* player not ready */
      }
      const audio = audiosRef.current.get(slot.id);
      if (audio) audio.volume = volume / 100;
    });
  }, [slots, master, levelFor]);

  const remember = (url: string) => {
    setRecent((current) => {
      const next = [url, ...current.filter((item) => item !== url)].slice(0, 6);
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      return next;
    });
  };

  const applyMix = (items: { url: string; volume: number }[]) => {
    const usable = items.filter((item) => item.url).slice(0, 4);
    if (!usable.length) return;
    setSlots((current) =>
      usable.map((item, index) => {
        const parsed = parseYouTube(item.url);
        const previous = current[index];
        if (previous?.audioUrl) URL.revokeObjectURL(previous.audioUrl);
        return {
          id: previous?.id ?? IDS[index] ?? `m${index}`,
          input: item.url,
          videoId: parsed?.videoId ?? null,
          listId: parsed?.listId ?? null,
          audioUrl: null,
          audioName: null,
          volume: item.volume,
        };
      }),
    );
    usable.forEach((item) => remember(item.url));
    setNote(`${usable.length} faixa${usable.length > 1 ? "s" : ""} no mixer.`);
    setPlaying(true);
    playingRef.current = true;
  };

  const loadPreset = (preset: Preset) => {
    const parsed = parseYouTube(preset.url);
    if (!parsed) return;
    setSlots((current) => {
      const empty = current.findIndex((slot) => !slot.videoId && !slot.listId && !slot.audioUrl);
      if (empty === -1 && current.length < 4) {
        return [
          ...current,
          {
            ...blank(nextId(current)),
            input: preset.url,
            videoId: parsed.videoId,
            listId: parsed.listId,
          },
        ];
      }
      const index = empty === -1 ? 0 : empty;
      return current.map((slot, slotIndex) => {
        if (slotIndex !== index) return slot;
        if (slot.audioUrl) URL.revokeObjectURL(slot.audioUrl);
        return { ...slot, input: preset.url, videoId: parsed.videoId, listId: parsed.listId, audioUrl: null, audioName: null };
      });
    });
    remember(preset.url);
    setNote(`${preset.name} entrou num slot livre.`);
    setPlaying(true);
    playingRef.current = true;
  };

  const commitUrl = (id: string, raw: string) => {
    const parsed = parseYouTube(raw);
    if (!parsed) {
      setNote("Não reconheci esse link do YouTube.");
      return;
    }
    setSlots((current) =>
      current.map((slot) => {
        if (slot.id !== id) return slot;
        if (slot.audioUrl) URL.revokeObjectURL(slot.audioUrl);
        return { ...slot, input: raw.trim(), videoId: parsed.videoId, listId: parsed.listId, audioUrl: null, audioName: null };
      }),
    );
    remember(raw.trim());
    setNote("Faixa carregada.");
    setPlaying(true);
    playingRef.current = true;
  };

  const loadAudio = (id: string, file: File) => {
    if (!file.type.startsWith("audio/")) {
      setNote("O arquivo precisa ser áudio.");
      return;
    }
    const url = URL.createObjectURL(file);
    setSlots((current) =>
      current.map((slot) => {
        if (slot.id !== id) return slot;
        if (slot.audioUrl) URL.revokeObjectURL(slot.audioUrl);
        return { ...slot, audioUrl: url, audioName: file.name, videoId: null, listId: null, input: file.name };
      }),
    );
    setNote(`${file.name} no slot. O arquivo fica só nesta aba.`);
    setPlaying(true);
    playingRef.current = true;
  };

  const clearSlot = (id: string) => {
    setSlots((current) =>
      current.map((slot) => {
        if (slot.id !== id) return slot;
        if (slot.audioUrl) URL.revokeObjectURL(slot.audioUrl);
        return { ...slot, input: "", videoId: null, listId: null, audioUrl: null, audioName: null };
      }),
    );
  };

  const closeSlot = (id: string) => {
    setSlots((current) => {
      const slot = current.find((item) => item.id === id);
      if (slot?.audioUrl) URL.revokeObjectURL(slot.audioUrl);
      return current.filter((item) => item.id !== id);
    });
    setNote("Slot fechado.");
  };

  const setAll = (play: boolean) => {
    playingRef.current = play;
    setPlaying(play);
    playersRef.current.forEach((player) => {
      try {
        if (play) player.playVideo();
        else player.pauseVideo();
      } catch {
        /* ignore */
      }
    });
    audiosRef.current.forEach((audio) => {
      if (play) void audio.play().catch(() => {});
      else audio.pause();
    });
  };

  const step = (dir: "next" | "prev") => {
    playersRef.current.forEach((player) => {
      try {
        if (shuffle) player.setShuffle?.(true);
        if (dir === "next") player.nextVideo?.();
        else player.previousVideo?.();
      } catch {
        /* single videos ignore playlist transport */
      }
    });
    setNote(dir === "next" ? "Próxima da playlist." : "Anterior da playlist.");
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target;
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) return;
      if (event.key === " " || event.code === "Space") {
        event.preventDefault();
        setAll(!playingRef.current);
      } else if (event.key === "h" || event.key === "H") setHideVideos((value) => !value);
      else if (event.key === "m" || event.key === "M") {
        setMaster((value) => {
          if (value > 0) {
            beforeMute.current = value;
            return 0;
          }
          return beforeMute.current || 100;
        });
      } else if (event.key === "?" || event.key === "F1") {
        if (event.key === "F1") event.preventDefault();
        setHelp((value) => !value);
      } else if (event.key === "ArrowRight") step("next");
      else if (event.key === "ArrowLeft") step("prev");
      else if (event.key === "+" || event.key === "=") setMaster((value) => Math.min(100, value + 5));
      else if (event.key === "-" || event.key === "_") setMaster((value) => Math.max(0, value - 5));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const saveMix = () => {
    const name = mixName.trim();
    const active = slots.filter((slot) => slot.videoId || slot.listId);
    if (!name) {
      setNote("Dá um nome pro mix.");
      return;
    }
    if (!active.length) {
      setNote("Carrega pelo menos uma faixa antes de salvar.");
      return;
    }
    const mix: Mix = {
      id: `local-${Date.now()}`,
      name,
      slots: active.map((slot) => ({ url: slot.input, volume: slot.volume })),
    };
    const next = [mix, ...saved];
    setSaved(next);
    localStorage.setItem(SAVES_KEY, JSON.stringify(next));
    setMixName("");
    setNote("Mix salvo neste aparelho.");
  };

  const copyMix = async () => {
    const payload = JSON.stringify({
      prisma: "mix",
      slots: slots
        .filter((slot) => slot.videoId || slot.listId)
        .map((slot) => ({ url: slot.input, volume: slot.volume })),
    });
    try {
      await navigator.clipboard.writeText(payload);
      setNote("Mix copiado.");
    } catch {
      setNote(payload);
    }
  };

  const pasteMix = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const parsed = JSON.parse(text) as { slots?: { url: string; volume?: number }[] };
      if (!parsed.slots?.length) throw new Error("vazio");
      applyMix(parsed.slots.map((slot) => ({ url: slot.url, volume: slot.volume ?? 80 })));
    } catch {
      setNote("Nada de mix na área de transferência.");
    }
  };

  const visibleMixes = [...saved, ...STARTER].filter((mix) =>
    mix.name.toLocaleLowerCase("pt-BR").includes(query.trim().toLocaleLowerCase("pt-BR")),
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
        <p>Vários vídeos ao mesmo tempo. Cada slot tem o próprio volume.</p>
        <button type="button" className="min-h-11 px-2 uppercase tracking-widest hover:text-fg" onClick={() => setHelp((value) => !value)}>
          Atalhos
        </button>
      </div>
      {help ? (
        <ul className="grid gap-1 rounded-panel border border-line bg-bg/60 p-3 text-xs text-muted sm:grid-cols-2">
          <li>Espaço — toca ou pausa tudo</li>
          <li>M — mudo</li>
          <li>H — esconde os vídeos</li>
          <li>← → — faixa da playlist</li>
          <li>+ − — volume mestre</li>
          <li>? — esta lista</li>
        </ul>
      ) : null}
      <div className={panels ? "flex flex-col gap-4 lg:flex-row" : ""}>
        {panels ? (
          <aside className="flex max-h-96 flex-col gap-4 overflow-y-auto rounded-panel border border-line bg-bg/40 p-3 lg:max-h-screen lg:w-64 lg:shrink-0">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-xs uppercase tracking-widest text-muted">Mixes</h3>
                <span className="text-xs tabular-nums text-muted">{visibleMixes.length}</span>
              </div>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar mix"
                className="mb-2 min-h-11 w-full rounded-panel border border-line bg-bg px-3 text-sm text-fg"
              />
              {visibleMixes.length ? (
              <ul className="flex flex-col">
                {visibleMixes.map((mix) => (
                  <li key={mix.id} className="flex items-center gap-1 border-b border-line last:border-b-0">
                    <button
                      type="button"
                      onClick={() => applyMix(mix.slots)}
                      className="min-h-11 flex-1 truncate px-1 text-left text-sm hover:text-accent"
                    >
                      {mix.name}
                    </button>
                    {mix.builtIn ? null : (
                      <button
                        type="button"
                        aria-label={`Apagar ${mix.name}`}
                        className="inline-flex size-11 items-center justify-center text-muted hover:text-fg"
                        onClick={() => {
                          const next = saved.filter((item) => item.id !== mix.id);
                          setSaved(next);
                          localStorage.setItem(SAVES_KEY, JSON.stringify(next));
                        }}
                      >
                        <Trash2 className="size-4" />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
              ) : (
                <p className="text-sm text-muted">Nenhum mix com esse nome.</p>
              )}
              <div className="mt-3 flex gap-2">
                <input
                  value={mixName}
                  onChange={(event) => setMixName(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") saveMix();
                  }}
                  placeholder="Nome do mix"
                  className="min-h-11 min-w-0 flex-1 rounded-panel border border-line bg-bg px-3 text-sm text-fg"
                />
                <button type="button" onClick={saveMix} className="inline-flex size-11 items-center justify-center rounded-panel bg-accent text-accent-ink" aria-label="Salvar mix">
                  <Save className="size-4" />
                </button>
              </div>
            </div>
            <PresetGroup title="Texturas" items={TEXTURES} onPick={loadPreset} />
            <PresetGroup title="Loops" items={LOOPS} onPick={loadPreset} />
            <PresetGroup title="Cenas" items={SCENES} onPick={loadPreset} />
            <button
              type="button"
              onClick={() => {
                const pool = [...TEXTURES];
                const picked: Preset[] = [];
                for (let index = 0; index < 3 && pool.length; index += 1) {
                  const choice = pool.splice(Math.floor(Math.random() * pool.length), 1)[0];
                  if (choice) picked.push(choice);
                }
                applyMix(picked.map((item) => ({ url: item.url, volume: 70 })));
              }}
              className="min-h-11 rounded-panel border border-line text-xs uppercase tracking-widest text-muted hover:text-fg"
            >
              Aleatório
            </button>
          </aside>
        ) : null}
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div className="grid gap-3 md:grid-cols-2">
            {slots.map((slot, index) => (
              <article
                key={slot.id}
                className="flex flex-col gap-2 rounded-panel border border-line bg-bg/50 p-3"
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault();
                  const file = event.dataTransfer.files?.[0];
                  if (file) loadAudio(slot.id, file);
                  else {
                    const text = event.dataTransfer.getData("text/plain");
                    if (text) commitUrl(slot.id, text);
                  }
                }}
              >
                <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted">
                  <span>Slot {index + 1}</span>
                  <span className="flex items-center">
                    <button type="button" onClick={() => clearSlot(slot.id)} className="min-h-11 px-2 hover:text-fg">
                      Limpar
                    </button>
                    <button type="button" aria-label={`Fechar slot ${index + 1}`} onClick={() => closeSlot(slot.id)} className="inline-flex size-11 items-center justify-center hover:text-fg">
                      <X className="size-4" />
                    </button>
                  </span>
                </div>
                <form
                  className="flex gap-2"
                  onSubmit={(event) => {
                    event.preventDefault();
                    commitUrl(slot.id, slot.input);
                  }}
                >
                  <input
                    value={slot.input}
                    onChange={(event) =>
                      setSlots((current) => current.map((item) => (item.id === slot.id ? { ...item, input: event.target.value } : item)))
                    }
                    onFocus={() => setFocusId(slot.id)}
                    onBlur={() => setFocusId((current) => (current === slot.id ? null : current))}
                    placeholder="Link do YouTube ou playlist"
                    className="min-h-11 min-w-0 flex-1 rounded-panel border border-line bg-bg px-3 text-sm text-fg"
                  />
                  <label className="inline-flex size-11 cursor-pointer items-center justify-center rounded-panel border border-line text-xs text-muted hover:text-fg">
                    mp3
                    <input
                      type="file"
                      accept="audio/*"
                      className="sr-only"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) loadAudio(slot.id, file);
                        event.target.value = "";
                      }}
                    />
                  </label>
                </form>
                {focusId === slot.id && recent.length ? (
                  <div className="flex flex-wrap gap-1">
                    {recent.map((url) => (
                      <button
                        key={url}
                        type="button"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => commitUrl(slot.id, url)}
                        className="max-w-full truncate rounded-panel border border-line px-2 py-2 text-xs text-muted hover:text-fg"
                      >
                        {url.replace("https://www.youtube.com/watch?v=", "").replace("https://", "")}
                      </button>
                    ))}
                  </div>
                ) : null}
                <div className={hideVideos ? "h-0 overflow-hidden" : "aspect-video overflow-hidden rounded-panel border border-line bg-bg"}>
                  {slot.videoId || slot.listId ? (
                    <YtPlayer slotId={slot.id} videoId={slot.videoId} listId={slot.listId} register={register} level={levelFor} />
                  ) : (
                    <div className="flex h-full min-h-24 items-center justify-center px-4 text-center text-xs text-muted">
                      {slot.audioName ? slot.audioName : "Solta um link, um preset ou um áudio."}
                    </div>
                  )}
                </div>
                {slot.audioUrl ? (
                  <AudioEngine
                    id={slot.id}
                    url={slot.audioUrl}
                    register={registerAudio}
                  />
                ) : null}
                <label className="flex items-center gap-3 text-xs text-muted">
                  <Volume2 className="size-4 shrink-0" />
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={slot.volume}
                    onChange={(event) => {
                      const volume = Number(event.target.value);
                      setSlots((current) => current.map((item) => (item.id === slot.id ? { ...item, volume } : item)));
                    }}
                  />
                  <span className="w-8 tabular-nums text-fg">{slot.volume}</span>
                </label>
              </article>
            ))}
          </div>
          <button
            type="button"
            disabled={slots.length >= 4}
            onClick={() =>
              setSlots((current) => (current.length >= 4 ? current : [...current, blank(nextId(current))]))
            }
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-panel border border-dashed border-line text-xs uppercase tracking-widest text-muted hover:text-fg disabled:opacity-40"
          >
            <Plus className="size-4" />
            {slots.length >= 4 ? "Quatro slots no máximo" : "Adicionar slot"}
          </button>
        </div>
      </div>
      <div className="sticky bottom-3 z-30 flex flex-wrap items-center gap-2 rounded-panel border border-line bg-bg/90 p-2 backdrop-blur-md">
        <button type="button" aria-label={playing ? "Pausar tudo" : "Tocar tudo"} onClick={() => setAll(!playing)} className="inline-flex size-11 items-center justify-center rounded-panel bg-accent text-accent-ink">
          {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
        </button>
        <button type="button" aria-label="Faixa anterior" onClick={() => step("prev")} className="inline-flex size-11 items-center justify-center rounded-panel border border-line text-fg">
          <SkipBack className="size-4" />
        </button>
        <button type="button" aria-label="Próxima faixa" onClick={() => step("next")} className="inline-flex size-11 items-center justify-center rounded-panel border border-line text-fg">
          <SkipForward className="size-4" />
        </button>
        <button
          type="button"
          aria-pressed={shuffle}
          aria-label="Embaralhar playlist"
          onClick={() => {
            setShuffle((value) => {
              const next = !value;
              playersRef.current.forEach((player) => player.setShuffle?.(next));
              return next;
            });
          }}
          className={"inline-flex size-11 items-center justify-center rounded-panel border " + (shuffle ? "border-accent text-accent" : "border-line text-muted")}
        >
          <Shuffle className="size-4" />
        </button>
        <button type="button" aria-label={hideVideos ? "Mostrar vídeos" : "Esconder vídeos"} onClick={() => setHideVideos((value) => !value)} className="inline-flex size-11 items-center justify-center rounded-panel border border-line text-fg">
          {hideVideos ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
        </button>
        <button type="button" aria-label={panels ? "Esconder painéis" : "Mostrar painéis"} onClick={() => setPanels((value) => !value)} className="inline-flex size-11 items-center justify-center rounded-panel border border-line text-fg">
          <PanelLeft className="size-4" />
        </button>
        <label className="flex min-w-40 flex-1 items-center gap-2 text-xs text-muted">
          {master === 0 ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
          <input type="range" min={0} max={100} value={master} onChange={(event) => setMaster(Number(event.target.value))} />
          <span className="w-8 tabular-nums text-fg">{master}</span>
        </label>
        <button type="button" aria-label="Copiar mix" onClick={() => void copyMix()} className="inline-flex size-11 items-center justify-center rounded-panel border border-line text-fg">
          <Copy className="size-4" />
        </button>
        <button type="button" aria-label="Colar mix" onClick={() => void pasteMix()} className="inline-flex size-11 items-center justify-center rounded-panel border border-line text-fg">
          <ClipboardPaste className="size-4" />
        </button>
      </div>
      <p className="text-xs text-muted">{note}</p>
    </div>
  );
}

function PresetGroup({ title, items, onPick }: { title: string; items: Preset[]; onPick: (preset: Preset) => void }) {
  return (
    <div>
      <h3 className="mb-2 text-xs uppercase tracking-widest text-muted">
        {title} ({items.length})
      </h3>
      <div className="flex flex-wrap gap-1">
        {items.map((item) => (
          <button
            key={item.name}
            type="button"
            onClick={() => onPick(item)}
            className="min-h-11 rounded-panel border border-line px-3 text-xs text-fg hover:border-accent hover:text-accent"
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}

function AudioEngine({
  id,
  url,
  register,
}: {
  id: string;
  url: string;
  register: (id: string, audio: HTMLAudioElement | null) => void;
}) {
  useEffect(() => {
    const audio = new Audio(url);
    audio.loop = true;
    register(id, audio);
    void audio.play().catch(() => {});
    return () => {
      audio.pause();
      register(id, null);
    };
  }, [id, url, register]);
  return null;
}
