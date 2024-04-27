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
    light: '#b04b62',
    dark: '#b04b62',
  },
  orange: {
    light: '#ca6f40',
    dark: '#d06731',
  },
  green: {
    light: '#3e9e62',
    dark: '#49b872',
  },
  blue: {
    light: '#4e7ece',
    dark: '#5588dc',
  },
  yellow: {
    light: '#dec14e',
    dark: '#c8ae46',
  },
};

export const themeColorsList: { color: Color; title: ThemeColor }[] = Object.entries(themeColorsConfig).map(
  ([key, color]) => ({
    title: key as ThemeColor,
    color,
  }),
);
