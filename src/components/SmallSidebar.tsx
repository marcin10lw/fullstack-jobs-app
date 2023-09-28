import { FaTimes } from "react-icons/fa";

import useDashboardContext from "src/hooks/useDashboardContext";
import { Wrapper } from "src/assets/wrappers/SmallSidebar";
import { Logo, NavLinks } from "src/components";
import { UserRole } from "src/types";

type SmallSidebarProps = {
  userRole: UserRole;
};

const SmallSidebar = ({ userRole }: SmallSidebarProps) => {
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
          <NavLinks userRole={userRole} />
        </div>
      </div>
    </Wrapper>
  );
};
export default SmallSidebar;
