import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { Content } from '../components';

const { Header } = Layout;

function MainLayout() {
  return (
    <Layout>
      <Header className="header">
        <div className="logo">Test...</div>
      </Header>
      <Content type="primary" minHeight="100vh">
        <Outlet />
      </Content>
    </Layout>
  );
}

export default MainLayout;
