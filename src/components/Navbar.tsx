import { FaAlignLeft } from 'react-icons/fa';

import { User } from 'src/types';
import useDashboardContext from 'src/hooks/useDashboardContext';
import { Logo, LogoutContainer, ThemeToggle } from 'src/components';

type NavbarProps = {
  user: User;
};

const Navbar = ({ user }: NavbarProps) => {
  const { toggleSidebar } = useDashboardContext();

  return (
    <nav className="top-0 z-[99] flex h-[--nav-height] items-center justify-center bg-[--background-secondary-color] shadow-[0_1px_0_0_rgba(0,_0,_0,_0.1)] lg:sticky">
      <div className="flex w-[90vw] items-center justify-between lg:w-[90%]">
        <button
          onClick={toggleSidebar}
          type="button"
          className="flex-shrink-0 text-3xl text-[--primary-500]"
        >
          <FaAlignLeft />
        </button>
        <div className="flex w-[100px] items-center">
          <div className="hidden sm:block lg:hidden">
            <Logo />
          </div>
          <h4 className="hidden lg:block">dashboard</h4>
        </div>
        <div className="flex items-center">
          <ThemeToggle />
          <LogoutContainer user={user} />
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
