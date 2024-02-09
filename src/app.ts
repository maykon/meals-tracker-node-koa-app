import Koa from 'koa';
import logger from 'koa-logger';
import { koaBody } from 'koa-body';
import cors from '@koa/cors';
import routes from './routes';
import { errorHandler } from './middlewares/error.handler';
import { userHandler } from './middlewares/user.handler';

export const app = new Koa();

app.use(cors());
app.use(userHandler);
app.use(logger());
app.use(koaBody({ multipart: true }));
app.use(errorHandler);

app.use(routes);
