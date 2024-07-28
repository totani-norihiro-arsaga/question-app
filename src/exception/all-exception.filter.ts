import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  HttpStatus,
  HttpException,
  Logger,
} from '@nestjs/common';
import { ValidationErrorResponse } from './dto/validation-error-response.dto';
import { Request, Response } from 'express';
import { InternalServerErrorResponse } from './dto/internal-server-error-response.dto';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger();

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof BadRequestException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse() as any;
      const validationErrorResponse: ValidationErrorResponse = {
        statusCode: status,
        error: 'Bad Request',
        message: exceptionResponse.message,
      };

      response.status(status).json(validationErrorResponse);
    }

    if (exception instanceof HttpException) {
      const logMessage = {
        timestamp: new Date().toISOString(),
        path: request.url,
        statusCode: exception.getStatus(),
        message: exception.message,
      };
      this.logger.error(logMessage, exception.stack);
    } else {
      const logMessage = {
        timestamp: new Date().toISOString(),
        path: request.url,
        message: exception,
      };
      this.logger.error(logMessage);
    }

    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const responseBody: InternalServerErrorResponse = {
      message: '何かがおかしいようです。時間をおいて改めて操作してください。',
      statusCode: status,
      error: 'Internal Server Response',
    };
    response.status(status).json(responseBody);
  }
}
