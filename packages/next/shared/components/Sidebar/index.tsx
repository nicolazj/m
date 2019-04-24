import React from 'react';
import styled from 'styled-components';
import { rgba, padding } from 'polished';
import { H1 } from '../../primitive';
import Nav from './Nav';
const Sidebar_ = styled.div({
  flex: 1,
  display: 'flex',
  flexWrap: 'wrap',
  background: rgba(0, 0, 0, 0.8),
});

const Sidebar = () => (
  <Sidebar_>
    <H1>Izumi</H1>
    <Nav />
  </Sidebar_>
);

export default Sidebar;
