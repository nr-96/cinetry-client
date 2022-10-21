import { Input as AntInput, InputProps as AntInputProps } from 'antd';
import styled from 'styled-components';
import { colors } from './common';

interface IInputProps {
  testId?: string;
  placeholder?: AntInputProps['placeholder'];
  value: string;
  onChange: AntInputProps['onChange'];
}

function Input({ testId, placeholder, value, onChange }: IInputProps) {
  return (
    <StyledInput
      data-testid={testId}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

const StyledInput = styled(AntInput)`
  background: transparent;
  border: 1px solid #ffffff;
  box-shadow: none;
  color: #ffffff;

  &:hover {
    border: 1px solid ${colors['button:primary']};
    box-shadow: none;
  }

  &:focus {
    border: 1px solid ${colors['button:primary:focus']};
    box-shadow: none;
  }
`;

export default Input;
