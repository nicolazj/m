import React from 'react';

import { SubText, Text } from '../primitive';
import { T_Song } from '../types';
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
  ':hover': {
    backgroundColor: rgba(0, 0, 0, 0.3),
  },
});
const play = (song: T_Song) => {
  Player!.AddAndPlay({ vendor: 'qq', id: song.id, name: song.name });
};
const SongList: React.FC<Props> = ({ songs }) => {
  return (
    <div>
      {songs.map(song => (
        <Song_ key={song.id} onClick={() => play(song)}>
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
                  <SubText as="a">{singer.name}</SubText>
                </Link>
              ))
            )}

            <SubText> • </SubText>
            <SubText>「 {song.album.name} 」</SubText>
          </div>
        </Song_>
      ))}
    </div>
  );
};

export default SongList;
