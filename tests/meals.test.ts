import { meals } from '../src/repositories/meal.repository';
import Meal, { MealType } from '../src/entities/meal.model';
import {
  addMealTest,
  containsMeal,
  defaultMeal,
  defaultUser,
  findAllMealsByUserTest,
  findAllMealsTest,
  fourthMeal,
  secondMeal,
  thirdMeal,
  updateMealTest,
} from './utils/meal.utils';

describe('Meals Controller', () => {
  beforeEach(() => {
    meals.splice(0, meals.length);
  });

  beforeAll(() => {
    jest.useRealTimers();
  });

  it('Should be able to see an empty list of the public meals', async function () {
    const response = await findAllMealsTest();
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('Should be able to add a specific meal', async function () {
    const response = await addMealTest(defaultMeal, defaultUser);
    const meal = response.body;
    expect(response.status).toBe(200);
    expect(meal.id).toBe(1);
    expect(meal.userId).toBe(10);
    expect(meal.type).toBe(MealType.breakfast);
    expect(meal.description).toBe('Bread and Cheese 🥪');
    expect(meal.ateAt).toBeDefined();
  });

  it('Should not be able to add a meals without type', async () => {
    const response = await addMealTest(
      {
        description: 'Croissant 🥐',
      } as Partial<Meal>,
      defaultUser
    );

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('⚠️ Meal type is required!');
  });

  it('Should not be able to add a meal without description', async () => {
    const response = await addMealTest(
      {
        type: MealType.breakfast,
      } as Partial<Meal>,
      defaultUser
    );

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('⚠️ Meal description is required!');
  });

  it('Should not be able to add a meal with the same id', async () => {
    const { body: meal } = await addMealTest(defaultMeal, defaultUser);
    const response = await await addMealTest(meal, defaultUser);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('⚠️ Meal already created!');
  });

  it('Should be able to see a list of the public meals', async () => {
    await addMealTest(defaultMeal, defaultUser);
    await addMealTest(secondMeal);
    await addMealTest(thirdMeal, defaultUser);
    await addMealTest(fourthMeal);

    const response = await findAllMealsTest();
    const meals = response.body;
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(4);
    expect(containsMeal(meals, 'Bread')).toBeTruthy();
    expect(containsMeal(meals, 'Mac')).toBeTruthy();
    expect(containsMeal(meals, 'Sushi')).toBeTruthy();
    expect(containsMeal(meals, 'Chocolate')).toBeTruthy();
  });

  it('Should be able to see only my list of the meals', async () => {
    await addMealTest(defaultMeal, defaultUser);
    await addMealTest(secondMeal);
    await addMealTest(thirdMeal, defaultUser);
    await addMealTest(fourthMeal);

    const response = await findAllMealsByUserTest(defaultUser);
    const meals = response.body;
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(containsMeal(meals, 'Bread')).toBeTruthy();
    expect(containsMeal(meals, 'Sushi')).toBeTruthy();
  });

  it('Should be able to update a meals when created before 1 minute', async () => {
    const { body: meal } = await addMealTest(defaultMeal, defaultUser);
    await updateMealTest(
      {
        ...meal,
        description: 'Croissant 🥐',
      } as Partial<Meal>,
      defaultUser
    );

    const response = await findAllMealsByUserTest(defaultUser);
    const meals = response.body;
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(containsMeal(meals, 'Croissant')).toBeTruthy();
  });

  it('Should not be able to update a meals if not exists', async () => {
    const response = await updateMealTest(
      {
        id: 1,
        type: MealType.breakfast,
        description: 'Croissant 🥐',
      } as Partial<Meal>,
      defaultUser
    );

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('⚠️ Meal Not Found!');
  });

  it('Should not be able to update a meals if was created more than 1 minute ago', async () => {
    const { body: meal }: { body: Meal } = await addMealTest(
      defaultMeal,
      defaultUser
    );
    jest.useFakeTimers({ advanceTimers: true });
    const moreThanMinutePass = new Date(Date.now() + 90 * 1000);
    jest.setSystemTime(moreThanMinutePass.getTime());

    const response = await updateMealTest(
      {
        ...meal,
        description: 'Croissant 🥐',
      } as Partial<Meal>,
      defaultUser
    );

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      '⚠️ Meal cannot be modified. The meal was created after more than 1 minute!'
    );
  });
});
