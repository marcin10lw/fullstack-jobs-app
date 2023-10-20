import { FaTimes } from 'react-icons/fa';

import useDashboardContext from 'src/hooks/useDashboardContext';
import { Wrapper } from 'src/assets/wrappers/SmallSidebar';
import { Logo, NavLinks } from 'src/components';
import { UserRole } from 'src/types';

type SmallSidebarProps = {
  userRole: UserRole;
};

const SmallSidebar = ({ userRole }: SmallSidebarProps) => {
  const { showSidebar, toggleSidebar } = useDashboardContext();

  return (
    <aside className="lg:hidden">
      <div
        className={`fixed inset-0 flex items-center justify-center bg-black/70 transition-opacity duration-300 ease-in-out ${
          showSidebar
            ? 'visible z-[99] opacity-100'
            : 'invisible z-[-1] opacity-0'
        }`}
      >
        <div className="relative flex h-[95vh] w-[--fluid-width] flex-col items-center rounded-[--border-radius] bg-[--background-secondary-color] p-[4rem_2rem]">
          <button
            onClick={toggleSidebar}
            type="button"
            className="absolute left-[10px] top-[10px] text-[2rem] text-[--red-dark]"
          >
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks userRole={userRole} />
        </div>
      </div>
    </aside>
  );
};
export default SmallSidebar;
