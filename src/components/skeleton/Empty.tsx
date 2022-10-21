import { Empty as AntEmpty } from 'antd';
import styled from 'styled-components';
import { colors } from '../common';

interface IEmptyProps {
  message?: string;
}

function Empty({ message = 'No Data' }: IEmptyProps) {
  return (
    <AntEmpty
      image={AntEmpty.PRESENTED_IMAGE_SIMPLE}
      imageStyle={{
        height: 60,
      }}
      description={<StyledMessage>{message}</StyledMessage>}
    />
  );
}

const StyledMessage = styled.span`
  color: ${colors['button:primary:focus']};
`;

export default Empty;
