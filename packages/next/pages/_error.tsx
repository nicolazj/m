import React from 'react';
import Error from 'next/error';
import { NextSFC } from 'next/index';
import notifySentry from '../shared/sentry';
interface Props {
  statusCode: number;
}
const MyError: NextSFC<Props> = ({ statusCode }) => {
  return (
    <p>
      {statusCode ? (
        <Error statusCode={statusCode} />
      ) : (
        'An error occurred on client'
      )}
    </p>
  );
};

MyError.getInitialProps = ({ req, pathname, query, res, err }) => {
  let statusCode: number | undefined;

  if (res) {
    statusCode = res.statusCode;
  }
  notifySentry(err, pathname, query, statusCode, req);

  return { statusCode };
};

export default MyError;
