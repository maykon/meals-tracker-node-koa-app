import Meal from '../entities/meal.model';
import { BadRequestError } from '../errors';
import { MealCannotModifyError } from '../errors';
import { MealNotFoundError } from '../errors';
import MealRepository from '../repositories/meal.repository';

export default class MealService {
  repository = new MealRepository();

  findAll(): Meal[] {
    return this.repository.findAll();
  }

  findAllByUser(userId: number): Meal[] {
    return this.repository.findAllByUser(userId);
  }

  protected validateMeal(meal: Meal): void {
    if (!meal.type) {
      throw new BadRequestError('⚠️ Meal type is required!');
    }
    if (!meal.description?.trim().length) {
      throw new BadRequestError('⚠️ Meal description is required!');
    }
  }

  add(meal: Meal): Meal {
    this.validateMeal(meal);
    return this.repository.add(meal);
  }

  update(meal: Meal): Meal {
    const mealModel = this.repository.findById(meal.id);
    if (!mealModel) {
      throw new MealNotFoundError();
    }
    // TODO: Maybe can move this rule to the entity later
    const mealTime = mealModel.ateAt.getTime();
    const now = new Date().getTime();
    if (now > mealTime + 60 * 1000) {
      throw new MealCannotModifyError();
    }
    return this.repository.update(meal);
  }
}
