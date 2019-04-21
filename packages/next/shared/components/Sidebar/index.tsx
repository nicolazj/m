import React from 'react';
import styled from 'styled-components';
import { rgba, padding } from 'polished';
import { H1 } from '../../primitive';
import Nav from './Nav';
const Sidebar_ = styled.div({
  width: 200,
  background: rgba(0, 0, 0, 0.8),
  ...padding(24),
});
const Fixed_ = styled.div({
  position: 'fixed',
  top: 0,
});
const Sidebar = () => (
  <Sidebar_>
    <Fixed_>
      <H1>Izumi</H1>
      <Nav />
    </Fixed_>
  </Sidebar_>
);

export default Sidebar;
