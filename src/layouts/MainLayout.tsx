import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { Content } from '../components';
import styled from 'styled-components';

const { Header, Footer } = Layout;

function MainLayout() {
  return (
    <Layout>
      <Header className="header">
        <StyledBrand className="logo">CINETRY</StyledBrand>
      </Header>
      <Content type="primary" minHeight="100vh">
        <Outlet />
      </Content>
      <Footer>
        <StyledFooter>CINETRY - 2022</StyledFooter>
      </Footer>
    </Layout>
  );
}

const StyledBrand = styled.div`
  padding: 0 10px;
  color: #dc0d0d;
  font-weight: 800;
  font-size: 24px;
`;

const StyledFooter = styled.div`
  text-align: center;
  font-size: 12px;
`;

export default MainLayout;
