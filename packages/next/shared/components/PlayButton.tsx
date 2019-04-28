import { margin } from 'polished';
import React, { useContext } from 'react';
import styled from 'styled-components';

import { T_Song } from '@m/shared/dist/types';

import { Button } from '../primitive';
import { PlayerContext } from '../ctx/player';
interface Props {
  songs: T_Song[];
}

const Wrapper_ = styled.div({
  ...margin('1em'),
});
const PlayButton: React.FC<Props> = ({ songs }) => {
  const playerState = useContext(PlayerContext);

  const play = (songs: T_Song[]) => {
    playerState.player.playList(
      songs.map(song => ({
        vendor: 'qq',
        song,
      }))
    );
  };

  return (
    <Wrapper_>
      <Button onClick={() => play(songs)}>播放</Button>
    </Wrapper_>
  );
};

export default PlayButton;
