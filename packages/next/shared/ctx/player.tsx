import React, { createContext, useEffect, useState } from 'react';
import { T_PlayerStatus } from '@m/shared/dist/types';

import getPlayer from '../player';
const defaultState: T_PlayerStatus = {
  duration: 0,
  currentTime: 0,
  playing: false,
  list: [],
  cur: -1,
};
export const PlayerContext = createContext<T_PlayerStatus>(defaultState);

const Provider: React.FC = ({ children }) => {
  const [playerState, setPlayerState] = useState<T_PlayerStatus>(defaultState);

  useEffect(() => {
    const player = getPlayer();
    const unsub = player.subscribe(p => {
      setPlayerState({ ...p });
    });
    return () => {
      unsub();
    };
  }, []);
  return <PlayerContext.Provider value={playerState}>{children}</PlayerContext.Provider>;
};

export default Provider;
