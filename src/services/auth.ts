import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setUser as setUserAction, IUser } from '../redux/global';

const { REACT_APP_BASE_URL } = process.env;

const authService = createApi({
  reducerPath: 'authService',
  baseQuery: fetchBaseQuery({ baseUrl: REACT_APP_BASE_URL }),
  endpoints: (builder) => ({
    /**
     * Side-effect to authorize
     */
    doAuthorize: builder.mutation<{ data: string }, void>({
      query: () => ({
        url: '/auth/login',
        method: 'POST',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: results } = await queryFulfilled;

          const user: IUser = {
            firstName: 'John',
            lastName: 'Doe',
            authToken: results.data,
          };

          sessionStorage.setItem('session-user', JSON.stringify(user));
          dispatch(setUserAction(user));
        } catch (e) {
          console.log('error', e);
        }
      },
    }),
  }),
});

export const { useDoAuthorizeMutation } = authService;

export default authService;
