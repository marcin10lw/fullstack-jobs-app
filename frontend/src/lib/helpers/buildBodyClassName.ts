import { ThemeColor, ThemeMode } from 'src/types';

export const buildBodyClassName = (themeColor: ThemeColor, themeMode: ThemeMode) =>
  `${themeColor}_${themeMode} ${themeMode}`;
