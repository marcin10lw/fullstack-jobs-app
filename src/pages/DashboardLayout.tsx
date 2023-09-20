import { Outlet } from "react-router-dom";

import { Wrapper } from "src/assets/wrappers/Dashboard";
import { BigSidebar, Navbar, SmallSidebar } from "src/components";

const DashboardLayout = () => {
  return (
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
  );
};
export default DashboardLayout;
