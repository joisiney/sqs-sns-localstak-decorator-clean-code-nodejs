export class BadRequestException extends Error {
  constructor(
    message: string,
    public readonly status = 400,
    public readonly error?: Error,
  ) {
    super(message);
  }
}
