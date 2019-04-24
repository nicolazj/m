import { backgroundImages, padding } from 'polished';
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

interface Props {
  page: React.ReactNode;
  sidebar: React.ReactNode;
  player: React.ReactNode;
}
const LEFT = 200;
const BOTTOM = 100;
const UP = 50;

const BG_ = styled.div({
  width: '100%',
  height: '100vh',
  left: 0,
  top: 0,
  zIndex: -1,
  position: 'fixed',
  ...backgroundImages(
    'linear-gradient(to right bottom, rgb(47, 72, 106), rgb(0, 0, 0))',
    'linear-gradient(transparent, rgb(0, 0, 0) 70%)'
  ),
});

const LayoutCSS = createGlobalStyle({
  '#page': {
    flex: 1,
    ...padding(0, 0, BOTTOM, LEFT),
  },
  '#sidebar': {
    display: 'flex',
    position: 'fixed',
    height: '100%',
    width: LEFT,
    ...padding(0, 0, BOTTOM, 0),
  },
  '#player': {
    display: 'flex',
    position: 'fixed',
    bottom: 0,
    height: BOTTOM,
    width: '100%',
  },
  '@media (max-width: 768px)': {
    '#page': {
      flex: 1,
      ...padding(UP, 0, BOTTOM, 0),
    },
    '#sidebar': {
      height: UP,
      width: '100%',
      ...padding(0, 0, 0, 0),
    },
  },
});

const Layout: React.FC<Props> = ({ page, sidebar, player }) => {
  return (
    <>
      <LayoutCSS />
      <BG_ />
      <div id="page">{page}</div>
      <div id="sidebar"> {sidebar}</div>
      <div id="player"> {player}</div>
    </>
  );
};
export default Layout;
