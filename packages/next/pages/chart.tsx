import { NextSFC } from 'next/index';
import { margin } from 'polished';
import React from 'react';

import SongList from '../shared/components/SongList';
import Player from '../shared/player';
import { Button, Cell, ContentSpacing, Grid, H1, Img, Square } from '../shared/primitive';
import { playlistR } from '../shared/resources';
import { T_Song } from '../shared/types';
import styled from 'styled-components';

const Img_ = styled(Img)({
  width: '100%',
  position: 'absolute',
  top: 0,
});

const play = (songs: T_Song[]) => {
  Player!.setListAndPlay(
    songs.map((song: any) => ({
      vendor: 'qq',
      id: song.id,
      name: song.name,
    }))
  );
};
interface Props {
  songs: T_Song[];
  name: string;
  pic: string;
}
const Chart: NextSFC<Props> = ({ songs, name, pic }) => (
  <ContentSpacing>
    <Grid>
      <Cell width={[1, 1, 1, 1 / 3]}>
        <Square>
          <Img_ src={pic} />
        </Square>
        <H1>{name}</H1>
        <div css={{ ...margin(20) }}>
          <Button onClick={() => play(songs)}>播放</Button>
        </div>
      </Cell>
      <Cell width={[1, 1, 1, 2 / 3]}>
        <SongList songs={songs} />
      </Cell>
    </Grid>
  </ContentSpacing>
);

Chart.getInitialProps = async ({ query: { q } }) => {
  let res = await playlistR.read(q);

  return res;
};

export default Chart;
