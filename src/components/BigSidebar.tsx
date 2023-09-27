import { Wrapper } from "src/assets/wrappers/BigSidebar";
import { NavLinks, Logo } from "src/components";
import useDashboardContext from "src/hooks/useDashboardContext";

const BigSidebar = () => {
  const { showSidebar } = useDashboardContext();

  return (
    <Wrapper>
      <div className={`sidebar-container ${showSidebar ? "" : "show-sidebar"}`}>
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks isBigSidebar />
        </div>
      </div>
    </Wrapper>
  );
};
export default BigSidebar;
