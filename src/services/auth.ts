import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const { REACT_APP_BASE_URL } = process.env;

const authService = createApi({
  reducerPath: 'authService',
  baseQuery: fetchBaseQuery({ baseUrl: REACT_APP_BASE_URL }),
  endpoints: (builder) => ({
    /**
     * Side-effect to authorize
     */
     doAuthorize: builder.mutation<null, void>({
      query: () => ({
        url: '/auth/login',
        method: 'POST'
      })
    })
  })
});

export const {
  useDoAuthorizeMutation
} = authService;

export default authService;