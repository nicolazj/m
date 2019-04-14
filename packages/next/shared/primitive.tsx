import styled from 'styled-components';
import { padding, margin } from 'polished';
import { Box, Flex } from '@rebass/grid';

export const Grid = styled(Flex).attrs({ justifyContent: 'flex-start', flexWrap: 'wrap' })({});
export const Cell = styled(Box).attrs({ p: 2 })({
  textAlign: 'center',
});

export const ContentSpacing = styled.div({
  ...padding(0, 24, 0, 24),
});

export const Square = styled.div({
  width: '100%',
  paddingTop: '100%',
  position: 'relative',
});

const textStyle = {
  color: '#fff',
  fontSize: 16,
  lineHeight: 1.7,
  fontFamily:
    '-apple-system, "Noto Sans", "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Noto Sans CJK SC", "Microsoft YaHei",  sans-serif;',
};

export const Text = styled.span(textStyle);
export const SubText = styled.span({
  ...textStyle,
  opacity: 0.6,
  '&:hover': {
    opacity: 1,
    textDecoration: 'underline',
    textUnderlinePosition: 'under',
  },
  fontSize: 14,
});

export const H1 = styled.h1({
  ...textStyle,
  fontSize: 36,
  ...margin(24, 0),
});

export const H2 = styled.h2({
  ...textStyle,
  fontSize: 24,
  ...margin(18, 0),
});

export const Img = styled.img({
  objectFit: 'cover',
  display: 'block',
});
