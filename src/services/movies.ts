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

export interface IDiscoverMovies {
  query?: string;
  page?: number;
  genre?: string;
  year?: string;
}

let Authorization =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY2MjU0Nzg4LCJleHAiOjE2NjYyNjk3ODh9.F5LcNl40c2RnecWAj7npe7rwWoSl9Ahkd_05DGK13B4';

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
  baseQuery: fetchBaseQuery({ baseUrl: REACT_APP_BASE_URL }),
  tagTypes: ['TrendingMovies', 'DiscoverMovies'],
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
    discoverMovies: builder.query<IQTrendingMovies, IDiscoverMovies>({
      query: ({ query, genre, ...props }) => {
        const params: Omit<IDiscoverMovies, 'genre'> & {
          with_genres?: string;
        } = props;
        if (query) {
          params.query = query;
        }
        if (genre) {
          params.with_genres = genre;
        }

        return {
          url: '/movies/list',
          method: 'GET',
          headers: {
            Authorization,
          },
          params,
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
          headers: {
            Authorization,
          },
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
          headers: {
            Authorization,
          },
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
          headers: {
            Authorization,
          },
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
          headers: {
            Authorization,
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
  }),
});

export const {
  useGetTrendingMoviesQuery,
  useDiscoverMoviesQuery,
  useAddToFavouriteMutation,
  useRemoveFromFavouriteMutation,
  useAddToWatchLaterMutation,
  useRemoveFromWatchLaterMutation,
} = moviesService;

export default moviesService;
