import { NavLink } from 'react-router-dom';

import { UserRole } from 'src/infrasctucture/user/types';
import { links } from 'src/lib/helpers/links';
import { cn } from 'src/lib/utils';
import { ROUTES } from 'src/routes';

type NavLinksProps = {
  userRole: UserRole;
  onClick?: () => void;
  isBigSidebar?: boolean;
};

const NavLinks = ({ isBigSidebar, userRole, onClick }: NavLinksProps) => {
  const onNavLinkClick = () => {
    onClick && onClick();
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
