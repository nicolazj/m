import React from 'react';
import { T_Song } from '@m/shared/dist/types';
import { Button } from '../primitive';
import Player from '../player';
import styled from 'styled-components';
import { margin } from 'polished';

interface Props {
  songs: T_Song[];
}

const Wrapper_ = styled.div({
  ...margin(20),
});
const PlayButton: React.FC<Props> = ({ songs }) => {
  const play = (songs: T_Song[]) => {
    Player!.playList(
      songs.map(song => ({
        vendor: 'qq',
        song,
      }))
    );
  };
  return (
    <Wrapper_>
      <Button onClick={() => play(songs)}>播放</Button>{' '}
    </Wrapper_>
  );
};

export default PlayButton;
