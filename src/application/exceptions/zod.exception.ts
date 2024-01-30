export class ZodException extends Error {
  constructor(zodError: any, public readonly status = 400) {
    let msg = 'ZodException: unknown';
    if (zodError.errors.length > 0) {
      const error = zodError.errors[0];
      msg = error.message;
    }
    super(msg);
  }
}
