import { NavLinks, Logo } from 'src/components';
import { UserRole } from 'src/types';
import useDashboardContext from 'src/hooks/useDashboardContext';

type BigSidebarProps = {
  userRole: UserRole;
};

const BigSidebar = ({ userRole }: BigSidebarProps) => {
  const { showSidebar } = useDashboardContext();

  return (
    <aside className="hidden shadow-[1px_0px_0px_0px_rgba(0,_0,_0,_0.1)] lg:block">
      <div
        className={`-ml-[250px] h-full min-h-screen w-[250px] bg-[--background-secondary-color] transition-all duration-300 ease-in-out ${
          showSidebar ? '' : 'ml-0'
        }`}
      >
        <div className="fixed top-0">
          <header className="flex h-[--nav-height] items-center pl-10">
            <Logo />
          </header>
          <NavLinks isBigSidebar userRole={userRole} />
        </div>
      </div>
    </aside>
  );
};
export default BigSidebar;
