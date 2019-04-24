import React from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import { H1 } from '../../primitive';
import Nav from './Nav';
const Sidebar_ = styled.div({
  flex: 1,
  display: 'flex',
  flexWrap: 'wrap',
  background: rgba(0, 0, 0, 0.8),
});
const D1 = styled.div({
  width: 150,
  height: 50,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
const D2 = styled.div({
  flex: 1,
  height: '100%',
});
const Sidebar = () => (
  <Sidebar_>
    <D1>
      <H1>Izumi</H1>
    </D1>
    <D2>
      <Nav />
    </D2>
  </Sidebar_>
);

export default Sidebar;
