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
  type = 'transparent', 
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
    <StyledRow type={ type } justify={ justify } align={align} >
      <Col span={span} xs={xs} sm={sm} md={md} lg={lg} >
        { children }
      </Col>
    </StyledRow>
  );
};

const StyledRow = styled(Row)<IRowProps>`
  background: ${({ type = 'primary' }) => colors[`bg:${type}`]};
  // min-height: ${({ minHeight }) => minHeight};
`

export default Container;
