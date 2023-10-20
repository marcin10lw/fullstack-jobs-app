import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';

import useDashboardContext from 'src/hooks/useDashboardContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useDashboardContext();

  return (
    <button
      onClick={toggleTheme}
      className="mr-4 grid aspect-square w-6 place-items-center text-[--text-color]"
    >
      {theme === 'dark' ? <BsFillSunFill /> : <BsFillMoonFill />}
    </button>
  );
};

export default ThemeToggle;
