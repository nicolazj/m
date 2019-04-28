import Link from 'next/link';
import { padding } from 'polished';
import React from 'react';
import styled from 'styled-components';

import { T_Track } from '@m/shared/dist/types';

import { A, Img, Square, SubText, SubTruncated, Truncated } from '../../primitive';
import { implode } from '../../utils';

const TrackInfo_ = styled.div({
  display: 'flex',
  flexDirection: 'row',
  height: '100%',
});

const AlbumCover_ = styled.div({
  height: '100%',
  width: 80,
});
const Img_ = styled(Img)({
  height: '100%',
  width: '100%',
  position: 'absolute',
  top: 0,
});

const SongInfo_ = styled.div({
  flex: 1,
  textAlign: 'left',
  height: '100%',
  minWidth: 0,
  ...padding(10),
});

const SongInfoSection_ = styled.div({});

const TrackInfo: React.FC<{ track?: T_Track }> = ({ track }) => {
  if (track === undefined) {
    return null;
  }
  return (
    <TrackInfo_>
      <AlbumCover_>
        <Link
          href={`/album?q=${track.song.album.id}`}
          as={`/artist/${track.song.album.id}`}
        >
          <A>
            <Square>
              <Img_
                src={`//y.gtimg.cn/music/photo_new/T002R300x300M000${
                  track.song.album.id
                }.jpg`}
              />
            </Square>
          </A>
        </Link>
      </AlbumCover_>
      <SongInfo_>
        <SongInfoSection_>
          <Truncated>{track.song.name}</Truncated>
        </SongInfoSection_>

        <SongInfoSection_>
          {implode(
            i => (
              <SubText key={i}>, </SubText>
            ),
            track.song.singers.map(singer => (
              <Link
                key={singer.id}
                href={`/artist?q=${singer.id}`}
                as={`/artist/${singer.id}`}
              >
                <SubText as={A}>{singer.name}</SubText>
              </Link>
            ))
          )}
        </SongInfoSection_>
        <SongInfoSection_>
          <Link
            key={track.song.album.id}
            href={`/album?q=${track.song.album.id}`}
            as={`/album/${track.song.album.id}`}
          >
            <SubTruncated as={A}> {track.song.album.name} </SubTruncated>
          </Link>
        </SongInfoSection_>
      </SongInfo_>
    </TrackInfo_>
  );
};

export default TrackInfo;
