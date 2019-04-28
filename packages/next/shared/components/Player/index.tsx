import Link from 'next/link';
import { border, padding } from 'polished';
import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';

import player from '../../player';
import { Cell, Grid, Text } from '../../primitive';
import { fmtMSS } from '../../utils';
import Icon from '../Icon';
import Lyric from './Lyric';
import ProgressBar from './ProgressBar';
import TrackInfo from './TrackInfo';
import { PlayerContext } from '../../ctx/player';
const Player_ = styled.div({
  flex: 1,
  maxWidth: '100vw',
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
  width: 40,
  ...padding(0, 6),
});

const Progress_ = styled.div({
  flex: 1,
});

const Player = () => {
  const playerState = useContext(PlayerContext);

  const { duration, currentTime, playing, list, cur, player } = playerState;
  const track = cur > -1 ? list[cur] : undefined;

  return (
    <Player_>
      <Grid>
        <Cell width={[0, 1 / 4]} p={[0, 2]}>
          <TrackInfo track={track} />
        </Cell>
        <Cell width={[1, 1 / 2]}>
          <div>
            <Icon icon="prev" as={Button_} onClick={() => player!.skipBack()} />
            <Icon icon={playing ? 'pause' : 'play'} as={Button_} onClick={() => player!.pause()} />
            <Icon icon="next" as={Button_} onClick={() => player!.skipForward()} />
          </div>
          <TimeInfo_>
            <Time_>{fmtMSS(currentTime)}</Time_>
            <Progress_>
              <ProgressBar progress={duration ? currentTime / duration : 0} />
            </Progress_>
            <Time_>{fmtMSS(duration)}</Time_>
          </TimeInfo_>
          <Lyric track={track} currentTime={currentTime} />
        </Cell>
        <Cell width={[0, 1 / 4]} p={[0, 2]}>
          <Link href="/playing">
            <Icon icon="queue" as={Button_} />
          </Link>
        </Cell>
      </Grid>
    </Player_>
  );
};

export default Player;
