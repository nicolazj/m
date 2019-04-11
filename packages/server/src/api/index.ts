import express from 'express';
import helmet from 'helmet';
import cat from '@m/shared/dist/cat';
const app = express();

app.use(helmet());

app.get('*', async (_, res) => {
  res.set('Content-Type', 'application/json');
  res.status(200).send({ hello: cat('wo', 'rld ~') });
});

module.exports = app;
