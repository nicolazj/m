import express from 'express';
import helmet from 'helmet';
import qq from '../../../../vendor/qq';

const app = express();

app.use(helmet());

app.get('*', async (req, res) => {
  const data = await qq.cred();
  res.status(200).send(data);
});

module.exports = app;
