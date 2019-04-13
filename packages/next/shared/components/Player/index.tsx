import React from 'react';
import styled from 'styled-components';
import { border } from 'polished';

const Player_ = styled.div({
  height: 100,
  position: 'fixed',
  bottom: 0,
  width: '100%',
  display: 'flex',
  backgroundColor: '#282828',
  ...border('top', '1px', 'solid', '#000'),
});

const Player = () => {
  return <Player_>player</Player_>;
};

export default Player;
