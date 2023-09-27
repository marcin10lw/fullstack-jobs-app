import { FaAlignLeft } from "react-icons/fa";

import { User } from "src/types";
import { Wrapper } from "src/assets/wrappers/Navbar";
import useDashboardContext from "src/hooks/useDashboardContext";
import { Logo, LogoutContainer, ThemeToggle } from "src/components";

type NavbarProps = {
  user: User;
};

const Navbar = ({ user }: NavbarProps) => {
  const { toggleSidebar } = useDashboardContext();

  return (
    <Wrapper>
      <div className="nav-center">
        <button onClick={toggleSidebar} type="button" className="toggle-btn">
          <FaAlignLeft />
        </button>
        <div className="logo">
          <Logo />
          <h4 className="logo-text">dashboard</h4>
        </div>
        <div className="btn-container">
          <ThemeToggle />
          <LogoutContainer user={user} />
        </div>
      </div>
    </Wrapper>
  );
};
export default Navbar;
