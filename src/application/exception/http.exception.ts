export class HttpException extends Error {
  constructor(
    message: string,
    public readonly status = 404,
    public readonly error?: Error,
  ) {
    super(message);
  }
}
