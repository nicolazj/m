import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

import { Img, Square, Text, Grid, Cell, A } from '../primitive';
import { T_Artist } from '@m/shared/dist/types';

interface Props {
  artists: T_Artist[];
}

const Img_ = styled(Img)({
  width: '100%',
  height: '100%',
  top: 0,
  position: 'absolute',
  borderRadius: '50%',
});

const ArtistList: React.FC<Props> = ({ artists }) => {
  return (
    <Grid justifyContent={'flex-start'} flexWrap={'wrap'}>
      {artists.map(artist => (
        <Cell key={artist.id} width={[1 / 2, 1 / 3, 1 / 4, 1 / 6]} p={2}>
          <Link href={`/artist?q=${artist.id}`} as={`/artist/${artist.id}`}>
            <A>
              <Square>
                <Img_ src={`//y.gtimg.cn/music/photo_new/T001R300x300M000${artist.id}.jpg`} />
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
