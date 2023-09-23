import { FaAlignLeft } from "react-icons/fa";

import { Wrapper } from "src/assets/wrappers/Navbar";
import useDashboardContext from "src/hooks/useDashboardContext";
import Logo from "./Logo";

const Navbar = () => {
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
        <div className="btn-container">toggle/logout</div>
      </div>
    </Wrapper>
  );
};
export default Navbar;
