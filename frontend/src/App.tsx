import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { ROUTES } from './routes';
import Error from './views/Error';
import DashboardLayout from './views/dashboard/DashboardLayout';
import AddJob from './views/dashboard/addJob/AddJob';
import Admin from './views/dashboard/admin/Admin';
import AllJobs from './views/dashboard/allJobs/AllJobs';
import Job from './views/dashboard/job/Job';
import Profile from './views/dashboard/profile/Profile';
import Stats from './views/dashboard/stats/Stats';
import HomeLayout from './views/home/HomeLayout';
import Landing from './views/home/Landing';
import Login from './views/home/Login';
import Register from './views/home/Register';
import { checkDefaultThemeColor, checkDefaultThemeMode } from './lib/helpers/checkDefaultTheme';
import { buildBodyClassName } from './lib/helpers/buildBodyClassName';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: ROUTES.register,
        element: <Register />,
      },
      {
        path: ROUTES.login,
        element: <Login />,
      },
    ],
  },
  {
    path: ROUTES.dashboard,
    element: <DashboardLayout />,
    errorElement: <Error />,
    children: [
      {
        path: ROUTES.addJob,
        element: <AddJob />,
      },
      {
        path: ROUTES.stats,
        element: <Stats />,
      },
      {
        path: ROUTES.allJobs,
        element: <AllJobs />,
      },
      {
        path: ROUTES.job,
        element: <Job />,
      },
      {
        path: ROUTES.profile,
        element: <Profile />,
      },
      {
        path: ROUTES.admin,
        element: <Admin />,
      },
    ],
  },
]);

const App = () => {
  const defaultThemeMode = checkDefaultThemeMode();
  const defaultThemeColor = checkDefaultThemeColor();
  const defaultBodyClassName = buildBodyClassName(defaultThemeColor, defaultThemeMode);

  document.body.classList.value = defaultBodyClassName;

  return <RouterProvider router={router} />;
};

export default App;
