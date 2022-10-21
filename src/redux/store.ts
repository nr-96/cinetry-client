import {
  configureStore,
  ThunkAction,
  Action,
  MiddlewareAPI,
  isRejected,
} from '@reduxjs/toolkit';
import globalSlice, { setUser } from './global';
import { Messages } from '../components';
import authService from '../services/auth';
import moviesService from '../services/movies';

export const store = configureStore({
  reducer: {
    global: globalSlice,
    [authService.reducerPath]: authService.reducer,
    [moviesService.reducerPath]: moviesService.reducer,
  },
  middleware: (defaultMiddleware) => {
    return defaultMiddleware()
      .concat(authService.middleware)
      .concat(moviesService.middleware)
      .concat(({ getState, dispatch }: MiddlewareAPI) => (next) => (action) => {
        if (isRejected(action) && action?.payload?.status === 401) {
          const authUser = getState().global.user;

          if (authUser) {
            Messages.showError('User session expired, please login!');
            sessionStorage.removeItem('session-user');
            dispatch(setUser(null));
          }
        }

        return next(action);
      });
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
