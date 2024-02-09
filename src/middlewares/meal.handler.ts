import { type Context, type Next } from 'koa';
import Meal from '../entities/meal.model';

export const mealHandler = async (ctx: Context, next: Next) => {
  const { id: mealId, ateAt } = new Meal();
  // TODO: This header I add only to test an validation, can remove later
  const id = +ctx.params.id || +ctx.get('X-Meal-ID') || mealId;
  ctx.request.body = { ...(ctx.request.body || {}), id, ateAt, userId: ctx.state.userId };
  await next();
};