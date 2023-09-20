import { useContext } from "react";

import { DashboardContext } from "src/context/DashboardContext";

const useDashboardContext = () => useContext(DashboardContext);

export default useDashboardContext;
