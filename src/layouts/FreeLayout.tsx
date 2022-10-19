import { Outlet } from 'react-router-dom';
import { Container } from '../components';

function FreeLayout() {
  return (
    <Container type="primary" span={24} minHeight="100vh">
      <Outlet />
    </Container>
  );
}

export default FreeLayout;
