import { margin } from 'polished';
import React from 'react';
import styled from 'styled-components';

import { T_Song } from '@m/shared/dist/types';

import Player from '../player';
import { Button } from '../primitive';

interface Props {
  songs: T_Song[];
}

const Wrapper_ = styled.div({
  ...margin('1em'),
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
