import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const { REACT_APP_BASE_URL } = process.env;
interface IGenre {
  id: number;
  name: string;
}
interface IMovieListItem {
  id: number;
  title: string;
  poster: string;
  year: string;
  genre: Array<IGenre>;
  watchLater: boolean;
  favourite: boolean;
}
interface IMovieListResponseItem {
  id: number;
  title: string;
  poster: string;
  year: string;
  genre: Array<IGenre>;
  watch_later: boolean;
  favourite: boolean;
}
interface IQTrendingMovies {
  results: Array<IMovieListItem>;
}

let Authorization =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY2MjAyODI2LCJleHAiOjE2NjYyMTc4MjZ9.D4-T-o83eWc8PybGJOWnagG1OVaeqsKhOg04wTW90Sc';

const moviesService = createApi({
  reducerPath: 'moviesService',
  baseQuery: fetchBaseQuery({ baseUrl: REACT_APP_BASE_URL }),
  endpoints: (builder) => ({
    /**
     * Side-effect to fetch trending movies
     */
    getTrendingMovies: builder.query<IQTrendingMovies, void>({
      query: () => ({
        url: '/movies/trending',
        method: 'GET',
        headers: {
          Authorization,
        },
      }),
      transformResponse: ({ data }) => {
        const results = data.map((movie: IMovieListResponseItem) => {
          const { watch_later: watchLater, ...rest } = movie;
          return {
            watchLater,
            ...rest,
          };
        });

        return { results };
      },
    }),

    /**
     * Side-effect to discover movies
     */
    discoverMovies: builder.query<IQTrendingMovies, void>({
      query: (params) => {
        return {
          url: '/movies/list',
          method: 'GET',
          headers: {
            Authorization,
          },
        };
      },
      transformResponse: ({ data }) => {
        const results = data.map((movie: IMovieListResponseItem) => {
          const { watch_later: watchLater, ...rest } = movie;
          return {
            watchLater,
            ...rest,
          };
        });

        return { results };
      },
    }),
  }),
});

export const { useGetTrendingMoviesQuery, useDiscoverMoviesQuery } =
  moviesService;

export default moviesService;
