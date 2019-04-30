const withTypescript = require('@zeit/next-typescript');
const webpack = require('webpack');
const ts = withTypescript();

const withBuildId = f => (config, rest) => {
  const { buildId } = rest;
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.SENTRY_RELEASE': JSON.stringify(buildId),
    })
  );
  return f(config, rest);
};

module.exports = {
  ...ts,
  webpack: withBuildId(ts.webpack),
  target: 'serverless',
};
