import { useState, useEffect, useMemo } from 'react';
import { Input as AntInput, InputProps as AntInputProps } from 'antd';
import styled from 'styled-components';
import debounce from 'lodash/debounce';

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

const StyledInput = styled(AntInput)``;

export default Input;
