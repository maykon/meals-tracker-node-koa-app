import { type Context } from 'koa';
import MealService from '../services/meal.service';

export const allMeals = (ctx: Context) => {
  const service = new MealService();
  ctx.body = service.findAll();
};

export const mealsByUser = (ctx: Context) => {
  const service = new MealService();
  ctx.body = service.findAllByUser(ctx.params.id);
};

export const create = (ctx: Context) => {
  const service = new MealService();
  const meal = ctx.request.body;
  ctx.body = service.add(meal);
};

export const update = (ctx: Context) => {
  const service = new MealService();
  const meal = ctx.request.body;
  ctx.body = service.update(meal);
};