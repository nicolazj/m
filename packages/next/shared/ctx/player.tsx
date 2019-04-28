import React, { createContext, useEffect, useState } from 'react';

import { T_PlayerStatus } from '@m/shared/dist/types';

const defaultState: T_PlayerStatus = {
  duration: 0,
  currentTime: 0,
  playing: false,
  list: [],
  cur: -1,
};
export const PlayerContext = createContext(defaultState);

const Provider: React.FC = ({ children }) => {
  const [playerState, setPlayerState] = useState(defaultState);

  useEffect(() => {
    import('../player').then(({ default: Player }) => {
      const player = new Player();
      player.subscribe(p => {
        setPlayerState({ ...p, player });
      });
    });
  }, []);
  return <PlayerContext.Provider value={playerState}>{children}</PlayerContext.Provider>;
};

export default Provider;
