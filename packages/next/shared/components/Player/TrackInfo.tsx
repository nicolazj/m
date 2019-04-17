import React from 'react';

import { T_Track } from '../../player/player';
import { Img, Text, SubText, A } from '../../primitive';
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
});
const Img_ = styled(Img)({
  height: 80,
  width: 80,
});

const SongInfo_ = styled.div({
  flex: 1,
  textAlign: 'left',
  height: '100%',

  ...padding(10),
});

const TrackInfo: React.FC<{ track: T_Track }> = ({ track }) => {
  return (
    track && (
      <TrackInfo_>
        <AlbumCover_>
          <Link href={`/album?q=${track.song.album.id}`} as={`/artist/${track.song.album.id}`}>
            <A>
              <Img_ src={`//y.gtimg.cn/music/photo_new/T002R300x300M000${track.song.album.id}.jpg`} />
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
    )
  );
};

export default TrackInfo;