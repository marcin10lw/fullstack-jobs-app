import { NavLink } from "react-router-dom";

import useDashboardContext from "src/hooks/useDashboardContext";
import { links } from "src/utils/links";

const NavLinks = () => {
  const { toggleSidebar } = useDashboardContext();

  return (
    <div className="nav-links">
      {links.map(({ id, icon, path, text }) => (
        <NavLink
          to={path}
          className="nav-link"
          onClick={toggleSidebar}
          key={id}
          end
        >
          <span className="icon">{icon}</span>
          {text}
        </NavLink>
      ))}
    </div>
  );
};
export default NavLinks;
