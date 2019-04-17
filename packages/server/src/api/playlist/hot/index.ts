import express from 'express';
import helmet from 'helmet';
import { parse } from 'url';
import qq from '../../../vendor/qq';

const app = express();

app.use(helmet());

app.get('*', async (req, res) => {
  const r = await qq.playlist.hot();

  res.set('Content-Type', 'application/json');
  res.status(200).send(r);
});

module.exports = app;
