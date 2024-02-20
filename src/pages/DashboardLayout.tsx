import { Navigate, Outlet, useOutletContext } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import DashboardProvider from 'src/context/DashboardContext';
import { BigSidebar, Navbar, SmallSidebar } from 'src/components';
import { ROUTES } from 'src/routes';
import { userAPI } from 'src/infrasctucture/user/userApiAdapter';
import { User } from 'src/infrasctucture/user/types';
import { CURRENT_USER_QUERY_KEY } from 'src/infrasctucture/user/constants';

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
              <SmallSidebar userRole={userResponse.data.role} />
              <BigSidebar userRole={userResponse.data.role} />
              <div>
                <Navbar user={userResponse.data} />

                <div className="mx-auto w-[90vw] py-8 lg:w-[90%]">
                  <Outlet
                    context={{ user: userResponse.data } satisfies ContextType}
                  />
                </div>
              </div>
            </main>
          </section>
        </DashboardProvider>
      )}
    </>
  );
};

export default DashboardLayout;

export const useUser = () => {
  return useOutletContext<ContextType>();
};
