import { Moon, Sun } from 'lucide-react';

import useDashboardContext from 'src/views/dashboard/useDashboardContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useDashboardContext();

  return (
    <button
      onClick={toggleTheme}
      className="mr-4 grid aspect-square w-6 place-items-center text-[--text-color]"
    >
      {theme === 'dark' ? (
        <Sun className="text-foreground" />
      ) : (
        <Moon className="text-foreground" />
      )}
    </button>
  );
};

export default ThemeToggle;
