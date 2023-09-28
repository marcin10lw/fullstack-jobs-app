import { NavLink } from "react-router-dom";

import useDashboardContext from "src/hooks/useDashboardContext";
import { UserRole } from "src/types";
import { links } from "src/utils/links";

type NavLinksProps = {
  isBigSidebar?: boolean;
  userRole: UserRole;
};

const NavLinks = ({ isBigSidebar, userRole }: NavLinksProps) => {
  const { toggleSidebar } = useDashboardContext();

  const onNavLinkClick = () => {
    if (!isBigSidebar) {
      toggleSidebar();
    }
  };

  return (
    <div className="nav-links">
      {links.map(({ id, icon, path, text }) => {
        if (path === "admin" && userRole !== "admin") {
          return;
        }

        return (
          <NavLink
            to={path}
            className="nav-link"
            onClick={onNavLinkClick}
            key={id}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavLinks;
