import { Theme } from 'src/types';
import { getValueFromLocalStorage } from './localStorage';
import { LOCAL_STORAGE_THEME_KEY } from 'src/common/constants';

export const checkDefaultTheme = () => {
  const userPrefersTheme: Theme = window.matchMedia(
    '(prefers-color-scheme: dark)',
  ).matches
    ? 'dark'
    : 'light';

  const localStorageTheme = getValueFromLocalStorage<Theme>(
    LOCAL_STORAGE_THEME_KEY,
  );

  return localStorageTheme ?? userPrefersTheme;
};
