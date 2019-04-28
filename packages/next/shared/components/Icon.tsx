import { memo } from 'react';
import styled from 'styled-components';

const icons = {
  play: '\f132',
  pause: '\f130',
  next: '\f148',
  prev: '\f146',
  track: '\f156',
  queue: '\f13a',
};

type T = typeof icons;
interface Props {
  icon: keyof T;
}

const Icon_ = styled.div<Props>(props => ({
  ':before': {
    fontFamily: 'icon',
    fontStyle: 'normal',
    fontWeight: '400',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    lineHeight: 'inherit',
    verticalAlign: 'bottom',
    display: 'inline-block',
    textDecoration: 'inherit',
    content: `"${icons[props.icon]}"`,
  },
}));

export default memo(Icon_);
