import React, { useEffect } from 'react';
import Link from 'next/link';
import {
  ContentSpacing,
  Square,
  Grid,
  Cell,
  Img,
  A,
  Text,
  CoverImg,
} from '../shared/primitive';
import { playlistsR } from '../shared/resources';

import Nav from '../shared/components/Nav';
import { NextSFC } from 'next';
import styled from 'styled-components';
interface Props {
  playlists: any[];
}

const Playlists: NextSFC<Props> = ({ playlists }) => {
  useEffect(() => {
    playlistsR.write(playlists);
  }, []);
  return (
    <ContentSpacing>
      <Nav />
      <Grid>
        {playlists.map(pl => (
          <Cell key={pl.id} width={[1 / 2, 1 / 3, 1 / 4, 1 / 6]} p={2}>
            <Link href={`/playlist?q=${pl.id}`} as={`/playlist/${pl.id}`}>
              <A>
                <Square>
                  <CoverImg src={pl.pic} />
                </Square>
                <Text>{pl.name}</Text>
              </A>
            </Link>
          </Cell>
        ))}
      </Grid>
    </ContentSpacing>
  );
};
Playlists.getInitialProps = async () => {
  let res = await playlistsR.read();

  return { playlists: res };
};
export default Playlists;
