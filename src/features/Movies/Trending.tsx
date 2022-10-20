import { MovieCarousel, MovieCard } from '../../components';
import { useGetTrendingMoviesQuery } from '../../services/movies';

function TrendingMovies() {
  const { data } = useGetTrendingMoviesQuery();
  const movies = data?.results || [];

  return (
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
  );
}

export default TrendingMovies;
