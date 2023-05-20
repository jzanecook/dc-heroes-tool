import React from "react";
import Document, { Head, Html, Main, NextScript } from "next/document";
import Button from '@mui/material/Button';
import theme from "../lib/theme";
import createEmotionCache from "../lib/create-emotion-cache";
import createEmotionServer from "@emotion/server/create-instance";
import type * as CSS from 'csstype';

interface ExtraCSSTypes extends CSS.Properties {
  WebkitAppRegion?: string;
}

const titlebarStyle: ExtraCSSTypes = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "1.5rem",
  backgroundColor: "#000",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.75rem",
  zIndex: 1000,
  WebkitAppRegion: "drag",
}

const TitleBar = () => (
  <div style={titlebarStyle}>
    <span>DC Heroes Tool - Version Z.0.1</span>
    <Button sx={{
      position: "absolute",
      top: 0,
      right: 0,
      width: "1.5rem",
      minWidth: 'unset',
      borderRadius: 0,
      height: "1.5rem",
      backgroundColor: "#000",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "0.75rem",
      zIndex: 1000,
      WebkitAppRegion: "no-drag",
      padding: 0,
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
      }
    }} onClick={() => {
      const remote = (window.require) ? window.require('electron').remote : null;
      const WIN = remote.getCurrentWindow();
      WIN.close();
    }}>X</Button>
  </div>
)

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <body>
          <TitleBar />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const originalRenderPage = ctx.renderPage;

  // You can consider sharing the same Emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  // This is important. It prevents Emotion to render invalid HTML.
  // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};
