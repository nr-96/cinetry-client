import { MovieCarousel } from '../../components';
import { useGetTrendingMoviesQuery } from '../../services/movies';

function TrendingMovies() {
  const { data } = useGetTrendingMoviesQuery();
  
  return <MovieCarousel movies={data?.results || []} />;
}

export default TrendingMovies;
