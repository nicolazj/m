import { border, padding } from 'polished';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import player from '../../player';
import { Cell, Grid, Text } from '../../primitive';
import { fmtMSS } from '../../utils';
import ProgressBar from './ProgressBar';

const Player_ = styled.div({
  height: 100,
  position: 'fixed',
  bottom: 0,
  width: '100%',
  backgroundColor: '#282828',
  ...border('top', '1px', 'solid', '#000'),
});

const TimeInfo_ = styled.div({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
});

const Time_ = styled(Text)({
  fontSize: 12,
  ...padding(0, 6),
});

const Progress_ = styled.div({
  flex: 1,
});

const Player = () => {
  const [playerState, setPlayerState] = useState(
    player
      ? player.state
      : {
          duration: 0,
          currentTime: 0,
          playgin: false,
          list: [],
          cur: -1,
        }
  );

  useEffect(() => {
    player!.subscribe(p => {
      setPlayerState({ ...p });
    });
  }, []);

  const { duration, currentTime, playing } = playerState;

  return (
    <Player_>
      <Grid>
        <Cell width={[1 / 3]}>
          <div />
        </Cell>
        <Cell width={[1 / 3]}>
          <div>
            <button> {'<'} </button>
            <button onClick={() => player!.pause()}> {playing ? '||' : '|>'} </button>
            <button> {'>'} </button>
          </div>
          <TimeInfo_>
            <Time_>{fmtMSS(currentTime)}</Time_>
            <Progress_>
              <ProgressBar progress={duration ? currentTime / duration : 0} />
            </Progress_>
            <Time_>{fmtMSS(duration)}</Time_>
          </TimeInfo_>
        </Cell>
        <Cell width={[1 / 3]}>
          <div />
        </Cell>
      </Grid>
    </Player_>
  );
};

export default Player;
