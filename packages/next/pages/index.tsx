import Link from 'next/link';
import { linearGradient, padding } from 'polished';
import React from 'react';
import styled from 'styled-components';

import Nav from '../shared/components/Nav';
import { A, Cell, ContentSpacing, Grid, H1, H2, Square } from '../shared/primitive';

const charts = [
  {
    name: '推荐榜单',
    list: [
      { name: '流行', id: 4 },
      { name: '热歌', id: 26 },
      { name: '新歌', id: 27 },
    ],
  },
  {
    name: '地区榜',
    list: [
      { name: '内地', id: 5 },
      { name: '港台', id: 6 },
      { name: '欧美', id: 3 },
      { name: '韩国', id: 16 },
      { name: '日本', id: 17 },
    ],
  },
  {
    name: '特色榜',
    list: [
      { name: '抖音排行榜', id: 60 },
      { name: '网络歌曲榜', id: 28 },
      { name: '电音榜', id: 57 },
      { name: '影视金曲榜', id: 29 },
      { name: '腾讯音乐人原创榜', id: 52 },
      { name: ' K歌金曲榜', id: 36 },
      { name: '说唱榜', id: 58 },
    ],
  },
  {
    name: '全球榜',
    list: [
      { name: '美国公告牌榜', id: 108 },
      { name: '美国iTunes榜', id: 123 },
      { name: '韩国Mnet榜', id: 106 },
      { name: '英国UK榜', id: 107 },
      { name: '日本公信榜', id: 105 },
      { name: '香港电台榜', id: 113 },
      { name: '香港商台榜', id: 114 },
      { name: '台湾Hito中文榜', id: 103 },
    ],
  },
];

const FancyBox = styled.div({
  position: 'absolute',
  top: 0,
  width: '100%',
  height: '100%',
  ...padding('1rem'),
  ...linearGradient({
    colorStops: ['#8360c3', ' #2ebf91'],
    toDirection: 'to  right bottom',
    fallback: '#f12711',
  }),
});

const H2_ = styled(H2)({
  margin: 0,
});
export default () => (
  <ContentSpacing>
    <Nav />
    {charts.map(chart => (
      <section key={chart.name}>
        <H1>{chart.name}</H1>
        <Grid>
          {chart.list.map(c => (
            <Cell key={c.id} width={[1 / 2, 1 / 3, 1 / 4, 1 / 5]}>
              <Square>
                <Link href={`/chart?q=${c.id}`} as={`/chart/${c.id}`}>
                  <A>
                    <FancyBox>
                      <H2_> {c.name}</H2_>
                    </FancyBox>
                  </A>
                </Link>
              </Square>
            </Cell>
          ))}
        </Grid>
      </section>
    ))}
  </ContentSpacing>
);
