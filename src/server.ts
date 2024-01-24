import { router } from '@/infra/routes';
import * as express from 'express';

const app = express();

app.use(express.json());
app.use(router);

app.listen(3001, () => {
  console.log('Running on port 3001');
});
