import React, { useEffect, useState } from 'react';

import { T_Track } from '../../player/player';
import { Text } from '../../primitive';
import styled from 'styled-components';
import agent from '../../agent';
import { T_Lyric } from '../../types';
import { useTransition, animated } from 'react-spring';
const Lyric_ = styled.div({
  height: '100%',
  overflow: 'hidden',
  position: 'relative',
});

const Div_ = animated(
  styled.div({
    position: 'absolute',
    width: '100%',
  })
);
const Lyric: React.FC<{ track?: T_Track; currentTime: number }> = ({
  track,
  currentTime,
}) => {
  const [lyric, setLyric] = useState<T_Lyric>({ lines: [] } as T_Lyric);
  useEffect(() => {
    let canceled = false;

    const getLyric = async (q: string) => {
      const data: T_Lyric = await agent.lyric.by_id(q);
      if (!canceled) {
        setLyric({ ...data, lines: data.lines.reverse() });
      }
    };

    track && getLyric(track.song.id);

    return () => {
      canceled = true;
    };
  }, [track]);

  const line = lyric.lines.find(line => line.time < currentTime) || {
    time: 0,
    text: '',
  };

  const transitions = useTransition(line, item => item.time, {
    from: { transform: 'translateY(100%)' },
    enter: { transform: 'translateY(0%)' },
    leave: { transform: 'translateY(-100%)' },
  });

  if (track === undefined || lyric === undefined) {
    return null;
  }
  if (!line) return null;

  return (
    <Lyric_>
      {transitions.map(({ item, props, key }) => (
        <Div_
          key={key}
          style={{
            ...props,
          }}
        >
          <Text>{item.text}</Text>
        </Div_>
      ))}
    </Lyric_>
  );
};

export default Lyric;
