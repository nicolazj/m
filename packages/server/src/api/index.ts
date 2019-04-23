import express from 'express';
import helmet from 'helmet';
const app = express();

app.use(helmet());

app.get('*', async (_, res) => {
  res.set('Content-Type', 'application/json');
  res.status(200).send({ hello: 'w' });
});

module.exports = app;
