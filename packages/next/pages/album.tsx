import NextSeo from 'next-seo';
import { NextSFC } from 'next/index';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

import PlayButton from '../shared/components/PlayButton';
import SongList from '../shared/components/SongList';
import { A, Cell, ContentSpacing, Grid, H1, Img, Square, SubText } from '../shared/primitive';
import { albumR } from '../shared/resources';
import { T_Album } from '@m/shared/dist/types';

interface Props {
  album: T_Album;
  albumId: string;
}

const Img_ = styled(Img)({
  width: '100%',
  position: 'absolute',
  top: 0,
});

const Album: NextSFC<Props> = ({ album, albumId }) => (
  <ContentSpacing>
    <NextSeo
      config={{
        title: `${album.name} - ${album.singer.name}`,
        description: album.desc,
      }}
    />
    <Grid>
      <Cell width={[1, 1, 1, 1 / 3]}>
        <Grid>
          <Cell width={[1 / 2, 1 / 2, 1 / 2, 1]}>
            <Square>
              <Img_ src={`//y.gtimg.cn/music/photo_new/T002R800x800M000${albumId}.jpg`} />
            </Square>
          </Cell>
          <Cell width={[1 / 2, 1 / 2, 1 / 2, 1]}>
            <H1>{album.name}</H1>
            <Link href={`/artist?q=${album.singer.id}`} as={`/artist/${album.singer.id}`}>
              <SubText as={A}>{album.singer.name}</SubText>
            </Link>
            <PlayButton songs={album.songs} />
          </Cell>
        </Grid>
      </Cell>
      <Cell width={[1, 1, 1, 2 / 3]}>
        <SongList songs={album.songs} />
      </Cell>
    </Grid>
  </ContentSpacing>
);

Album.getInitialProps = async ({ query: { q } }) => {
  let res = await albumR.read(q);

  return { album: res, albumId: q ? q.toString() : '' };
};

export default Album;
