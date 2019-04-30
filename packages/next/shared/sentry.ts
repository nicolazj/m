import * as Sentry from '@sentry/browser';
import * as http from 'http';

Sentry.init({
  dsn: 'https://f3d54638463a4531b937bad7d026c4ff@sentry.io/1449233',
});

const notifySentry = (
  err: any,
  pathname: string,
  query: any,
  statusCode?: number,
  req?: http.IncomingMessage
) => {
  Sentry.configureScope(scope => {
    if (!req) {
      scope.setTag(`ssr`, 'false');
    } else {
      scope.setTag(`ssr`, 'true');
      scope.setExtra(`pathname`, pathname);
      scope.setExtra(`query`, query);
      scope.setExtra(`statusCode`, statusCode);
    }
  });

  Sentry.captureException(err);
};

export default notifySentry;
