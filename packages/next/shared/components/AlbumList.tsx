import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Img, Square, Text, Grid, Cell, A, CoverImg } from '../primitive';
import { T_Album } from '@m/shared/dist/types';

interface Props {
  albums: T_Album[];
}

const AlbumList: React.FC<Props> = ({ albums }) => {
  return (
    <Grid>
      {albums.map(album => (
        <Cell key={album.id} width={[1 / 2, 1 / 3, 1 / 4, 1 / 6]}>
          <Link href={`/album?q=${album.id}`} as={`/album/${album.id}`}>
            <A>
              <Square>
                <CoverImg
                  src={`//y.gtimg.cn/music/photo_new/T002R300x300M000${
                    album.id
                  }.jpg`}
                />
              </Square>
              <Text>{album.name}</Text>
            </A>
          </Link>
        </Cell>
      ))}
    </Grid>
  );
};

export default AlbumList;
