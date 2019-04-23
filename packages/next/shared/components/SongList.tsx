import React from 'react';

import { SubText, Text, A } from '../primitive';
import { T_Song } from '@m/shared/dist/types';
import styled from 'styled-components';
import { padding, rgba } from 'polished';
import Player from '../player';
import Link from 'next/link';
import { implode } from '../utils';
interface Props {
  songs: T_Song[];
}

const Song_ = styled.div({
  ...padding(10),
  textAlign: 'left',
  ':hover': {
    backgroundColor: rgba(0, 0, 0, 0.3),
  },
});
const play = (song: T_Song) => {
  Player!.play({ vendor: 'qq', song });
};
const SongList: React.FC<Props> = ({ songs }) => {
  return (
    <div>
      {songs.map(song => (
        <Song_ key={song.id} onDoubleClick={() => play(song)}>
          <div>
            <Text>{song.name}</Text>
          </div>
          <div>
            {implode(
              i => (
                <SubText key={i}>, </SubText>
              ),
              song.singers.map(singer => (
                <Link key={singer.id} href={`/artist?q=${singer.id}`} as={`/artist/${singer.id}`}>
                  <SubText as={A}>{singer.name}</SubText>
                </Link>
              ))
            )}
            <SubText> • </SubText>
            <Link href={`/album?q=${song.album.id}`} as={`/album/${song.album.id}`}>
              <SubText as={A}>「 {song.album.name} 」</SubText>
            </Link>
          </div>
        </Song_>
      ))}
    </div>
  );
};

export default SongList;
