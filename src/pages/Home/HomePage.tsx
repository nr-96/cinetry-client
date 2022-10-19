import { Container } from '../../components';
import MoviesFeature from '../../features/Movies';

const { TrendingMovies, DiscoverMovies } = MoviesFeature;

function HomePage() {
  return (
    <Container xs={24}>
      <>
        <TrendingMovies />
        <DiscoverMovies />
      </>
    </Container>
  );
}

export default HomePage;
