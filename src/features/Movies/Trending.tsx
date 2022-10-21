import styled from 'styled-components';
import { MovieCarousel, MovieCard, Skeleton } from '../../components';
import { useGetTrendingMoviesQuery } from '../../services/movies';
import { useToggleFavourite, useToggleWatchLater } from './shared';

function TrendingMovies() {
  const { data, isFetching: loadingMovies } = useGetTrendingMoviesQuery();
  const toggleFavourite = useToggleFavourite();
  const toggleWatchLater = useToggleWatchLater();

  const movies = data?.results || [];

  return (
    <div>
      <StyledTitle data-testid="title">Trending Movies</StyledTitle>

      {!movies.length && !loadingMovies ? (
        <Skeleton.Empty message="No trending movies to display" />
      ) : (
        <MovieCarousel>
          {!movies.length && loadingMovies
            ? Array.from(Array(10).keys()).map((i) => (
                <Skeleton.MovieCard key={i} loading />
              ))
            : movies.map(
                ({ id, title, poster, genre, watchLater, favourite }) => (
                  <MovieCard
                    key={id}
                    id={id}
                    title={title}
                    poster={poster}
                    genre={genre}
                    watchLater={watchLater}
                    favourite={favourite}
                    toggleFavourite={toggleFavourite}
                    toggleWatchLater={toggleWatchLater}
                  />
                )
              )}
        </MovieCarousel>
      )}
    </div>
  );
}

const StyledTitle = styled.div`
  margin: 10px;
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
`;

export default TrendingMovies;
