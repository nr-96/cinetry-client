import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IUser {
  firstName: string;
  lastName: string;
  authToken: string;
}

export interface GlobalState {
  user: IUser | null;
}

const initialState = {
  user: null,
} as GlobalState;

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      return Object.assign(state, { user: action.payload });
    },
  },
});

export const { setUser } = globalSlice.actions;
export default globalSlice.reducer;
