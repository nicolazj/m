import { border, padding } from 'polished';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import player from '../../player';
import { Cell, Grid, Text, Img } from '../../primitive';
import { fmtMSS } from '../../utils';
import ProgressBar from './ProgressBar';
import TrackInfo from './TrackInfo';
import Icon from '../Icon';
const Player_ = styled.div({
  height: 100,
  position: 'fixed',
  bottom: 0,
  width: '100%',
  backgroundColor: '#282828',
  ...border('top', '1px', 'solid', '#000'),
});

const Button_ = styled.button({
  border: 'none',
  outline: 'none',
  background: 'none',
  width: 30,
  height: 30,
  color: '#b3b3b3',
  opacity: 0.8,
  ':hover': {
    opacity: 1,
  },
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
          playing: false,
          list: [],
          cur: -1,
        }
  );

  useEffect(() => {
    player!.subscribe(p => {
      setPlayerState({ ...p });
    });
  }, []);

  const { duration, currentTime, playing, list, cur } = playerState;
  const track = cur > -1 && list[cur];

  return (
    <Player_>
      <Grid>
        <Cell width={[1 / 3]}>
          <TrackInfo track={track} />
        </Cell>
        <Cell width={[1 / 3]}>
          <div>
            <Icon icon="prev" as={Button_} onClick={() => player!.skipBack()} />
            <Icon
              icon={playing ? 'pause' : 'play'}
              as={Button_}
              onClick={() => player!.pause()}
            />
            <Icon
              icon="next"
              as={Button_}
              onClick={() => player!.skipForward()}
            />
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
