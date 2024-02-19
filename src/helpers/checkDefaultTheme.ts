import { Theme } from 'src/types';
import { getValueFromLocalStorage } from './localStorage';

export const checkDefaultTheme = () => {
  const userPrefersTheme: Theme = window.matchMedia(
    '(prefers-color-scheme: dark)',
  ).matches
    ? 'dark'
    : 'light';

  const localStorageTheme = getValueFromLocalStorage<Theme>('theme');

  const isDarkTheme = localStorageTheme === 'dark';
  document.body.classList.toggle('dark', isDarkTheme);

  return localStorageTheme ?? userPrefersTheme;
};
