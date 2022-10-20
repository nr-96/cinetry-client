import {
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
  act,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { store } from '../../redux/store';
import { nockScope, renderWithProviders } from '../../../test/test-utils';

import Discover from './Discover';

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

describe('service: #movies > discover:feature', () => {
  it('should load movie-grid on init load', async () => {
    nockScope.nockMovies.fetchGenreList();
    nockScope.nockMovies.fetchTrendingMovies();

    let sampleMovie1 = nockScope.movieSamples.sampleMovie1();
    let sampleMovie2 = nockScope.movieSamples.sampleMovie2();

    nockScope.nockMovies.fetchMoviesList(undefined, 200, {
      data: [sampleMovie1, sampleMovie2],
      meta: { page: 1, total_pages: 2 },
    });
    nockScope.nockMovies.fetchMoviesList({ page: 1 }, 200, {
      data: [sampleMovie1, sampleMovie2],
      meta: { page: 1, total_pages: 2 },
    });

    renderWithProviders(<Discover />, { store });

    const titleBlock = screen.getByTestId('title');
    expect(titleBlock.innerHTML).toBe('Discover Movies');

    await waitForElementToBeRemoved(() =>
      screen.getByTestId('loading-movies-spinner')
    );

    const searchInput = screen.getByTestId('movie-grid');
    expect(searchInput).toBeTruthy();
  });

  it('should search movies by query', async () => {
    nockScope.nockMovies.fetchGenreList();
    nockScope.nockMovies.fetchTrendingMovies();

    let sampleMovie1 = nockScope.movieSamples.sampleMovie1();
    let sampleMovie2 = nockScope.movieSamples.sampleMovie2();

    nockScope.nockMovies.fetchMoviesList(undefined, 200, {
      data: [sampleMovie1, sampleMovie2],
      meta: { page: 1, total_pages: 2 },
    });
    nockScope.nockMovies.fetchMoviesList({ page: 1 }, 200, {
      data: [sampleMovie1, sampleMovie2],
      meta: { page: 1, total_pages: 2 },
    });

    const { store: reduxStore } = renderWithProviders(<Discover />, { store });
    await waitFor(() => screen.getByTestId('movie-grid'));

    nockScope.nockMovies.fetchMoviesList({ page: 1, query: 'mission' }, 200, {
      data: [sampleMovie1, sampleMovie2],
      meta: { page: 1, total_pages: 2 },
    });
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'mission' } });
    // await act(async () => await new Promise((r) => setTimeout(r, 1000)));

    await waitFor(() => screen.getByTestId('loading-movies-spinner'));
    await waitForElementToBeRemoved(() =>
      screen.getByTestId('loading-movies-spinner')
    );

    if (reduxStore) {
      expect(reduxStore.getState().moviesService.queries).toHaveProperty(
        'discoverMovies({"page":1,"query":"mission"})'
      );
    }
  });

  it('should set a movie as favourite', async () => {
    nockScope.nockMovies.fetchGenreList();
    nockScope.nockMovies.fetchTrendingMovies();

    let sampleMovie1 = nockScope.movieSamples.sampleMovie1();
    let sampleMovie2 = nockScope.movieSamples.sampleMovie2();

    nockScope.nockMovies.fetchMoviesList(undefined, 200, {
      data: [sampleMovie1, sampleMovie2],
      meta: { page: 1, total_pages: 2 },
    });
    nockScope.nockMovies.fetchMoviesList({ page: 1 }, 200, {
      data: [sampleMovie1, sampleMovie2],
      meta: { page: 1, total_pages: 2 },
    });

    renderWithProviders(<Discover />, { store });

    await waitFor(() => screen.getByTestId('movie-grid'));
    const favouriteAction = screen.getByTestId(
      `favoutite-action-${sampleMovie1.id}`
    );

    nockScope.nockMovies.addToFavourite({ movie_id: sampleMovie1.id }, 200, {});
    fireEvent.click(favouriteAction);
    await waitFor(() => screen.getByTestId('loading-movies-spinner'));
    await waitForElementToBeRemoved(() =>
      screen.getByTestId('loading-movies-spinner')
    );
  });
});

export {};
