import express from 'express';
import helmet from 'helmet';
import { parse } from 'url';
import qq from '../../../vendor/qq';

const app = express();

app.use(helmet());

app.get('*', async (_, res) => {
  const r = await qq.album.newest();

  res.set('Content-Type', 'application/json');
  res.status(200).send(r);
});

module.exports = app;
