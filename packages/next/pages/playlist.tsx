import NextSeo from 'next-seo';
import { NextSFC } from 'next/index';
import React from 'react';
import styled from 'styled-components';

import PlayButton from '../shared/components/PlayButton';
import SongList from '../shared/components/SongList';
import {
  Cell,
  ContentSpacing,
  Grid,
  H1,
  Img,
  Square,
} from '../shared/primitive';
import { playlistR } from '../shared/resources';
import { T_Song } from '../shared/types';

const Img_ = styled(Img)({
  width: '100%',
  position: 'absolute',
  top: 0,
});

interface Props {
  songs: T_Song[];
  desc: string;
  id: string;
  name: string;
  pic: string;
}
const Playlist: NextSFC<Props> = ({ songs, name, pic, desc }) => (
  <ContentSpacing>
    <NextSeo
      config={{
        title: `${name}`,
        description: desc,
      }}
    />
    <Grid>
      <Cell width={[1, 1, 1, 1 / 3]}>
        <Grid>
          <Cell width={[1 / 2, 1 / 2, 1 / 2, 1]}>
            <Square>
              <Img_ src={pic} />
            </Square>
          </Cell>
          <Cell width={[1 / 2, 1 / 2, 1 / 2, 1]}>
            <H1>{name}</H1>
            <PlayButton songs={songs} />
          </Cell>
        </Grid>
      </Cell>
      <Cell width={[1, 1, 1, 2 / 3]}>
        <SongList songs={songs} />
      </Cell>
    </Grid>
  </ContentSpacing>
);

Playlist.getInitialProps = async ({ query: { q } }) => {
  let res = await playlistR.read(q);

  return res;
};

export default Playlist;
