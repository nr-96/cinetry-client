import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { unauthLoader } from './loaders/authLoader';
import FreeLayout from './layouts/FreeLayout';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';

function Router () {
  const routes = createBrowserRouter([
    {
      path: "/",
      loader: unauthLoader,
      element: <FreeLayout />,
      children: [
        {
          path: "/",
          element: <LoginPage />
        },
        {
          path: "/home",
          element: <HomePage />
        }
      ],
    },
  ]);

  return (
    <RouterProvider router={routes} />
  )
}

export default Router;
