import { AlignJustify, ListCollapse } from 'lucide-react';
import Logo from 'src/components/Logo';
import useDashboardContext from 'src/hooks/useDashboardContext';
import { User } from 'src/infrasctucture/user/types';
import { cn } from 'src/lib/utils';
import ThemeToggle from './ThemeToggle';
import UserAvatar from 'src/components/UserAvatar';

type NavbarProps = {
  user: User;
};

const Navbar = ({ user }: NavbarProps) => {
  const { showSidebar, toggleSidebar } = useDashboardContext();
  console.log(user);
  return (
    <nav className="top-0 z-[99] flex h-24 items-center justify-center border-b-2 border-b-border bg-background shadow-sm lg:sticky">
      <div className="flex w-[90vw] items-center justify-between lg:w-[90%]">
        <button
          onClick={toggleSidebar}
          type="button"
          className="flex-shrink-0 text-3xl text-primary"
        >
          <AlignJustify className="block lg:hidden" />
          <ListCollapse
            className={cn('hidden transition-transform duration-300 lg:block', {
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
      </div>
    </nav>
  );
};
export default Navbar;
