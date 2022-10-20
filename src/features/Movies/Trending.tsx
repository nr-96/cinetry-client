import styled from 'styled-components';
import { Container, MovieCarousel, MovieCard } from '../../components';
import { useGetTrendingMoviesQuery } from '../../services/movies';

function TrendingMovies() {
  const { data } = useGetTrendingMoviesQuery();
  const movies = data?.results || [];

  return (
    <div>
      <StyledTitle data-testid="title">Trending Movies</StyledTitle>
      <MovieCarousel>
        {movies.map(({ id, title, poster, genre, watchLater, favourite }) => (
          <MovieCard
            key={id}
            id={id}
            title={title}
            poster={poster}
            genre={genre}
            watchLater={watchLater}
            favourite={favourite}
            toggleFavourite={() => {}}
            toggleWatchLater={() => {}}
          />
        ))}
      </MovieCarousel>
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
