import React, { useEffect, useState } from 'react';

import { T_PlayerStatus } from '@m/shared/dist/types';

import SongList from '../shared/components/SongList';
import player from '../shared/player';
import { ContentSpacing, H1 } from '../shared/primitive';

const Playing = () => {
  const [playerState, setPlayerState] = useState(
    player
      ? player.state
      : {
          duration: 0,
          currentTime: 0,
          playing: false,
          list: [],
          cur: -1,
        }
  );

  useEffect(() => {
    const updater = (p: T_PlayerStatus) => {
      setPlayerState({ ...p });
    };
    let unsubscribe = player!.subscribe(updater);

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ContentSpacing>
      <H1>正在播放</H1>
      <SongList songs={playerState.list.map(track => track.song)} />
    </ContentSpacing>
  );
};

export default Playing;
