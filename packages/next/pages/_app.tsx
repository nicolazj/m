import React from 'react';
import App, { Container, NextAppContext } from 'next/app';
import styled, { createGlobalStyle } from 'styled-components';
import { normalize, backgroundImages } from 'polished';

import Player from '../shared/components/Player';
import Sidebar from '../shared/components/Sidebar';
import { instance } from '../shared/agent';

const Normalize = createGlobalStyle`${normalize()}`;
const GlobalStyle = createGlobalStyle({
  '*': {
    boxSizing: 'border-box',
  },
  html: {
    width: '100%',
    height: '100%',
  },
  body: {
    width: '100%',
    height: '100%',
    overscrollBehavior: 'none',
  },
  '#__next': {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
});

const Main = styled.div({
  flex: 1,
  display: 'flex',
  ...backgroundImages(
    'linear-gradient(to right bottom, rgb(47, 72, 106), rgb(0, 0, 0))',
    'linear-gradient(transparent, rgb(0, 0, 0) 70%)'
  ),
});
const Page = styled.div({
  flex: 1,
  paddingBottom: 100,
});
const __DEV__ = process.env.NODE_ENV === 'development';

class MyApp extends App {
  static async getInitialProps(c: NextAppContext) {
    const { Component, ctx } = c;

    const { req } = ctx;
    if (req && !__DEV__) {
      instance.defaults.baseURL = `https://${req.headers.host}/api`;
    }
    let pageProps = {};

    if (Component.getInitialProps) {
      try {
        pageProps = await Component.getInitialProps(ctx);
      } catch (promise) {
        if (promise.then) {
          await promise;
          pageProps = await Component.getInitialProps(ctx);
        }
      }
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Normalize />
        <GlobalStyle />
        <Main>
          <Sidebar />
          <Page>
            <Component {...pageProps} />
          </Page>
        </Main>
        <Player />
      </Container>
    );
  }
}

export default MyApp;
