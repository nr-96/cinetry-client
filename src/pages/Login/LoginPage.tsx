import { Container, Button } from '../../components';

function LoginPage () {
  return (
    <Container justify="space-around" align="middle" minHeight='100vh' xs={14} sm={12} md={8} lg={6}>
      <Button type="primary" width="100%">Login</Button>
    </Container>
  )
};

export default LoginPage;