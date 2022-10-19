import { Input as AntInput, InputProps as AntInputProps } from 'antd';
import styled from 'styled-components';

interface IInputProps {
  placeholder?: AntInputProps['placeholder'];
  onChange: (value: string) => void;
}

function Input({ placeholder, onChange }: IInputProps) {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange(e.target.value);
  return <StyledInput placeholder={placeholder} onChange={handleOnChange} />;
}

const StyledInput = styled(AntInput)``;

export default Input;
