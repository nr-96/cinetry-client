import { Select as AntSelect, SelectProps as AntSelectProps } from 'antd';
import styled from 'styled-components';

interface ISelectOption {
  id: number | string;
  name: string;
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
      {options.map(({ id, name }) => (
        <StyledSelectSingle.Option key={id} value={id.toString()}>
          {name}
        </StyledSelectSingle.Option>
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
      {options.map(({ id, name }) => (
        <StyledSelectMultiple.Option key={id} value={id.toString()}>
          {name}
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
