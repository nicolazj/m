import React from 'react';

import { T_Track } from '@m/shared/dist/types';
import { Img, Text, SubText, A, Square } from '../../primitive';
import Link from 'next/link';
import styled from 'styled-components';
import { padding } from 'polished';
import { implode } from '../../utils';

const TrackInfo_ = styled.div({
  display: 'flex',
  flexDirection: 'row',
  height: '100%',
});

const AlbumCover_ = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: 100,
});
const Img_ = styled(Img)({
  width: '100%',
  height: '100%',
  top: 0,
  position: 'absolute',
});

const SongInfo_ = styled.div({
  flex: 1,
  textAlign: 'left',
  height: '100%',

  ...padding(10),
});

const TrackInfo: React.FC<{ track?: T_Track }> = ({ track }) => {
  if (track === undefined) {
    return null;
  }
  return (
    <TrackInfo_>
      <AlbumCover_>
        <Link href={`/album?q=${track.song.album.id}`} as={`/artist/${track.song.album.id}`}>
          <A>
            <Square>
              <Img_ src={`//y.gtimg.cn/music/photo_new/T002R300x300M000${track.song.album.id}.jpg`} />
            </Square>
          </A>
        </Link>
      </AlbumCover_>
      <SongInfo_>
        <div>
          <Text>{track.song.name}</Text>
        </div>

        <div>
          {implode(
            i => (
              <SubText key={i}>, </SubText>
            ),
            track.song.singers.map(singer => (
              <Link key={singer.id} href={`/artist?q=${singer.id}`} as={`/artist/${singer.id}`}>
                <SubText as={A}>{singer.name}</SubText>
              </Link>
            ))
          )}
        </div>
      </SongInfo_>
    </TrackInfo_>
  );
};

export default TrackInfo;
