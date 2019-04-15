import React from 'react';
import styled from 'styled-components';
import { transitions } from 'polished';
const Progress_ = styled.div({
  width: '100%',
  height: 4,
  borderRadius: 2,
  backgroundColor: '#404040',
});
const ProgressBar_ = styled.div<{ progress: number }>(props => ({
  backgroundColor: '#b3b3b3',
  height: '100%',
  borderRadius: 2,
  ...transitions('transform 0.1s linear'),
  width: `${props.progress * 100}%`,
}));
const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
  <Progress_>
    <ProgressBar_ progress={progress} />
  </Progress_>
);

export default ProgressBar;
