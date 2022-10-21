import { waitFor } from '@testing-library/react';
import { store } from '../redux/store';
import { IQTrendingMovies, useGetTrendingMoviesQuery } from './movies';
import { nockScope, renderWithProviders } from '../../test/test-utils';

describe('service: #movies > trending', () => {
  it('should fetch trending movies as a list', async () => {
    const nockData = nockScope.nockMovies.fetchTrendingMovies();

    let isLoading: boolean, data, isSuccess, isError, error;
    function Movies() {
      const sideEffect = useGetTrendingMoviesQuery();
      isLoading = sideEffect.isLoading;
      data = sideEffect.data;
      isSuccess = sideEffect.isSuccess;
      isError = sideEffect.isError;
      error = sideEffect.error;

      return <></>;
    }

    renderWithProviders(<Movies />, { store });
    await waitFor(() => expect(isLoading).toBe(false));

    if (data) {
      const movieData: IQTrendingMovies = data;

      expect(movieData).toHaveProperty('results');
      expect(Array.isArray(movieData.results)).toBeTruthy();
      expect(movieData.results.length > 0).toBeTruthy();

      const sampleMovie = movieData.results[0];
      const nockMovie = nockData.results[0];

      expect(sampleMovie).toHaveProperty('id');
      expect(sampleMovie).toHaveProperty('title');
      expect(sampleMovie).toHaveProperty('poster');
      expect(sampleMovie).toHaveProperty('genre');
      expect(sampleMovie).toHaveProperty('favourite');
      expect(sampleMovie).toHaveProperty('watchLater');

      expect(sampleMovie.id).toBe(nockMovie.id);
    }
  });
});

export {};
