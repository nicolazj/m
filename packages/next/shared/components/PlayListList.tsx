import React from 'react';
import Link from 'next/link';
import { Square, Text, Grid, Cell, A, CoverImg } from '../primitive';
import { T_Playlist } from '@m/shared/dist/types';

interface Props {
  playlists: T_Playlist[];
}

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
                <CoverImg src={playlist.pic} />
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
