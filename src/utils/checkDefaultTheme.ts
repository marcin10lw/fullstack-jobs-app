import { Theme } from "src/types";
import { getValueFromLocalStorage } from "./localStorage";

export const checkDefaultTheme = () => {
  const localStorageTheme = getValueFromLocalStorage<Theme>("theme");
  const isDarkTheme = localStorageTheme === "dark";
  document.body.classList.toggle("dark-theme", isDarkTheme);

  return localStorageTheme ?? "light";
};
