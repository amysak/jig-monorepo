import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from "@nestjs/common";
import type { Request, Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger("HttpFilter");

  catch(exception: HttpException, host: ArgumentsHost) {
    this.logger.error("=== exception === ");
    console.log(exception.getResponse());

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionObject = exception.getResponse() as {
      message: string | string[];
      statusCode: number;
      error: string;
    };

    response.status(status).json({
      statusCode: status,
      message: exceptionObject.message || exceptionObject || null,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
