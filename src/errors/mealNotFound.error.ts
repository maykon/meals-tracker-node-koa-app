export default class MealNotFoundError extends Error {
  status: number;
  constructor(message: string, options?: ErrorOptions) {
    message = message || '⚠️ Meal Not Found!';
    super(message, options);
    this.status = 404;
  }
}
