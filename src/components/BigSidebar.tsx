import { Wrapper } from "src/assets/wrappers/BigSidebar";
import { NavLinks, Logo } from "src/components";
import { UserRole } from "src/types";
import useDashboardContext from "src/hooks/useDashboardContext";

type BigSidebarProps = {
  userRole: UserRole;
};

const BigSidebar = ({ userRole }: BigSidebarProps) => {
  const { showSidebar } = useDashboardContext();

  return (
    <Wrapper>
      <div className={`sidebar-container ${showSidebar ? "" : "show-sidebar"}`}>
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks isBigSidebar userRole={userRole} />
        </div>
      </div>
    </Wrapper>
  );
};
export default BigSidebar;
