import { Pagination as AntPagination } from 'antd';

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
    <AntPagination
      showSizeChanger={false}
      current={current}
      total={total}
      pageSize={pageSize}
      onChange={onChange}
    />
  );
}

export default Pagination;
