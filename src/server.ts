import * as routes from '@/infra/routes';
import express from 'express';
import 'express-async-errors';

const app = express();

app.use(express.json());

Object.values(routes).forEach((router) => {
  app.use(router);
});

app.listen(3001, () => {
  console.log('Running on port 3001');
});
