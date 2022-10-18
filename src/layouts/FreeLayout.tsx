import { Row, Col } from 'antd';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from '../components';

function FreeLayout() {
  return (
    <Container span={24}>
      <Outlet />
    </Container>
  );
};

const StyledRow = styled(Row)`
  background: 
  min-height: 100vh;
`

export default FreeLayout;
