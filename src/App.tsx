import { useLayoutEffect } from 'react';
import { RouterProvider, createHashRouter } from 'react-router-dom';

import { checkDefaultTheme } from './helpers/checkDefaultTheme';

import { ROUTES } from './routes';
import DashboardLayout from './views/dashboard/DashboardLayout';
import HomeLayout from './pages/HomeLayout';
import Error from './pages/Error';
import Landing from './pages/Landing';
import Register from './views/user/Register';
import Login from './views/user/Login';
import AddJob from './views/dashboard/addJob/AddJob';
import Stats from './pages/Stats';
import AllJobs from './views/dashboard/allJobs/AllJobs';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import EditJob from './pages/EditJob';

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
      {
        path: 'edit-job/:id',
        element: <EditJob />,
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
