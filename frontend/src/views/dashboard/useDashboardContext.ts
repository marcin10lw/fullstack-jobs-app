import { useContext } from 'react';

import { DashboardContext } from 'src/views/dashboard/DashboardContext';

const useDashboardContext = () => useContext(DashboardContext);

export default useDashboardContext;
