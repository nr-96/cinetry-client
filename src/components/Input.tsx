import { Input as AntInput, InputProps as AntInputProps } from 'antd';
import styled from 'styled-components';
import debounce from 'lodash/debounce';

interface IInputProps {
  placeholder?: AntInputProps['placeholder'];
  useDebounce?: boolean;
  onChange: (value: string) => void;
}

function Input({ placeholder, useDebounce, onChange }: IInputProps) {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <StyledInput
      placeholder={placeholder}
      onChange={useDebounce ? debounce(handleOnChange, 1000) : handleOnChange}
    />
  );
}

const StyledInput = styled(AntInput)``;

export default Input;
