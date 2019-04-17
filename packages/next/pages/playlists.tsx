import React from 'react';
import Link from 'next/link';
import { ContentSpacing, Square, Grid, Cell, Img, A, Text } from '../shared/primitive';
import { playlistsR } from '../shared/resources';

import Nav from '../shared/components/Nav';
import { NextSFC } from 'next';
import styled from 'styled-components';
interface Props {
  playlists: any[];
}

const Img_ = styled(Img)({
  width: '100%',
  height: '100%',
  top: 0,
  position: 'absolute',
});

const Playlists: NextSFC<Props> = ({ playlists }) => (
  <ContentSpacing>
    <Nav />
    <Grid>
      {playlists.map(pl => (
        <Cell key={pl.id} width={[1 / 2, 1 / 3, 1 / 4, 1 / 6]} p={2}>
          <Link href={`/playlist?q=${pl.id}`} as={`/playlist/${pl.id}`}>
            <A>
              <Square>
                <Img_ src={pl.pic} />
              </Square>
              <Text>{pl.name}</Text>
            </A>
          </Link>
        </Cell>
      ))}
    </Grid>
  </ContentSpacing>
);

Playlists.getInitialProps = async () => {
  let res = await playlistsR.read(0);

  return { playlists: res };
};
export default Playlists;
