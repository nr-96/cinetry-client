import { Button as AntButton, ButtonProps } from 'antd';
import styled from 'styled-components';
import { colors } from './common';

interface IButtonProps extends ButtonProps {
  type: 'primary',
  width?: 'auto' | '100%'
  children: string
}

function Button({ type, width = 'auto', children }: IButtonProps) {
  return (
    <StyledButton type={ type } width={ width }>
      { children }
    </StyledButton>
  );
}

const StyledButton = styled(AntButton)<IButtonProps>`
  background: ${({ type }) => colors[`button:${type}`] } ;
  border-color: ${({ type }) => colors[`button:${type}`] } ;
  width: ${({ width }) => width };

  &:hover {
    background: ${({ type }) => colors[`button:${type}:focus`] } ;
    border-color: ${({ type }) => colors[`button:${type}:focus`] } ;
  }
  
  &:focus {
    background: ${({ type }) => colors[`button:${type}`] } ;
    border-color: ${({ type }) => colors[`button:${type}`] } ;
  }
`;

export default Button