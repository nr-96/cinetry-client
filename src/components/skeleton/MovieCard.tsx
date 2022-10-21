import { Skeleton } from 'antd';
import styled from 'styled-components';
import { colors } from '../common';

export interface IMovieCardProps {
  loading?: boolean;
}

function MovieCard({ loading = false }: IMovieCardProps) {
  return (
    <StyledCard>
      <Skeleton active={loading} />
      <Skeleton active={loading} />
    </StyledCard>
  );
}

const StyledCard = styled.div`
  background: ${colors['bg:primary']};
  border: 1px solid #4c4c4c;
  border-radius: 4px;
  overflow: hidden;

  width: 100%;
  height: 100%;
`;

export default MovieCard;
