import Meal from '../entities/meal.model';
import { BadRequestError } from '../errors';

// TODO: Add a real DB and not update externally this one
export let meals: Meal[] = [];

export default class MealRepository {
  findAll(): Meal[] {
    return meals;
  }

  findAllByUser(userId: number): Meal[] {
    return meals.filter((meal) => +meal.userId! === +userId);
  }

  findById(id: number): Meal | undefined {
    return meals.find((meal) => meal.id === id);
  }

  add(meal: Meal): Meal {
    // TODO: This rule probably can be removed after change to a real DB
    if (meals.some(({ id }) => id === meal.id)) {
      throw new BadRequestError('⚠️ Meal already created!');
    }
    meals.push(meal);
    return meal;
  }

  update(meal: Meal): Meal {
    meals = meals.map((feed) =>
      feed.id !== meal.id ? feed : { ...feed, ...meal }
    ) as Meal[];
    return meal;
  }
}
