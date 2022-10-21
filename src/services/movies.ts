import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../redux/store';

const { REACT_APP_BASE_URL } = process.env;

interface IMeta {
  page: number;
  totalPages: number;
}
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
interface IQGenre {
  results: Array<IGenre>;
}
export interface IQTrendingMovies {
  results: Array<IMovieListItem>;
}
export interface IQDiscoverMovies {
  results: Array<IMovieListItem>;
  meta?: IMeta;
}

export interface IDiscoverMovies {
  query?: string;
  page?: number;
  genre?: string;
  year?: string;
}

let Authorization =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY2MzMwMjA4LCJleHAiOjE2NjYzNDUyMDh9.KtRLCzorMiqNqaMPdSVqMk9fNqfy5xgzFL960fURc0A';

const updateMovieListItem = (
  movies: IMovieListItem[],
  id: number,
  updates: any
) => {
  const movieIndex = movies.findIndex((m) => m.id === id);
  if (movieIndex >= 0) {
    Object.assign(movies[movieIndex], updates);
  }
};

const moviesService = createApi({
  reducerPath: 'moviesService',
  baseQuery: fetchBaseQuery({
    baseUrl: REACT_APP_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).global.user?.authToken;

      if (token) {
        headers.set('authorization', token);
      }
      return headers;
    },
  }),
  tagTypes: ['TrendingMovies', 'DiscoverMovies'],
  endpoints: (builder) => ({
    /**
     * Side-effect to fetch trending movies
     */
    getGenreList: builder.query<IQGenre, void>({
      query: () => ({
        url: '/movies/genre/list',
        method: 'GET',
        headers: {
          Authorization,
        },
      }),
      transformResponse: ({ data }) => {
        const results = data;
        return { results };
      },
    }),

    /**
     * Side-effect to fetch trending movies
     */
    getTrendingMovies: builder.query<IQTrendingMovies, void>({
      query: () => ({
        url: '/movies/trending',
        method: 'GET',
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
    discoverMovies: builder.query<IQDiscoverMovies, IDiscoverMovies>({
      query: ({ query, genre, year, ...props }) => {
        const params: Omit<IDiscoverMovies, 'genre'> & {
          with_genres?: string;
        } = props;
        if (query) {
          params.query = query;
        }
        if (genre) {
          params.with_genres = genre;
        }
        if (year) {
          params.year = year;
        }

        return {
          url: '/movies/list',
          method: 'GET',
          params,
        };
      },
      transformResponse: ({ data, meta }) => {
        const results = data.map((movie: IMovieListResponseItem) => {
          const { watch_later: watchLater, ...rest } = movie;
          return {
            watchLater,
            ...rest,
          };
        });

        const resultsMeta: IMeta = {
          page: meta.page,
          totalPages: meta.total_pages,
        };

        return { results, meta: resultsMeta };
      },
      providesTags: ['DiscoverMovies'],
    }),

    /**
     * Side-effect to make a movie favourite
     */
    addToFavourite: builder.mutation<IQTrendingMovies, number>({
      query: (movieId) => {
        return {
          url: '/movies/user/favourite',
          method: 'POST',
          body: {
            movie_id: movieId,
          },
        };
      },
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          const updates = { favourite: true };

          dispatch(
            moviesService.util.updateQueryData(
              'getTrendingMovies',
              undefined,
              (draft) => {
                updateMovieListItem(draft.results, id, updates);
              }
            )
          );
        } catch {}
      },
      invalidatesTags: ['DiscoverMovies'],
    }),

    /**
     * Side-effect to remove a movie from favourite
     */
    removeFromFavourite: builder.mutation<IQTrendingMovies, number>({
      query: (movieId) => {
        return {
          url: `/movies/user/favourite/${movieId}`,
          method: 'DELETE',
        };
      },
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          const updates = { favourite: false };

          dispatch(
            moviesService.util.updateQueryData(
              'getTrendingMovies',
              undefined,
              (draft) => updateMovieListItem(draft.results, id, updates)
            )
          );
        } catch {}
      },
      invalidatesTags: ['DiscoverMovies'],
    }),

    /**
     * Side-effect to make a movie favourite
     */
    addToWatchLater: builder.mutation<IQTrendingMovies, number>({
      query: (movieId) => {
        return {
          url: '/movies/user/watch-later',
          method: 'POST',
          body: {
            movie_id: movieId,
          },
        };
      },
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          const updates = { watchLater: true };

          dispatch(
            moviesService.util.updateQueryData(
              'getTrendingMovies',
              undefined,
              (draft) => updateMovieListItem(draft.results, id, updates)
            )
          );
        } catch {}
      },
      invalidatesTags: ['DiscoverMovies'],
    }),

    /**
     * Side-effect to remove a movie from favourite
     */
    removeFromWatchLater: builder.mutation<IQTrendingMovies, number>({
      query: (movieId) => {
        return {
          url: `/movies/user/watch-later/${movieId}`,
          method: 'DELETE',
        };
      },
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          const updates = { watchLater: false };

          dispatch(
            moviesService.util.updateQueryData(
              'getTrendingMovies',
              undefined,
              (draft) => updateMovieListItem(draft.results, id, updates)
            )
          );
        } catch {}
      },
      invalidatesTags: ['DiscoverMovies'],
    }),
  }),
});

export const {
  useGetGenreListQuery,
  useGetTrendingMoviesQuery,
  useDiscoverMoviesQuery,
  useAddToFavouriteMutation,
  useRemoveFromFavouriteMutation,
  useAddToWatchLaterMutation,
  useRemoveFromWatchLaterMutation,
} = moviesService;

export default moviesService;
