import Link from 'next/link';
import { padding, rgba } from 'polished';
import React from 'react';
import styled from 'styled-components';

import { T_Song } from '@m/shared/dist/types';

import getPlayer from '../player';
import { A, SubText, Text } from '../primitive';
import { implode } from '../utils';
import Icon from './Icon';

interface Props {
  songs: T_Song[];
}

const Song_ = styled.div({
  ...padding(10),
  textAlign: 'left',
  position: 'relative',
  ':hover': {
    backgroundColor: rgba(0, 0, 0, 0.3),
  },
});
const SongMain_ = styled.div({
  paddingLeft: 40,
});
const PlayIcon = styled.button({
  border: 'none',
  outline: 'none',
  background: 'none',
  padding: 0,
  width: 40,
  height: 40,
  color: '#fff',
  opacity: 0.6,
  position: 'absolute',
  ':hover': {
    opacity: 1,
    cursor: 'pointer',
    transform: 'scale(1.2)',
  },
});
const play = (song: T_Song) => {
  getPlayer().play({ vendor: 'qq', song });
};
const SongList: React.FC<Props> = ({ songs }) => {
  return (
    <div>
      {songs.map(song => (
        <Song_ key={song.id} onDoubleClick={() => play(song)}>
          <Icon icon="track" as={PlayIcon} onClick={() => play(song)} />

          <SongMain_>
            <div>
              <Text>{song.name}</Text>
            </div>
            <div>
              {implode(
                i => (
                  <SubText key={i}>, </SubText>
                ),
                song.singers.map(singer => (
                  <Link
                    key={singer.id}
                    href={`/artist?q=${singer.id}`}
                    as={`/artist/${singer.id}`}
                  >
                    <SubText as={A}>{singer.name}</SubText>
                  </Link>
                ))
              )}
              <SubText> • </SubText>
              <Link
                href={`/album?q=${song.album.id}`}
                as={`/album/${song.album.id}`}
              >
                <SubText as={A}>「 {song.album.name} 」</SubText>
              </Link>
            </div>
          </SongMain_>
        </Song_>
      ))}
    </div>
  );
};

export default SongList;
