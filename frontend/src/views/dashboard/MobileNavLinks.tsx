import { NavLink } from 'react-router-dom';

import { UserRole } from 'src/api/user/types';
import { links } from 'src/lib/helpers/links';
import { cn } from 'src/lib/utils';
import { ROUTES } from 'src/routes';

interface MobileNavLinksProps {
  userRole: UserRole;
  onClick?: () => void;
}

const MobileNavLinks = ({ userRole, onClick }: MobileNavLinksProps) => {
  return (
    <div className="mt-8 flex flex-col gap-6">
      {links.map(({ id, icon, path, text }) => {
        if (path === ROUTES.admin && userRole !== 'admin') {
          return;
        }

        return (
          <NavLink
            to={path}
            onClick={onClick}
            key={id}
            className={({ isActive }) =>
              cn(
                'relative before:absolute before:top-[calc(100%+4px)] before:hidden before:h-[2px] before:w-full before:bg-primary/70',
                {
                  'before:block': isActive,
                },
              )
            }
          >
            <div className="flex items-center gap-3 text-xl capitalize">
              <span className="shrink-0">{icon}</span>
              <span className="truncate">{text}</span>
            </div>
          </NavLink>
        );
      })}
    </div>
  );
};

export default MobileNavLinks;
