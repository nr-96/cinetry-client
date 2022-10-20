import { waitFor, screen } from '@testing-library/react';
import nock from 'nock';

import { store } from '../../redux/store';
import { useGetTrendingMoviesQuery } from '../../services/movies';
import { nockScope, renderWithProviders } from '../../../test/test-utils';

import Trending from './Trending';

describe('service: #movies', () => {
  it('should fetch trending movies as a list', async () => {
    nockScope.nockMovies.fetchTrendingMovies();
    renderWithProviders(<Trending />, { store });

    const titleBlock = screen.getByTestId('title');
    expect(titleBlock.innerHTML).toBe('Trending Movies');
  });
});

export {};
