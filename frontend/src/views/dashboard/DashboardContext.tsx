import { PropsWithChildren, createContext, useEffect, useState } from 'react';

import {
  LOCAL_STORAGE_SIDEBAR_VISIBLE_KEY,
  LOCAL_STORAGE_THEME_COLOR_KEY,
  LOCAL_STORAGE_THEME_MODE_KEY,
} from 'src/common/constants';
import { buildBodyClassName } from 'src/lib/helpers/buildBodyClassName';
import { getLocalStorageSidebarVisible } from 'src/lib/helpers/checkDefaultSidebarVisibility';
import { checkDefaultThemeColor, checkDefaultThemeMode } from 'src/lib/helpers/checkDefaultTheme';
import { saveValueToLocalStorage } from 'src/lib/helpers/localStorage';
import { ThemeColor, ThemeMode } from 'src/types';

type DashboardState = {
  showSidebar: boolean;
  themeMode: ThemeMode;
  themeColor: ThemeColor;
  toggleSidebar: () => void;
  toggleTheme: () => void;
  changeThemeColor: (themeColor: ThemeColor) => void;
};

export const DashboardContext = createContext({} as DashboardState);

const DashboardProvider = ({ children }: PropsWithChildren) => {
  const [showSidebar, setShowSidebar] = useState<boolean>(getLocalStorageSidebarVisible());
  const [themeMode, setThemeMode] = useState<ThemeMode>(checkDefaultThemeMode());
  const [themeColor, setThemeColor] = useState<ThemeColor>(checkDefaultThemeColor());

  const toggleTheme = () => {
    setThemeMode((theme) => {
      if (theme === 'dark') {
        return 'light';
      }

      return 'dark';
    });
  };

  const changeThemeColor = (themeColor: ThemeColor) => setThemeColor(themeColor);

  useEffect(() => {
    const bodyClassName = buildBodyClassName(themeColor, themeMode);
    document.body.classList.value = bodyClassName;

    saveValueToLocalStorage(LOCAL_STORAGE_THEME_MODE_KEY, themeMode);
    saveValueToLocalStorage(LOCAL_STORAGE_THEME_COLOR_KEY, themeColor);
  }, [themeMode, themeColor]);

  const toggleSidebar = () => {
    setShowSidebar((showSidebar) => !showSidebar);
  };

  useEffect(() => {
    saveValueToLocalStorage(LOCAL_STORAGE_SIDEBAR_VISIBLE_KEY, showSidebar);
  }, [showSidebar]);

  const providerValue: DashboardState = {
    showSidebar,
    themeMode,
    themeColor,
    toggleTheme,
    changeThemeColor,
    toggleSidebar,
  };

  return <DashboardContext.Provider value={providerValue}>{children}</DashboardContext.Provider>;
};

export default DashboardProvider;
