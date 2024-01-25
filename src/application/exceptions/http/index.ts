export class HttpException extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly error?: Error,
  ) {
    super(message);
  }
}
