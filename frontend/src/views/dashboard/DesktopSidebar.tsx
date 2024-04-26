import LogoWithText from 'src/components/svg/LogoWithText';
import useDashboardContext from 'src/views/dashboard/useDashboardContext';
import { UserRole } from 'src/infrasctucture/user/types';
import { cn } from 'src/lib/utils';
import DesktopNavLinks from './DesktopNavLinks';

type DesktopSidebarProps = {
  userRole: UserRole;
};

const DesktopSidebar = ({ userRole }: DesktopSidebarProps) => {
  const { showSidebar } = useDashboardContext();

  return (
    <aside className="hidden lg:block">
      <div
        className={cn(
          'h-full min-h-screen w-[56px] overflow-x-hidden border-r-2 border-r-border bg-background shadow-xl ease-in-out [transition:width_200ms_ease-in-out]',
          {
            'w-[250px]': showSidebar,
          },
        )}
      >
        <div className="sticky top-0">
          <header
            className={cn('flex h-24 items-center pl-10 transition-all duration-200', {
              'pl-2': !showSidebar,
            })}
          >
            <div className="shrink-0">
              {
                <LogoWithText
                  className={cn('w-full [transition:width_200ms_ease-in-out]', {
                    'w-[120px]': !showSidebar,
                  })}
                />
              }
            </div>
          </header>
          <DesktopNavLinks userRole={userRole} />
        </div>
      </div>
    </aside>
  );
};
export default DesktopSidebar;
