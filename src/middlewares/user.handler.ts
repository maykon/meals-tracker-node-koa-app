import { type Context, type Next } from 'koa';

export const userHandler = async (ctx: Context, next: Next) => {
  // TODO: This simulate an user authenticate because don't know who user is adding or searching some meals
  ctx.state.userId = +ctx.request.get('X-User-ID') || (Math.floor(Math.random() * 100)) + 1;
  await next();
};