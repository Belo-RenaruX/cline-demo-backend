import { ZodError } from 'zod';

import { LoggerClient } from 'src/clients/logger/logger.client';
import { StatusCode } from '../enums/status.enum';

export class ErrorModel extends Error {
  private static readonly logger = LoggerClient.instance;
  readonly statusCode: StatusCode;

  constructor(
    statusCode: StatusCode,
    message = 'Custom handled error',
  ) {
    super(message);

    this.statusCode = statusCode;
  }

  static fromError(error: unknown): ErrorModel {
    switch (true) {
      case error instanceof ErrorModel:
        return error;

      case error instanceof ZodError:
        return this.generateFromZodError(error);

      case error instanceof Error:
        return this.generateInstanceAndLog(StatusCode.INTERNAL_SERVER_ERROR, error.message);

      default:
        return this.generateInstanceAndLog(StatusCode.INTERNAL_SERVER_ERROR, 'An unknown error occurred');
    }
  }

  static badRequest(options?: { message?: string }): ErrorModel {
    return this.generateInstanceAndLog(StatusCode.BAD_REQUEST, options?.message);
  }
  static notFound(options?: { message?: string }): ErrorModel {
    return this.generateInstanceAndLog(StatusCode.NOT_FOUND, options?.message);
  }
  static server(options?: { message?: string }): ErrorModel {
    return this.generateInstanceAndLog(StatusCode.INTERNAL_SERVER_ERROR, options?.message);
  }

  private static generateFromZodError(error: ZodError): ErrorModel {
    this.logger.error('Zod validation failed', { errors: error.issues });
    const validationDetails = error.issues.map((e) => `(${e.path.join('.') || 'root'}: ${e.message})`).join(', ');

    return this.generateInstanceAndLog(StatusCode.BAD_REQUEST, `Validation failed: ${validationDetails}`);
  }

  private static generateInstanceAndLog(
    statusCode: StatusCode,
    message?: string,
  ): ErrorModel {
    const errorInstance = new ErrorModel(statusCode, message);
    const callerLine = this.extractCallerFromStack(errorInstance.stack);

    this.logger.error(`ErrorModel catched error`, {
      statusCode: errorInstance.statusCode,
      message: errorInstance.message,
      callerLine,
    });

    return errorInstance;
  }

  private static extractCallerFromStack(stack?: string): string {
    if (!stack) return '';

    const lines = stack.split('\n');
    const callerLine = lines[3]?.trim();

    return callerLine;
  }
}
