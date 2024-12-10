export class HttpError extends Error {
  constructor(message: string, public code: number) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}