import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { User } from "src/types";
import customFetch from "src/utils/customFetch";
import DashboardProvider from "src/context/DashboardContext";
import { Wrapper } from "src/assets/wrappers/Dashboard";
import { BigSidebar, Navbar, SmallSidebar } from "src/components";

type ContextType = { user: User };

const DashboardLayout = () => {
  const {
    data: user,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async (): Promise<User> => {
      const { data } = await customFetch.get("/users/current-user");

      return data.user;
    },
    retry: false,
    cacheTime: 0,
  });

  if (isError) return <Navigate to="/login" />;

  if (isSuccess) {
    console.log(user);

    return (
      <DashboardProvider>
        <Wrapper>
          <main className="dashboard">
            <SmallSidebar userRole={user.role} />
            <BigSidebar userRole={user.role} />
            <div>
              <Navbar user={user} />

              <div className="dashboard-page">
                <Outlet context={{ user } satisfies ContextType} />
              </div>
            </div>
          </main>
        </Wrapper>
      </DashboardProvider>
    );
  }
};

export default DashboardLayout;

export const useUser = () => {
  return useOutletContext<ContextType>();
};
