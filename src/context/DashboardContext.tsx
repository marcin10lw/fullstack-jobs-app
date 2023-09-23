import { PropsWithChildren, createContext, useEffect, useState } from "react";

import { Theme, User } from "src/types";
import { checkDefaultTheme } from "src/utils/checkDefaultTheme";
import { saveValueToLocalStorage } from "src/utils/localStorage";

type DashboardState = {
  user: User;
  showSidebar: boolean;
  theme: Theme;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  logoutUser: () => void;
};

export const DashboardContext = createContext({} as DashboardState);

const DashboardProvider = ({ children }: PropsWithChildren) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [theme, setTheme] = useState<Theme>(checkDefaultTheme());
  const user = {
    name: "John",
  };

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

  const logoutUser = async () => {
    console.log("Logout User");
  };

  const providerValue: DashboardState = {
    user,
    theme,
    showSidebar,
    toggleTheme,
    toggleSidebar,
    logoutUser,
  };

  return (
    <DashboardContext.Provider value={providerValue}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
