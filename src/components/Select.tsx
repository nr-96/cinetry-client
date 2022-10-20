import { Select as AntSelect, SelectProps as AntSelectProps } from 'antd';
import styled from 'styled-components';

interface ISelectOption {
  key: string;
  value: string;
}

interface ISelectProps {
  placeholder?: string;
  options: Array<ISelectOption>;
  value?: string;
  onChange: (value: string) => void;
}

interface ISelectMultipleProps {
  placeholder?: string;
  options: Array<ISelectOption>;
  value: string[];
  onChange: (value: string[]) => void;
}

function Single({ placeholder, options, value, onChange }: ISelectProps) {
  const handleChange = (value: unknown) => {
    if (typeof value === 'string') {
      onChange(value);
    } else {
      onChange('');
    }
  };

  return (
    <StyledSelectSingle
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    >
      {options.map(({ key, value }) => (
        <StyledSelectSingle.Option key={key}>{value}</StyledSelectSingle.Option>
      ))}
    </StyledSelectSingle>
  );
}

function Multiple({
  placeholder,
  options,
  value,
  onChange,
}: ISelectMultipleProps) {
  const handleChange = (value: unknown) => {
    if (Array.isArray(value)) {
      onChange(value);
    } else {
      onChange([]);
    }
  };

  return (
    <StyledSelectMultiple
      allowClear
      mode="multiple"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    >
      {options.map(({ key, value }) => (
        <StyledSelectMultiple.Option key={key}>
          {value}
        </StyledSelectMultiple.Option>
      ))}
    </StyledSelectMultiple>
  );
}

const StyledSelectSingle = styled(AntSelect)`
  min-width: 100px;
`;

const StyledSelectMultiple = styled(AntSelect)`
  min-width: 150px;
`;

export default {
  Single,
  Multiple,
};
