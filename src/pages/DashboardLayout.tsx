import { Navigate, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { User } from "src/types";
import customFetch from "src/utils/customFetch";
import { Wrapper } from "src/assets/wrappers/Dashboard";
import { BigSidebar, Navbar, SmallSidebar } from "src/components";
import DashboardProvider from "src/context/DashboardContext";

const DashboardLayout = () => {
  const {
    data: user,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async (): Promise<User> => {
      const { data } = await customFetch.get("/users/current-user", {
        withCredentials: true,
      });

      return data.user;
    },
    retry: false,
  });

  if (isError) return <Navigate to="/login" />;

  if (isSuccess) {
    return (
      <DashboardProvider>
        <Wrapper>
          <main className="dashboard">
            <SmallSidebar />
            <BigSidebar />
            <div>
              <Navbar user={user} />

              <div className="dashboard-page">
                <Outlet />
              </div>
            </div>
          </main>
        </Wrapper>
      </DashboardProvider>
    );
  }
};
export default DashboardLayout;
