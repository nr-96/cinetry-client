import { Card, Row, Col } from 'antd';
import styled from 'styled-components';
import MovieCard, { IMovieCardProps } from './MovieCard';
import { colors } from './common';

interface IMovieGridProps {
  movies: Array<{ id: number } & IMovieCardProps>;
}

function MovieGrid({ movies }: IMovieGridProps) {
  return (
    <StyledCard>
      <Row gutter={[16, 16]}>
        {movies.map(({ id, title, poster, genre, watchLater, favourite }) => (
          <Col key={id} xs={12} sm={8} md={6} lg={4} xl={3}>
            <MovieCard
              title={title}
              poster={poster}
              genre={genre}
              watchLater={watchLater}
              favourite={favourite}
            />
          </Col>
        ))}
      </Row>
    </StyledCard>
  );
}

const StyledCard = styled(Card)`
  background: ${colors['bg:primary']};
`;

export default MovieGrid;
