import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

import { Img, Square, Text, Grid, Cell, A, CoverImg } from '../primitive';
import { T_Artist } from '@m/shared/dist/types';

interface Props {
  artists: T_Artist[];
}

const ArtistList: React.FC<Props> = ({ artists }) => {
  return (
    <Grid justifyContent={'flex-start'} flexWrap={'wrap'}>
      {artists.map(artist => (
        <Cell key={artist.id} width={[1 / 2, 1 / 3, 1 / 4, 1 / 6]} p={2}>
          <Link href={`/artist?q=${artist.id}`} as={`/artist/${artist.id}`}>
            <A>
              <Square>
                <CoverImg
                  src={`//y.gtimg.cn/music/photo_new/T001R300x300M000${
                    artist.id
                  }.jpg`}
                />
              </Square>
              <Text>{artist.name}</Text>
            </A>
          </Link>
        </Cell>
      ))}
    </Grid>
  );
};

export default ArtistList;
