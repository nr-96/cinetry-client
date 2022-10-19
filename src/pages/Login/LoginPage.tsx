import { Container } from '../../components';
import LoginFeature from '../../features/Login';

function LoginPage() {
  return (
    <Container
      justify="space-around"
      align="middle"
      minHeight="100vh"
      xs={14}
      sm={12}
      md={8}
      lg={6}
    >
      <LoginFeature />
    </Container>
  );
}

export default LoginPage;
