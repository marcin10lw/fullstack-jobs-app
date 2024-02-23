import Logo from 'src/components/Logo';
import useDashboardContext from 'src/views/dashboard/useDashboardContext';
import { UserRole } from 'src/infrasctucture/user/types';
import { cn } from 'src/lib/utils';
import NavLinks from './NavLinks';

type BigSidebarProps = {
  userRole: UserRole;
};

const BigSidebar = ({ userRole }: BigSidebarProps) => {
  const { showSidebar } = useDashboardContext();

  return (
    <aside className="hidden lg:block">
      <div
        className={cn(
          '-ml-[250px] h-full min-h-screen w-[250px] border-r-2 border-r-border bg-background shadow-xl ease-in-out [transition:margin_300ms_ease-in-out]',
          {
            'ml-0': showSidebar,
          },
        )}
      >
        <div className="sticky top-0">
          <header className="flex h-24 items-center pl-10">
            <Logo />
          </header>
          <NavLinks isBigSidebar userRole={userRole} />
        </div>
      </div>
    </aside>
  );
};
export default BigSidebar;
