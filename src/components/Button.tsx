import { Button as AntButton, ButtonProps, CarouselProps } from 'antd';
import styled from 'styled-components';
import { colors } from './common';

interface IButtonProps {
  type: 'primary';
  name: string;
  loading?: boolean;
  width?: 'auto' | '100%';
  onClick?: ButtonProps['onClick'];
}

function Button({
  type,
  width = 'auto',
  name,
  loading = false,
  onClick,
}: IButtonProps) {
  const props: {
    onClick?: IButtonProps['onClick'];
  } = {};

  if (onClick) {
    props.onClick = onClick;
  }

  return (
    <StyledButton type={type} width={width} loading={loading} {...props}>
      {name}
    </StyledButton>
  );
}

const StyledButton = styled(AntButton)<Omit<IButtonProps, 'name'>>`
  background: ${({ type }) => colors[`button:${type}`]};
  border-color: ${({ type }) => colors[`button:${type}`]};
  width: ${({ width }) => width};

  &:hover {
    background: ${({ type }) => colors[`button:${type}:focus`]};
    border-color: ${({ type }) => colors[`button:${type}:focus`]};
  }

  &:focus {
    background: ${({ type }) => colors[`button:${type}`]};
    border-color: ${({ type }) => colors[`button:${type}`]};
  }
`;

export default Button;
