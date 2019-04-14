import React from 'react';
import styled from 'styled-components';

import { Img, Square, Text, Grid, Cell } from '../primitive';
import { T_Album } from '../types';

interface Props {
  albums: T_Album[];
}

const Img_ = styled(Img)({
  width: '100%',
  height: '100%',
  top: 0,
  position: 'absolute',
});

const AlbumList: React.FC<Props> = ({ albums }) => {
  return (
    <Grid>
      {albums.map(album => (
        <Cell key={album.id} width={[1 / 2, 1 / 3, 1 / 4, 1 / 6]}>
          <Square>
            <Img_ src={`//y.gtimg.cn/music/photo_new/T002R300x300M000${album.id}.jpg`} />
          </Square>
          <Text center>{album.name}</Text>
        </Cell>
      ))}
    </Grid>
  );
};

export default AlbumList;
