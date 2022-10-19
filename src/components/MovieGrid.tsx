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
        <Col xs={12} sm={8} md={6} lg={4} xl={3}>
          {movies.map(({ id, title, cover, genre }) => (
            <MovieCard key={id} title={title} cover={cover} genre={genre} />
          ))}
        </Col>
      </Row>
    </StyledCard>
  );
}

const StyledCard = styled(Card)`
  background: ${colors['bg:primary']};
`;

export default MovieGrid;
