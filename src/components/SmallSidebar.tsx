import { FaTimes } from "react-icons/fa";

import useDashboardContext from "src/hooks/useDashboardContext";
import { Wrapper } from "src/assets/wrappers/SmallSidebar";
import { Logo, NavLinks } from "src/components";

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useDashboardContext();

  return (
    <Wrapper>
      <div className={`sidebar-container ${showSidebar ? "show-sidebar" : ""}`}>
        <div className="content">
          <button onClick={toggleSidebar} type="button" className="close-btn">
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};
export default SmallSidebar;
