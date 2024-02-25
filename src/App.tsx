import { useLayoutEffect } from 'react';
import { RouterProvider, createHashRouter } from 'react-router-dom';

import { checkDefaultTheme } from './lib/helpers/checkDefaultTheme';

import Admin from './views/dashboard/admin/Admin';
import Error from './views/Error';
import HomeLayout from './views/HomeLayout';
import Landing from './views/Landing';
import Profile from './views/dashboard/profile/Profile';
import Stats from './views/dashboard/stats/Stats';
import { ROUTES } from './routes';
import DashboardLayout from './views/dashboard/DashboardLayout';
import AddJob from './views/dashboard/addJob/AddJob';
import AllJobs from './views/dashboard/allJobs/AllJobs';
import Login from './views/user/Login';
import Register from './views/user/Register';

const router = createHashRouter([
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
        index: true,
        element: <AddJob />,
      },
      {
        path: 'stats',
        element: <Stats />,
      },
      {
        path: 'all-jobs',
        element: <AllJobs />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'admin',
        element: <Admin />,
      },
    ],
  },
]);

checkDefaultTheme();

const App = () => {
  const theme = checkDefaultTheme();

  useLayoutEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return <RouterProvider router={router} />;
};
export default App;
