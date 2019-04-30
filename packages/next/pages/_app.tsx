import App, { Container, NextAppContext } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import { normalize } from 'polished';
import React from 'react';
import { createGlobalStyle } from 'styled-components';

import { _axios } from '../shared/agent';
import Layout from '../shared/components/Layout';
import Player from '../shared/components/Player';
import Sidebar from '../shared/components/Sidebar';
import { isClient, isDev } from '../shared/constants';
import PlayerProvider from '../shared/ctx/player';
import { captureException } from '../shared/sentry';

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', (url: string) => {
  (window as any).gtag('config', 'UA-101477606-1', { page_path: url });
  NProgress.done();
});
Router.events.on('routeChangeError', () => NProgress.done());

const Normalize = createGlobalStyle`${normalize()}`;
const GlobalStyle = createGlobalStyle({
  '*': {
    boxSizing: 'border-box',
  },
  html: {
    width: '100%',
    height: '100%',
    fontSize: 'calc(14px + (18 - 14) * ((100vw - 300px) / (1600 - 300)))',
    fontFamily:
      '-apple-system, "Noto Sans", "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Noto Sans CJK SC", "Microsoft YaHei",  sans-serif;',
  },
  body: {
    width: '100%',
    height: '100%',
  },
  '#__next': {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
});

const setAPIEndpoint = (c: NextAppContext) => {
  const { ctx } = c;
  const { req } = ctx;

  if (!isDev) {
    if (isClient) {
      _axios.defaults.baseURL = '/api';
    } else {
      _axios.defaults.baseURL = `https://${req!.headers.host}/api`;
    }
  }
};

class MyApp extends App {
  static async getInitialProps(c: NextAppContext) {
    const { Component, ctx } = c;
    setAPIEndpoint(c);

    let pageProps = {};

    if (Component.getInitialProps) {
      try {
        pageProps = await Component.getInitialProps(ctx);
      } catch (errorOrPromise) {
        if (errorOrPromise.then) {
          await errorOrPromise;
          pageProps = await Component.getInitialProps(ctx);
        } else {
          captureException(errorOrPromise, ctx);
        }
      }
    }

    return { pageProps };
  }

  componentDidCatch(error, errorInfo) {
    captureException(error, { errorInfo });
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Normalize />
        <GlobalStyle />
        <PlayerProvider>
          <Layout
            sidebar={<Sidebar />}
            player={<Player />}
            page={<Component {...pageProps} />}
          />
        </PlayerProvider>
      </Container>
    );
  }
}

export default MyApp;
