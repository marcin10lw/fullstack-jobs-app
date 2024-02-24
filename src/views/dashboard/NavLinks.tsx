import { NavLink } from 'react-router-dom';

import useDashboardContext from 'src/views/dashboard/useDashboardContext';
import { links } from 'src/helpers/links';
import { cn } from 'src/lib/utils';
import { UserRole } from 'src/infrasctucture/user/types';
import { ROUTES } from 'src/routes';

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
    <div
      className={cn(`flex flex-col pt-8`, {
        '-mt-[2px] pt-0': isBigSidebar,
      })}
    >
      {links.map(({ id, icon, path, text }) => {
        if (path === ROUTES.admin && userRole !== 'admin') {
          return;
        }

        return (
          <NavLink
            to={path}
            className={({ isActive }) =>
              cn(`flex items-center py-4 capitalize`, {
                'pl-10': isBigSidebar,
                'border-y-2 border-y-primary/50': isActive && isBigSidebar,
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
