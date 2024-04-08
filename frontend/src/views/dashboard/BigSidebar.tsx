import LogoWithText from 'src/components/LogoWithText';
import useDashboardContext from 'src/views/dashboard/useDashboardContext';
import { UserRole } from 'src/infrasctucture/user/types';
import { cn } from 'src/lib/utils';
import NavLinks from './NavLinks';

type DesktopSidebarProps = {
  userRole: UserRole;
};

const DesktopSidebar = ({ userRole }: DesktopSidebarProps) => {
  const { showSidebar } = useDashboardContext();

  return (
    <aside className="hidden lg:block">
      <div
        className={cn(
          'h-full min-h-screen w-[50px] border-r-2 border-r-border bg-background shadow-xl ease-in-out [transition:width_300ms_ease-in-out]',
          {
            'w-[250px]': showSidebar,
          },
        )}
      >
        <div className="sticky top-0">
          <header className="flex h-24 items-center pl-10">
            <LogoWithText />
          </header>
          <NavLinks isBigSidebar userRole={userRole} />
        </div>
      </div>
    </aside>
  );
};
export default DesktopSidebar;
