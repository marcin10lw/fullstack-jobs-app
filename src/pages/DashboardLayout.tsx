import { Navigate, Outlet, useOutletContext } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { User } from 'src/types';
import customFetch from 'src/utils/customFetch';
import DashboardProvider from 'src/context/DashboardContext';
import { BigSidebar, Navbar, SmallSidebar } from 'src/components';

type ContextType = { user: User };

const DashboardLayout = () => {
  const {
    data: user,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ['user'],
    queryFn: async (): Promise<User> => {
      const { data } = await customFetch.get('/users/current-user');

      return data.user;
    },
    retry: false,
    cacheTime: 0,
  });

  return (
    <>
      {isError && <Navigate to="/login" />}
      {isSuccess && (
        <DashboardProvider>
          <section>
            <main className="grid grid-cols-1 lg:grid-cols-[auto_1fr]">
              <SmallSidebar userRole={user.role} />
              <BigSidebar userRole={user.role} />
              <div>
                <Navbar user={user} />

                <div className="mx-auto w-[90vw] py-8 lg:w-[90%]">
                  <Outlet context={{ user } satisfies ContextType} />
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
