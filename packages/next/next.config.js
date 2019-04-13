const withTypescript = require('@zeit/next-typescript');
const ts = withTypescript();

module.exports = {
  ...ts,
  target: 'serverless',
};
