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
              cn('flex h-14 items-center pl-10 transition-all duration-200', {
                'border-y-2 border-y-primary/50': isActive,
                'pl-4': !showSidebar,
                group: !isActive,
              })
            }
            onClick={onNavLinkClick}
            key={id}
          >
            <div
              className={cn(
                'flex gap-3 text-lg capitalize text-primary [transition:padding_300ms_ease-in-out]',
                {
                  'group-hover:pl-2': showSidebar,
                  'group-hover:pb-1': !showSidebar,
                },
              )}
            >
              <span className="shrink-0">{icon}</span>
              <span
                className={cn('truncate transition-all duration-150', {
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
