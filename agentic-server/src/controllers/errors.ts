export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}

export class ValidationError extends AppError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

export class UpstreamLlmError extends AppError {
  constructor(message: string) {
    super(message, 502);
  }
}
