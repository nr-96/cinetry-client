import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TMovie } from '../models/movies';

const { REACT_APP_BASE_URL } = process.env;

const movieService = createApi({
  reducerPath: 'moviesService',
  baseQuery: fetchBaseQuery({ baseUrl: REACT_APP_BASE_URL }),
  endpoints: (builder) => ({
    /**
     * Side-effect to fetch trending movies
     */
    getTrendingMovies: builder.query<TMovie[], void>({
      query: () => '/movies/trending'
    })
  })
});

export const {
  useGetTrendingMoviesQuery
} = movieService;

export default movieService;