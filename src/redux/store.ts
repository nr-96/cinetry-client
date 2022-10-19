import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authService from '../services/auth';
import moviesService from '../services/movies';

export const store = configureStore({
  reducer: {
    [authService.reducerPath]: authService.reducer,
    [moviesService.reducerPath]: moviesService.reducer,
  },
  middleware: (defaultMiddleware) => {
    return defaultMiddleware().concat(moviesService.middleware);
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
