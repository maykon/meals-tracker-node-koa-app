import request from 'supertest';
import { app } from '../../src/app';
import type Meal from '../../src/entities/meal.model';
import { MealType } from '../../src/entities/meal.model';

export const defaultMeal: Partial<Meal> = {
  type: MealType.breakfast,
  description: 'Bread and Cheese 🥪',
};

export const secondMeal: Partial<Meal> = {
  type: MealType.lunch,
  description: 'Mac and Cheese 🍝',
};

export const thirdMeal: Partial<Meal> = {
  type: MealType.lunch,
  description: 'Sushi 🍣',
};

export const fourthMeal: Partial<Meal> = {
  type: MealType.snack,
  description: 'Chocolate 🍫',
};

export const defaultUser = 10;

export const findAllMealsTest = async () => {
  return request(app.callback()).get('/meals');
};

export const findAllMealsByUserTest = async (userId: number) => {
  return request(app.callback())
    .get(`/meals/${userId}`)
    .set('X-User-ID', userId);
};

export const addMealTest = async (meal: Partial<Meal>, userId?: number) => {
  const req = request(app.callback()).post('/meals').send(meal);
  if (userId && userId > 0) {
    req.set('X-User-ID', userId);
  }
  if (meal.id) {
    req.set('X-Meal-ID', meal.id);
  }
  return req;
};

export const updateMealTest = async (meal: Partial<Meal>, userId?: number) => {
  const req = request(app.callback()).put(`/meals/${meal.id}`).send(meal);
  if (userId && userId > 0) {
    req.set('X-User-ID', userId);
  }
  return req;
};

export const containsMeal = (
  meals: Meal[],
  description: string = ''
): boolean => {
  return meals.some((meal) =>
    new RegExp(description, 'i').test(meal.description!)
  );
};
