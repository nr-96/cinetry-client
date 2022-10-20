import { Divider as AntDivider } from 'antd';
import styled from 'styled-components';

function Divider() {
  return <StyledDivider />;
}

const StyledDivider = styled(AntDivider)`
  border-top: 1px solid #505050;
`;

export default Divider;
