import { Pagination as AntPagination } from 'antd';
import styled from 'styled-components';
import { colors} from './common'

interface IPaginationProps {
  current: number;
  pages?: number;
  pageSize?: number;
  onChange: (value: number) => void;
}

function Pagination({
  current,
  pages = 1,
  pageSize = 20,
  onChange,
}: IPaginationProps) {
  const total = pageSize * pages;

  if (pages <= 1) {
    return null;
  }

  return (
    <StyledPagination
      showSizeChanger={false}
      current={current}
      total={total}
      pageSize={pageSize}
      onChange={onChange}
      responsive={true}
    />
  );
}

const StyledPagination = styled(AntPagination)`
  li {
    background: transparent;
    color: #ffffff;

    a {
      color: #ffffff;
      
      span {
        color: #ffffff !important;
      }
      
      &:hover {
        color: ${colors['input:primary']}
      }
    }

    button {
      background: transparent !important;

      span {
        color: #ffffff;
      }
    }

    &.ant-pagination-item-active {
      border-color: ${colors['input:primary:focus']};

      a {
        color: ${colors['input:primary:focus']};
      }
    }

    &:hover {
      border-color: ${colors['input:primary']};

      button {
        border-color: ${colors['input:primary']} !important;
      }
    }
  }
`;

export default Pagination;
