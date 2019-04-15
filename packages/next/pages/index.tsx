import React from 'react';
import Link from 'next/link';
import { Flex, Box } from '@rebass/grid';
import { H1, H2, ContentSpacing, Square } from '../shared/primitive';
import styled from 'styled-components';
import { linearGradient, padding } from 'polished';

const charts = [
  {
    name: '推荐榜单',
    list: [{ name: '流行', id: 4 }, { name: '热歌', id: 26 }, { name: '新歌', id: 27 }],
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
      { name: ' 香港电台榜', id: 113 },
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
  ...padding(24),
  ...linearGradient({
    colorStops: ['#8360c3', ' #2ebf91'],
    toDirection: 'to  right bottom',
    fallback: '#f12711',
  }),
});
export default () => (
  <ContentSpacing>
    {charts.map(chart => (
      <section key={chart.name}>
        <H1>{chart.name}</H1>
        <Flex justifyContent={'flex-start'} flexWrap={'wrap'}>
          {chart.list.map(c => (
            <Box key={c.id} width={[1 / 2, 1 / 3, 1 / 4, 1 / 6]} p={2}>
              <Square>
                <Link href={`/chart?q=${c.id}`} as={`/chart/${c.id}`}>
                  <a>
                    <FancyBox>
                      <H2> {c.name}</H2>
                    </FancyBox>
                  </a>
                </Link>
              </Square>
            </Box>
          ))}
        </Flex>
      </section>
    ))}
  </ContentSpacing>
);
