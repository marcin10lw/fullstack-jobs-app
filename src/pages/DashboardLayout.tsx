import { Outlet } from "react-router-dom";

import DashboardProvider from "src/context/DashboardContext";
import { Wrapper } from "src/assets/wrappers/Dashboard";
import { BigSidebar, Navbar, SmallSidebar } from "src/components";

const DashboardLayout = () => {
  return (
    <DashboardProvider>
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardProvider>
  );
};
export default DashboardLayout;
