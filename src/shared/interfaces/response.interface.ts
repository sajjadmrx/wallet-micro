import { HttpStatus } from '@nestjs/common';

export interface ResponseFormat<T> {
  statusCode: HttpStatus;
  data: T;
}
