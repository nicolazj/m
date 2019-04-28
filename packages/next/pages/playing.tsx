import React, { useContext } from 'react';

import { T_PlayerStatus } from '@m/shared/dist/types';

import SongList from '../shared/components/SongList';
import { ContentSpacing, H1 } from '../shared/primitive';
import { PlayerContext } from '../shared/ctx/player';
const Playing = () => {
  const playerState = useContext(PlayerContext);

  return (
    <ContentSpacing>
      <H1>正在播放</H1>
      <SongList songs={playerState.list.map(track => track.song)} />
    </ContentSpacing>
  );
};

export default Playing;
