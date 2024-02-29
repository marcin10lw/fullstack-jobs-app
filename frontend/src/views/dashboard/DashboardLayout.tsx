import { Navigate, Outlet, useOutletContext } from 'react-router-dom';

import MaxWidthWrapper from 'src/components/MaxWidthWrapper';
import { ScrollArea } from 'src/components/ui/scroll-area';
import { User } from 'src/infrasctucture/user/types';
import { userRepository } from 'src/infrasctucture/user/userRepository';
import { ROUTES } from 'src/routes';
import DashboardProvider from 'src/views/dashboard/DashboardContext';
import DesktopSidebar from './BigSidebar';
import Navbar from './Navbar';

type ContextType = { user: User };

const DashboardLayout = () => {
  const {
    data: userResponse,
    isError,
    isSuccess,
  } = userRepository.useGetCurrentUser();

  return (
    <>
      {isError && <Navigate to={ROUTES.login} />}
      {isSuccess && (
        <DashboardProvider>
          <section>
            <main className="grid grid-cols-1 lg:grid-cols-[auto_1fr]">
              <DesktopSidebar userRole={userResponse.user.role} />
              <div>
                <Navbar user={userResponse.user} />

                <ScrollArea className="h-[calc(100vh-96px)]">
                  <MaxWidthWrapper className="h-full px-4 py-8 md:px-8">
                    <Outlet
                      context={
                        { user: userResponse.user } satisfies ContextType
                      }
                    />
                  </MaxWidthWrapper>
                </ScrollArea>
              </div>
            </main>
          </section>
        </DashboardProvider>
      )}
    </>
  );
};

export default DashboardLayout;

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  return useOutletContext<ContextType>();
};