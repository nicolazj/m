import { transitions } from 'polished';
import React from 'react';
import styled from 'styled-components';

const Progress_ = styled.div({
  width: '100%',
  height: 4,
  borderRadius: 2,
  backgroundColor: '#404040',
});
const ProgressBar_ = styled.div({
  backgroundColor: '#b3b3b3',
  height: '100%',
  borderRadius: 2,
  ...transitions('transform 0.1s linear'),
});
const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
  <Progress_>
    <ProgressBar_ style={{ width: `${progress * 100}%` }} />
  </Progress_>
);

export default ProgressBar;
