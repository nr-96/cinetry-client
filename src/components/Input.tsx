import { useState, useEffect, useMemo } from 'react';
import { Input as AntInput, InputProps as AntInputProps } from 'antd';
import styled from 'styled-components';
import debounce from 'lodash/debounce';

interface IInputProps {
  placeholder?: AntInputProps['placeholder'];
  value: string;
  onChange: AntInputProps['onChange'];
}

function Input({ placeholder, value, onChange }: IInputProps) {
  return (
    <StyledInput placeholder={placeholder} value={value} onChange={onChange} />
  );
}

const StyledInput = styled(AntInput)``;

export default Input;
