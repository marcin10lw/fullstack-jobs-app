import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";

import useDashboardContext from "src/hooks/useDashboardContext";
import { Wrapper } from "src/assets/wrappers/ThemeToggle";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useDashboardContext();

  return (
    <Wrapper onClick={toggleTheme}>
      {theme === "dark" ? <BsFillSunFill /> : <BsFillMoonFill />}
    </Wrapper>
  );
};

export default ThemeToggle;
