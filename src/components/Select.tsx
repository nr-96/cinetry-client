import { Select as AntSelect, SelectProps as AntSelectProps } from 'antd';
import styled from 'styled-components';

interface ISelectOption {
  key: string;
  value: string;
}

interface ISelectProps {
  options: Array<ISelectOption>;
  onChange: (value: string) => void;
}

interface ISelectMultipleProps {
  options: Array<ISelectOption>;
  onChange: (value: string[]) => void;
}

function Single({ options, onChange }: ISelectProps) {
  const handleChange = (value: unknown) => {
    if (typeof value === 'string') {
      onChange(value);
    } else {
      onChange('');
    }
  };

  return (
    <StyledSelect onChange={handleChange}>
      {options.map(({ key, value }) => (
        <StyledSelect.Option key={key}>{value}</StyledSelect.Option>
      ))}
    </StyledSelect>
  );
}

function Multiple({ options, onChange }: ISelectMultipleProps) {
  const handleChange = (value: unknown) => {
    if (Array.isArray(value)) {
      onChange(value);
    } else {
      onChange([]);
    }
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
