import { PropsWithChildren, createContext, useState } from "react";

import { User } from "src/types/user";

type DashboardState = {
  user: User;
  showSidebar: boolean;
  isDarkTheme: boolean;
  toggleDarkTheme: () => void;
  toggleSidebar: () => void;
  logoutUser: () => void;
};

export const DashboardContext = createContext({} as DashboardState);

const DashboardProvider = ({ children }: PropsWithChildren) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const user = {
    name: "John",
  };

  const toggleDarkTheme = () => {
    setIsDarkTheme((isDarkTheme) => !isDarkTheme);
  };

  const toggleSidebar = () => {
    setShowSidebar((showSidebar) => !showSidebar);
  };

  const logoutUser = async () => {
    console.log("Logout User");
  };

  const providerValue: DashboardState = {
    user,
    isDarkTheme,
    showSidebar,
    toggleDarkTheme,
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
