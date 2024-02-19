import { NavLink } from 'react-router-dom';

import useDashboardContext from 'src/hooks/useDashboardContext';
import { UserRole } from 'src/types';
import { links } from 'src/helpers/links';
import { cn } from 'src/lib/utils';

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
              cn(`flex items-center py-4 capitalize`, {
                'pl-10': isBigSidebar,
                'border-y border-y-primary': isActive && isBigSidebar,
                group: !isActive && isBigSidebar,
                'border-b border-b-primary': !isBigSidebar && isActive,
              })
            }
            onClick={onNavLinkClick}
            key={id}
            end
          >
            <div className="flex items-center text-primary [transition:padding_150ms_ease-in-out] group-hover:pl-2">
              <span className="mr-4 grid place-items-center text-2xl">
                {icon}
              </span>
              {text}
            </div>
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavLinks;
