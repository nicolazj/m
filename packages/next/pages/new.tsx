import React from 'react';
import Link from 'next/link';
import { ContentSpacing, Square, Grid, Cell, Img, A, Text } from '../shared/primitive';
import { newAlbumR } from '../shared/resources';

import Nav from '../shared/components/Nav';
import { NextSFC } from 'next';
import styled from 'styled-components';
import { T_Album } from '@m/shared/dist/types';
interface Props {
  albums: T_Album[];
}

const Img_ = styled(Img)({
  width: '100%',
  height: '100%',
  top: 0,
  position: 'absolute',
});

const New: NextSFC<Props> = ({ albums }) => (
  <ContentSpacing>
    <Nav />
    <Grid>
      {albums.map(album => (
        <Cell key={album.id} width={[1 / 2, 1 / 3, 1 / 4, 1 / 6]} p={2}>
          <Link href={`/album?q=${album.id}`} as={`/album/${album.id}`}>
            <A>
              <Square>
                <Img_ src={`//y.gtimg.cn/music/photo_new/T002R300x300M000${album.id}.jpg`} />
              </Square>
              <Text>{album.name}</Text>
            </A>
          </Link>
        </Cell>
      ))}
    </Grid>
  </ContentSpacing>
);

New.getInitialProps = async () => {
  let res = await newAlbumR.read(0);

  return { albums: res };
};
export default New;
