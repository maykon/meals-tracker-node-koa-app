import BadRequestError from './badRequest.error';

export default class MealCannotModifyError extends BadRequestError {
  constructor(message: string, options?: ErrorOptions) {
    message =
      message ||
      '⚠️ Meal cannot be modified. The meal was created after more than 1 minute!';
    super(message, options);
  }
}
