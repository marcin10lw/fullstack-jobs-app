import { NavLink } from 'react-router-dom';

import { UserRole } from 'src/infrasctucture/user/types';
import { links } from 'src/lib/helpers/links';
import { cn } from 'src/lib/utils';
import { ROUTES } from 'src/routes';
import useDashboardContext from './useDashboardContext';

type NavLinksProps = {
  userRole: UserRole;
  onClick?: () => void;
};

const NavLinks = ({ userRole, onClick }: NavLinksProps) => {
  const { showSidebar } = useDashboardContext();

  const onNavLinkClick = () => {
    onClick && onClick();
  };

  return (
    <div className={cn(`-mt-[2px] flex flex-col pt-0`)}>
      {links.map(({ id, icon, path, text }) => {
        if (path === ROUTES.admin && userRole !== 'admin') {
          return;
        }

        return (
          <NavLink
            to={path}
            className={({ isActive }) =>
              cn('flex h-14 items-center pl-10 text-primary [transition:padding_200ms]', {
                'border-y-2 border-y-border bg-primary/70 text-primary-foreground': isActive,
                'pl-[15px]': !showSidebar,
                'hover:bg-primary/40 hover:text-primary-foreground': !isActive,
              })
            }
            onClick={onNavLinkClick}
            key={id}
          >
            <div className="flex gap-3 capitalize">
              <span className="shrink-0">{icon}</span>
              <span
                className={cn('truncate text-lg [transition:opacity_200ms_ease-in-out,visibility_200ms_ease-in-out]', {
                  'visible opacity-100': showSidebar,
                  'invisible opacity-0': !showSidebar,
                })}
              >
                {text}
              </span>
            </div>
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavLinks;
