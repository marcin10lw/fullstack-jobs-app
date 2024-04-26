import { Moon, Sun } from 'lucide-react';

import useDashboardContext from 'src/views/dashboard/useDashboardContext';

const ThemeModeToggle = () => {
  const { themeMode, toggleThemeMode } = useDashboardContext();

  return (
    <button onClick={toggleThemeMode} className="mr-4 grid aspect-square w-6 place-items-center">
      {themeMode === 'dark' ? <Sun className="text-foreground" /> : <Moon className="text-foreground" />}
    </button>
  );
};

export default ThemeModeToggle;
