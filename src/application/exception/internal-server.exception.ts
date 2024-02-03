export class InternalException extends Error {
  constructor(
    message: string,
    public readonly status = 500,
    public readonly error?: Error,
  ) {
    super(message);
  }
}
