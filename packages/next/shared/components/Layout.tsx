import React from 'react';
import styled from 'styled-components';
import { padding, backgroundImages } from 'polished';
import { useMedia } from 'use-media';
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

const Layout: React.FC<Props> = ({ page, sidebar, player }) => {
  const isWide = useMedia({ minWidth: 768 });
  const Sidebar_ = styled.div({
    position: 'fixed',
    height: isWide ? '100%' : UP,
    width: isWide ? LEFT : '100%',
    left: 0,
    ...padding(0, 0, isWide ? BOTTOM : 0, 0),
    display: 'flex',
  });
  const Player_ = styled.div({
    position: 'fixed',
    bottom: 0,
    height: BOTTOM,
    width: '100%',
    display: 'flex',
  });
  const Page_ = styled.div({
    flex: 1,
    ...padding(isWide ? 0 : UP, 0, BOTTOM, isWide ? LEFT : 0),
  });
  return (
    <>
      <BG_ />
      <Page_>{page}</Page_>
      <Sidebar_> {sidebar}</Sidebar_>

      <Player_> {player}</Player_>
    </>
  );
};
export default Layout;
