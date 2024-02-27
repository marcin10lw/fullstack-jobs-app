import { AlignJustify, X } from 'lucide-react';
import Logo from 'src/components/Logo';

import { useState } from 'react';
import { UserRole } from 'src/infrasctucture/user/types';
import { cn } from 'src/lib/utils';
import NavLinks from './NavLinks';

type MobileSidebarProps = {
  userRole: UserRole;
};

const MobileSidebar = ({ userRole }: MobileSidebarProps) => {
  const [smallSidebarOpen, setSmallSidebarOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="flex-shrink-0 text-3xl text-primary"
        onClick={() => setSmallSidebarOpen(true)}
      >
        <AlignJustify className="block lg:hidden" />
      </button>

      <aside className="lg:hidden">
        <div
          className={cn(
            `fixed inset-0 flex items-center justify-center bg-black/50 transition-opacity duration-300 ease-in-out`,
            {
              'visible z-[99] opacity-100': smallSidebarOpen,
              'invisible z-[-1] opacity-0': !smallSidebarOpen,
            },
          )}
        >
          <div className="relative flex h-[95vh] w-[90%] flex-col items-center rounded-md bg-secondary p-[4rem_2rem]">
            <button
              onClick={() => setSmallSidebarOpen(false)}
              type="button"
              className="absolute left-[10px] top-[10px] text-[2rem] text-destructive"
            >
              <X className="h-8 w-8" />
            </button>
            <header>
              <Logo />
            </header>
            <NavLinks userRole={userRole} />
          </div>
        </div>
      </aside>
    </>
  );
};
export default MobileSidebar;
