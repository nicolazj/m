import Document, {
  Head,
  Html,
  Main,
  NextDocumentContext,
  NextScript,
} from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: NextDocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta
            name="keywords"
            content="音乐,QQ音乐,在线听歌,音乐下载,音乐播放器,音乐网站,MV,巅峰榜,音乐排行榜,翻译歌曲,热门歌曲,经典老歌,无损音乐,无损曲库. 网易云音乐，音乐，播放器，网易，下载，播放，DJ，免费，明星，精选，歌单，识别音乐，收藏，分享音乐，音乐互动，高音质，320K，音乐社交，官网，music.163.com"
          />

          <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-138145876-1"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
        
          window.dataLayer = window.dataLayer || [];
          function gtag() {
            dataLayer.push(arguments);
          }
          gtag('js', new Date());

          gtag('config', 'UA-138145876-1');
        
        `,
            }}
          />
          <link rel="stylesheet" type="text/css" href="/static/css/font.css" />
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/css/nprogress.css"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1, user-scalable=no"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
