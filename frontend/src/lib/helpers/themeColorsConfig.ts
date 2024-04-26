import { ThemeColor } from 'src/types';

interface Color {
  light: string;
  dark: string;
}

export const themeColorsConfig: Record<ThemeColor, Color> = {
  violet: {
    light: '#7c3aed',
    dark: '#6d28d9',
  },
  slate: {
    light: '#0f172a',
    dark: '#f8fafc',
  },
  rose: {
    light: '#e11d48',
    dark: '#e11d48',
  },
  orange: {
    light: '#f97316',
    dark: '#ea580c',
  },
  green: {
    light: '#16a34a',
    dark: '#22c55e',
  },
  blue: {
    light: '#2563eb',
    dark: '#3b82f6',
  },
  yellow: {
    light: '#facc15',
    dark: '#facc15',
  },
};

export const themeColorsList: { color: Color; title: ThemeColor }[] = Object.entries(themeColorsConfig).map(
  ([key, color]) => ({
    title: key as ThemeColor,
    color,
  }),
);
