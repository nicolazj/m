import { margin, padding, transitions } from 'polished';
import styled from 'styled-components';

import { Box, Flex } from '@rebass/grid';

import LazyImage from './components/LazyImage';

export const Grid = styled(Flex).attrs({
  justifyContent: 'flex-start',
  flexWrap: 'wrap',
})({
  height: '100%',
});
export const Cell = styled(Box).attrs(({ p }) => ({ p: p ? p : 2 }))({
  textAlign: 'center',
  height: '100%',
  overflow: 'hidden',
});

export const ContentSpacing = styled.div({
  ...padding(0, 24, 0, 24),
});

export const Square = styled.div({
  width: '100%',
  paddingTop: '100%',
  position: 'relative',
  height: 0,
});

const textStyle = {
  color: '#fff',
  fontSize: '1rem',
  lineHeight: 1.7,
};

export const Text = styled.span(textStyle);
export const SubText = styled.span({
  ...textStyle,
  opacity: 0.6,
  '&:hover': {
    opacity: 1,
  },
  fontSize: '0.75rem',
});
export const A = styled.a({
  color: '#fff',
  cursor: 'pointer',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
    textUnderlinePosition: 'under',
  },
});
export const H1 = styled.h1({
  ...textStyle,
  fontSize: '2rem',
  ...margin(24, 0),
});

export const H2 = styled.h2({
  ...textStyle,
  fontSize: '1.5rem',
  ...margin(18, 0),
});

export const Img = styled(LazyImage)({
  objectFit: 'cover',
  display: 'block',
});
export const CoverImg = styled(Img)({
  width: '100%',
  height: '100%',
  top: 0,
  position: 'absolute',
});
export const Button = styled.button({
  backgroundColor: '#1db954',
  borderRadius: 20,
  color: '#fff',
  border: 'none',
  outline: 'none',
  fontSize: '0.75rem',
  ...padding(10, 30),
  ...transitions('background 0.066s ease-in', 'transform 0.066s ease-in'),
  ':hover': {
    backgroundColor: '#1ed760',
    transform: 'scale(1.1)',
  },
});

export const Truncated = styled(Text)({
  display: 'block',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  minWidth: 0,
});
export const SubTruncated = styled(SubText)({
  display: 'block',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
});
