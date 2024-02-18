import { NavLink } from 'react-router-dom';

import useDashboardContext from 'src/hooks/useDashboardContext';
import { UserRole } from 'src/types';
import { links } from 'src/helpers/links';

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
    <div className={`flex flex-col pt-8`}>
      {links.map(({ id, icon, path, text }) => {
        if (path === 'admin' && userRole !== 'admin') {
          return;
        }

        return (
          <NavLink
            to={path}
            className={({ isActive }) =>
              `${
                isActive
                  ? 'text-[--primary-500]'
                  : 'text-[--text-secondary-color]'
              } flex items-center py-4 capitalize transition-all duration-300 hover:text-[--primary-500] ${
                isBigSidebar ? 'pl-10 hover:pl-12' : ''
              }`
            }
            onClick={onNavLinkClick}
            key={id}
            end
          >
            <span className="mr-4 grid place-items-center text-2xl">
              {icon}
            </span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavLinks;
