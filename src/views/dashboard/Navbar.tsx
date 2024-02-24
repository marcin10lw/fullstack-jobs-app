import { ListCollapse } from 'lucide-react';

import Logo from 'src/components/Logo';
import MaxWidthWrapper from 'src/components/MaxWidthWrapper';
import UserAvatar from 'src/components/UserAvatar';
import { User } from 'src/infrasctucture/user/types';
import { cn } from 'src/lib/utils';
import useDashboardContext from 'src/views/dashboard/useDashboardContext';
import ThemeToggle from './ThemeToggle';
import MobileSidebar from './SmallSidebar';

type NavbarProps = {
  user: User;
};

const Navbar = ({ user }: NavbarProps) => {
  const { showSidebar, toggleSidebar } = useDashboardContext();

  return (
    <nav className="top-0 flex h-24 items-center justify-center border-b-2 border-b-border bg-background shadow-sm lg:sticky">
      <MaxWidthWrapper className="flex items-center justify-between px-4 md:px-8">
        <div className="lg:hidden">
          <MobileSidebar userRole={user.role} />
        </div>
        <button
          onClick={toggleSidebar}
          type="button"
          className="hidden flex-shrink-0 text-3xl text-primary lg:block"
        >
          <ListCollapse
            className={cn('transition-transform duration-300', {
              'rotate-180': showSidebar,
            })}
          />
        </button>
        <div className="flex w-[100px] items-center">
          <div className="hidden sm:block lg:hidden">
            <Logo />
          </div>
          <h4 className="hidden text-2xl lg:block">dashboard</h4>
        </div>
        <div className="flex items-center">
          <ThemeToggle />
          <UserAvatar user={user} />
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};
export default Navbar;
