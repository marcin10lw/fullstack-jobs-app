import { PropsWithChildren, createContext, useEffect, useState } from 'react';

import { Theme } from 'src/types';
import { checkDefaultTheme } from 'src/lib/helpers/checkDefaultTheme';
import {
  getValueFromLocalStorage,
  saveValueToLocalStorage,
} from 'src/lib/helpers/localStorage';
import {
  LOCAL_STORAGE_SIDEBAR_VISIBLE_KEY,
  LOCAL_STORAGE_THEME_KEY,
} from 'src/common/constants';

const getLocalStorageSidebarVisible = () => {
  const localStorageTheme = getValueFromLocalStorage<boolean>(
    LOCAL_STORAGE_SIDEBAR_VISIBLE_KEY,
  );

  return localStorageTheme ?? true;
};

type DashboardState = {
  showSidebar: boolean;
  theme: Theme;
  toggleTheme: () => void;
  toggleSidebar: () => void;
};

export const DashboardContext = createContext({} as DashboardState);

const DashboardProvider = ({ children }: PropsWithChildren) => {
  const [showSidebar, setShowSidebar] = useState<boolean>(
    getLocalStorageSidebarVisible(),
  );
  const [theme, setTheme] = useState<Theme>(checkDefaultTheme());

  const toggleTheme = () => {
    setTheme((theme) => {
      if (theme === 'dark') {
        return 'light';
      }

      return 'dark';
    });
  };

  useEffect(() => {
    saveValueToLocalStorage(LOCAL_STORAGE_THEME_KEY, theme);
    document.body.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleSidebar = () => {
    setShowSidebar((showSidebar) => !showSidebar);
  };

  useEffect(() => {
    saveValueToLocalStorage(LOCAL_STORAGE_SIDEBAR_VISIBLE_KEY, showSidebar);
  }, [showSidebar]);

  const providerValue: DashboardState = {
    theme,
    showSidebar,
    toggleTheme,
    toggleSidebar,
  };

  return (
    <DashboardContext.Provider value={providerValue}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
