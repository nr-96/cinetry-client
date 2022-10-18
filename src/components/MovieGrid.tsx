import { Card, Row, Col } from 'antd';
import styled from 'styled-components';
import MovieCard from './MovieCard';
import { colors } from './common';

function MovieGrid() {
  return (
    <StyledCard>
      <Row gutter={[16, 16]}>
        <Col xs={12} sm={8} md={6} lg={4} xl={3}>
          <MovieCard title="test" cover="/nygOUcBKPHFTbxsYRFZVePqgPK6.jpg" />
        </Col>
      </Row>
    </StyledCard>
  )
};

const StyledCard = styled(Card)`
  background: ${colors['bg:primary']};
`;

export default MovieGrid;