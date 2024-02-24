import { Navigate, Outlet, useOutletContext } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import DashboardProvider from 'src/views/dashboard/DashboardContext';
import { ROUTES } from 'src/routes';
import { userAPI } from 'src/infrasctucture/user/userApiAdapter';
import { User } from 'src/infrasctucture/user/types';
import { CURRENT_USER_QUERY_KEY } from 'src/infrasctucture/user/constants';
import SmallSidebar from './SmallSidebar';
import BigSidebar from './BigSidebar';
import Navbar from './Navbar';
import MaxWidthWrapper from 'src/components/MaxWidthWrapper';

type ContextType = { user: User };

const DashboardLayout = () => {
  const {
    data: userResponse,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: [CURRENT_USER_QUERY_KEY],
    queryFn: userAPI.getCurrentUser,
    retry: false,
    cacheTime: 0,
  });

  return (
    <>
      {isError && <Navigate to={ROUTES.login} />}
      {isSuccess && (
        <DashboardProvider>
          <section>
            <main className="grid grid-cols-1 lg:grid-cols-[auto_1fr]">
              <SmallSidebar userRole={userResponse.user.role} />
              <BigSidebar userRole={userResponse.user.role} />
              <div>
                <Navbar user={userResponse.user} />

                <MaxWidthWrapper className="scrollbar-w-4 scrollbar-track-gray-lighter scrollbar-thumb-gray h-[calc(100vh-96px)] overflow-y-auto px-8 py-8">
                  <Outlet
                    context={{ user: userResponse.user } satisfies ContextType}
                  />
                </MaxWidthWrapper>
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
