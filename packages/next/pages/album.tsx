import { NextSFC } from 'next/index';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

import SongList from '../shared/components/SongList';
import { ContentSpacing, H1, Img, SubText, Text, Grid, Cell, Square } from '../shared/primitive';
import { albumR } from '../shared/resources';
import { T_Album, T_Song } from '../shared/types';

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
    <Grid>
      <Cell width={[1, 1, 1, 1 / 3]}>
        <Square>
          <Img_ src={`//y.gtimg.cn/music/photo_new/T002R800x800M000${albumId}.jpg`} />
        </Square>
      </Cell>
      <Cell width={[1, 1, 1, 2 / 3]}>
        <SongList songs={album.songs} />
      </Cell>
    </Grid>
  </ContentSpacing>
);

Album.getInitialProps = async ({ query: { q } }) => {
  let res = await albumR.read(q);

  return { album: res, albumId: q };
};

export default Album;
