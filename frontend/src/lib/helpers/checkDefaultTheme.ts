import { ThemeColor, ThemeMode } from 'src/types';
import { getValueFromLocalStorage } from './localStorage';
import { LOCAL_STORAGE_THEME_COLOR_KEY, LOCAL_STORAGE_THEME_MODE_KEY } from 'src/common/constants';

export const checkDefaultThemeMode = (): ThemeMode => {
  const userPrefersTheme: ThemeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  const localStorageThemeMode = getValueFromLocalStorage<ThemeMode>(LOCAL_STORAGE_THEME_MODE_KEY);

  return localStorageThemeMode ?? userPrefersTheme;
};

export const checkDefaultThemeColor = (): ThemeColor => {
  const localStorageThemeColor = getValueFromLocalStorage<ThemeColor>(LOCAL_STORAGE_THEME_COLOR_KEY);

  return localStorageThemeColor ?? 'violet';
};
