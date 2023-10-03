import { PropsWithChildren, createContext, useEffect, useState } from "react";

import { Theme, User } from "src/types";
import { checkDefaultTheme } from "src/utils/checkDefaultTheme";
import { saveValueToLocalStorage } from "src/utils/localStorage";

type DashboardState = {
  showSidebar: boolean;
  theme: Theme;
  toggleTheme: () => void;
  toggleSidebar: () => void;
};

export const DashboardContext = createContext({} as DashboardState);

const DashboardProvider = ({ children }: PropsWithChildren) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [theme, setTheme] = useState<Theme>(checkDefaultTheme());

  const toggleTheme = () => {
    setTheme((theme) => {
      if (theme === "dark") {
        return "light";
      }

      return "dark";
    });
  };

  useEffect(() => {
    saveValueToLocalStorage("theme", theme);
    document.body.classList.toggle("dark-theme", theme === "dark");
  }, [theme]);

  const toggleSidebar = () => {
    setShowSidebar((showSidebar) => !showSidebar);
  };

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
