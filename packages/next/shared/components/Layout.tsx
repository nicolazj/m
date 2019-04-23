import React from 'react';
import styled from 'styled-components';
import { padding, backgroundImages } from 'polished';
interface Props {
  page: React.ReactNode;
  sidebar: React.ReactNode;
  player: React.ReactNode;
}
const LEFT = 200;
const BOTTOM = 100;

const Sidebar_ = styled.div({
  position: 'fixed',
  height: '100%',
  width: LEFT,
  left: 0,
  ...padding(0, 0, BOTTOM, 0),
  display: 'flex',
});
const Player_ = styled.div({
  position: 'fixed',
  bottom: 0,
  height: BOTTOM,
  width: '100%',
  display: 'flex',
});

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

const Page_ = styled.div({
  flex: 1,
  ...padding(0, 0, BOTTOM, LEFT),
});

const Layout: React.FC<Props> = ({ page, sidebar, player }) => {
  return (
    <>
      <BG_ />
      <Sidebar_> {sidebar}</Sidebar_>
      <Page_>{page}</Page_>
      <Player_> {player}</Player_>
    </>
  );
};
export default Layout;
