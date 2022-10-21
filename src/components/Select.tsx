import { Select as AntSelect } from 'antd';
import styled from 'styled-components';

interface ISelectOption {
  id: number | string;
  name: string;
}

interface ISelectProps {
  testId?: string;
  placeholder?: string;
  options: Array<ISelectOption>;
  value?: string;
  onChange: (value: string) => void;
}

interface ISelectMultipleProps {
  testId?: string;
  placeholder?: string;
  options: Array<ISelectOption>;
  value: string[];
  onChange: (value: string[]) => void;
}

function Single({
  testId,
  placeholder,
  options,
  value,
  onChange,
}: ISelectProps) {
  const handleChange = (value: unknown) => {
    if (typeof value === 'string') {
      onChange(value);
    } else {
      onChange('');
    }
  };

  return (
    <StyledSelectSingle
      data-testid={testId}
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
  testId,
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
      data-testid={testId}
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

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  Single,
  Multiple,
};
