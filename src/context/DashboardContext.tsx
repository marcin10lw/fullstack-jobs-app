import { PropsWithChildren, createContext, useState } from "react";

import { User } from "src/types/user";

type Theme = "light" | "dark";

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
  const [theme, setTheme] = useState<Theme>("light");
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
