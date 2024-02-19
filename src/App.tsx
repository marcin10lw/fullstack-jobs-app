import { useLayoutEffect } from 'react';
import { RouterProvider, createHashRouter } from 'react-router-dom';

import { checkDefaultTheme } from './helpers/checkDefaultTheme';
import {
  HomeLayout,
  Landing,
  DashboardLayout,
  Register,
  Login,
  Error,
  AddJob,
  Stats,
  AllJobs,
  Profile,
  Admin,
  EditJob,
} from './pages';
import { ROUTES } from './routes';

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
