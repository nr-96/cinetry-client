import { Card, Row } from 'antd';
import styled from 'styled-components';
import { colors } from './common';

interface IMovieGridProps {
  children: JSX.Element[];
}

function MovieGrid({ children }: IMovieGridProps) {
  return (
    <StyledCard>
      <Row gutter={[16, 16]}>{children}</Row>
    </StyledCard>
  );
}

const StyledCard = styled(Card)`
  background: ${colors['bg:primary']};
`;

export default MovieGrid;
