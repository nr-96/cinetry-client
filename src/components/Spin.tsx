import { Spin as AntSpin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import { colors } from './common';

interface ISpinProps {
  testId?: string;
  loading?: boolean;
  children?: JSX.Element | JSX.Element[];
}

function Spin({ testId, loading = false, children }: ISpinProps) {
  const antIcon = (
    <LoadingOutlined
      data-testid={testId}
      style={{ fontSize: 35, color: colors['button:primary:focus'] }}
      spin
    />
  );

  if (children) {
    return (
      <StyledSpin spinning={loading} indicator={antIcon}>
        {children}
      </StyledSpin>
    );
  }

  return <StyledSpin spinning={loading} indicator={antIcon} />;
}

const StyledSpin = styled(AntSpin)``;

export default Spin;
