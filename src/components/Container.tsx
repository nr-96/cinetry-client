import { Row, Col, RowProps, ColProps } from 'antd';
import styled from 'styled-components';
import { colors } from './common';

interface IRowProps {
  type?: 'primary' | 'transparent'
  justify?: RowProps['justify']
  align?: RowProps['align']
  minHeight?: 'auto' | '100vh'
}

interface IContainerProps extends IRowProps, ColProps {
  children: JSX.Element | string
}

function Container({ 
  type, 
  justify,
  align,
  span,
  xs,
  sm,
  md,
  lg,
  minHeight = 'auto', 
  children
}: IContainerProps) {
  return (
    <StyledRow type={ type } justify={ justify } align={align} minHeight={minHeight} >
      <Col span={span} xs={xs} sm={sm} md={md} lg={lg} >
        { children }
      </Col>
    </StyledRow>
  );
};

const StyledRow = styled(({ minHeight, ...rest }) => <Row { ...rest } />)`
  background: ${({ type = 'transparent' }: IRowProps) => colors[`bg:${type}`]};
  min-height: ${({ minHeight }: IRowProps) => minHeight};
`

export default Container;
