import { Container } from '../../components';
import MoviesFeature from '../../features/Movies';

const { TrendingMovies } = MoviesFeature;

function HomePage() {
  return (
    <Container xs={24}>
      <TrendingMovies />
    </Container>
  );
}

export default HomePage;
