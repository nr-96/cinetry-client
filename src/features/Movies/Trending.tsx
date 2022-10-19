import { MovieCarousel } from '../../components';
import { useGetTrendingMoviesQuery } from '../../services/movies' 

function TrendingMovies() {
  const { data: results } = useGetTrendingMoviesQuery();

  return (
    <MovieCarousel movies={results?.data || []}/>
  )
}

export default TrendingMovies;
