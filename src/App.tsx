import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { checkDefaultTheme } from "./utils/checkDefaultTheme";
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
} from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <AddJob />,
      },
      {
        path: "stats",
        element: <Stats />,
      },
      {
        path: "all-jobs",
        element: <AllJobs />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "admin",
        element: <Admin />,
      },
    ],
  },
]);

const isDarkTheme = checkDefaultTheme() === "dark";

const App = () => {
  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDarkTheme);
  }, []);

  return <RouterProvider router={router} />;
};
export default App;
