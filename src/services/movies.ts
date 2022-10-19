import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const { REACT_APP_BASE_URL } = process.env;

interface IQueryResult {
  data: Array<IMovieList>;
}

interface IGenre {
  id: number;
  name: string;
}

interface IMovieList {
  id: number;
  title: string;
  poster: string;
  year: string;
  genre: Array<IGenre>;
}

const moviesService = createApi({
  reducerPath: 'moviesService',
  baseQuery: fetchBaseQuery({ baseUrl: REACT_APP_BASE_URL }),
  endpoints: (builder) => ({
    /**
     * Side-effect to fetch trending movies
     */
    getTrendingMovies: builder.query<IQueryResult, void>({
      query: () => ({
        url: '/movies/trending',
        method: 'GET',
        headers: {
          Authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY2MTg1NTQ4LCJleHAiOjE2NjYyMDA1NDh9.Jbd_pePnecnV1m_-x_gSaZrZYieL-MpaOMRsWXbICI8',
        },
      }),
    }),
  }),
});

export const { useGetTrendingMoviesQuery } = moviesService;

export default moviesService;
