import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import movieService from '../services/movies';

export const store = configureStore({
  reducer: {
    [movieService.reducerPath]: movieService.reducer
  },
  middleware: (defaultMiddleware) => {
    return defaultMiddleware()
      .concat(movieService.middleware);
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
