import { Select as AntSelect, SelectProps as AntSelectProps } from 'antd';
import styled from 'styled-components';

interface ISelectOption {
  key: string;
  value: string;
}

interface ISelectProps {
  options: Array<ISelectOption>;
}

function Single({ options }: ISelectProps) {
  const handleChange = (value: unknown) => {
    console.log(`selected ${value}`);
  };

  return (
    <StyledSelect onChange={handleChange}>
      {options.map(({ key, value }) => (
        <StyledSelect.Option key={key}>{value}</StyledSelect.Option>
      ))}
    </StyledSelect>
  );
}

function Multiple({ options }: ISelectProps) {
  const handleChange = (value: unknown) => {
    console.log(`selected ${Array.isArray(value)}`);
  };

  return (
    <StyledSelect mode="multiple" allowClear onChange={handleChange}>
      {options.map(({ key, value }) => (
        <StyledSelect.Option key={key}>{value}</StyledSelect.Option>
      ))}
    </StyledSelect>
  );
}

const StyledSelect = styled(AntSelect)``;

export default {
  Single,
  Multiple,
};
