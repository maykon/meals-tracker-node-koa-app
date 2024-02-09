export enum MealType {
  breakfast = 'BreakFast',
  lunch = 'Lunch',
  dinner = 'Dinner',
  snack = 'Snack',
}

export default class Meal {
  private static counter: number = 0;

  readonly id: number;
  readonly ateAt: Date = new Date();
  type?: MealType;
  description?: string;
  userId?: number;

  constructor() {
    // TODO: Move this to repository class (DB responsability)
    Meal.counter += 1;
    this.id = Meal.counter;
  }
}
