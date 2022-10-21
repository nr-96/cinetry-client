import { Layout } from 'antd';
import styled from 'styled-components';
import { colors, breakpoints } from './common';
const { Content: AntContent } = Layout;

interface IContentProps {
  type?: 'primary' | 'transparent';
  minHeight?: 'auto' | '100vh';
  children: JSX.Element | string;
}

function Content({ type, minHeight, children }: IContentProps) {
  return (
    <StyledContent type={type} minHeight={minHeight}>
      {children}
    </StyledContent>
  );
}

const StyledContent = styled(({ minHeight, ...rest }) => (
  <AntContent {...rest} />
))`
  background: ${({ type = 'transparent' }: IContentProps) =>
    colors[`bg:${type}`]};
  min-height: ${({ minHeight }: IContentProps) => minHeight};

  @media ${breakpoints.xs} {
    padding: 25px;
  }

  @media ${breakpoints.md} {
    padding: 25px 50px;
  }
`;

export default Content;
