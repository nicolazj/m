import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Img, Square, Text, Grid, Cell, A } from '../primitive';
import { T_Playlist } from '../types';

interface Props {
  playlists: T_Playlist[];
}

const Img_ = styled(Img)({
  width: '100%',
  height: '100%',
  top: 0,
  position: 'absolute',
});

const PlayListList: React.FC<Props> = ({ playlists }) => {
  return (
    <Grid>
      {playlists.map(playlist => (
        <Cell key={playlist.id} width={[1 / 2, 1 / 3, 1 / 4, 1 / 6]}>
          <Link
            href={`/playlist?q=${playlist.id}`}
            as={`/playlist/${playlist.id}`}
          >
            <A>
              <Square>
                <Img_ src={playlist.pic} />
              </Square>
              <Text>{playlist.name}</Text>
            </A>
          </Link>
        </Cell>
      ))}
    </Grid>
  );
};

export default PlayListList;
