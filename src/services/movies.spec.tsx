import { waitFor } from '@testing-library/react';
import nock from 'nock';
import { store } from '../redux/store';
import { useGetTrendingMoviesQuery } from './movies';
import { nockScope, renderWithProviders } from '../../test/test-utils';

describe('service: #movies', () => {
  it('should fetch trending movies as a list', async () => {
    nockScope.nockMovies.fetchTrendingMovies();

    let isLoading: boolean, data, isError, error;
    function Movies() {
      const sideEffect = useGetTrendingMoviesQuery();
      isLoading = sideEffect.isLoading;
      data = sideEffect.data;
      isError = sideEffect.isError;
      error = sideEffect.error;

      return <></>;
    }

    renderWithProviders(<Movies />, { store });
    await waitFor(() => expect(isLoading).toBe(false));

    console.log(error);
    console.log(data);
    console.log(isError);
  });
});

export {};
