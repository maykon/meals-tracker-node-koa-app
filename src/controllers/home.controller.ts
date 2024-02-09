import { type Context } from 'koa';

export const index = (ctx: Context) => {
  ctx.body = 'Meals Tracker - An amazing app to track the meals a user eats each day! 🍴';
};