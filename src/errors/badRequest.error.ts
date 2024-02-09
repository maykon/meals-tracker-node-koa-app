export default class BadRequestError extends Error {
  status: number;
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = 'Bad Request';
    this.message = message || '⚠️ Bad Request!';
    this.status = 400;
  }
}
