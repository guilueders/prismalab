import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { findExperiment, type ExperimentId } from "@/lab/catalog";

export type ThemeName = "dark" | "light";

export type FieldParams = {
  count: number;
  link: number;
  speed: number;
  dispersion: number;
};

export const DEFAULT_FIELD: FieldParams = {
  count: 72,
  link: 120,
  speed: 0.35,
  dispersion: 10,
};

type LabContextValue = {
  theme: ThemeName;
  toggleTheme: () => void;
  section: ExperimentId | null;
  open: (id: ExperimentId | null) => void;
  field: FieldParams;
  setField: (patch: Partial<FieldParams>) => void;
  booted: boolean;
};

const LabContext = createContext<LabContextValue | null>(null);

const THEME_KEY = "prisma-theme";
const SECTION_KEY = "prisma-section";

export function LabProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>("dark");
  const [section, setSection] = useState<ExperimentId | null>(null);
  const [field, setFieldState] = useState<FieldParams>(DEFAULT_FIELD);
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_KEY);
    if (storedTheme === "light" || storedTheme === "dark") setTheme(storedTheme);
    const storedSection = localStorage.getItem(SECTION_KEY);
    if (findExperiment(storedSection)) setSection(storedSection as ExperimentId);
    setBooted(true);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    if (booted) localStorage.setItem(THEME_KEY, theme);
  }, [theme, booted]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  const open = useCallback((id: ExperimentId | null) => {
    setSection(id);
    if (id) localStorage.setItem(SECTION_KEY, id);
    else localStorage.removeItem(SECTION_KEY);
  }, []);

  const setField = useCallback((patch: Partial<FieldParams>) => {
    setFieldState((current) => ({ ...current, ...patch }));
  }, []);

  const value = useMemo(
    () => ({ theme, toggleTheme, section, open, field, setField, booted }),
    [theme, toggleTheme, section, open, field, setField, booted],
  );

  return <LabContext.Provider value={value}>{children}</LabContext.Provider>;
}

export function useLab() {
  const value = useContext(LabContext);
  if (!value) throw new Error("useLab fora do LabProvider");
  return value;
}
