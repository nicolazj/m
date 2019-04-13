import React from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';

const Sidebar_ = styled.div({
  width: 200,
  background: rgba(0, 0, 0, 0.8),
});
const Sidebar = () => <Sidebar_>sidebar</Sidebar_>;

export default Sidebar;
