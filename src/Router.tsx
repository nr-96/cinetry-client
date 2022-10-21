import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { setUser as setUserAction, IUser } from './redux/global';
import { authLoader, unauthLoader } from './loaders/authLoader';
import FreeLayout from './layouts/FreeLayout';
import MainLayout from './layouts/MainLayout';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';

function Router() {
  const dispatch = useAppDispatch();
  const authToken = useAppSelector((state) => state.global.user?.authToken);

  useEffect(() => {
    if (authToken) return;

    const sessionUser = sessionStorage.getItem('session-user');

    if (sessionUser) {
      const authUser: IUser = JSON.parse(sessionUser);
      dispatch(setUserAction(authUser));
    }
  }, [authToken, dispatch]);

  const routes = createBrowserRouter([
    {
      path: '/',
      loader: unauthLoader,
      element: <FreeLayout />,
      children: [
        {
          path: '/',
          element: <LoginPage />,
        },
      ],
    },
    {
      path: '/home',
      loader: authLoader,
      element: <MainLayout />,
      children: [
        {
          path: '/home',
          element: <HomePage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default Router;
