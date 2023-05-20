import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

export function ApiAddMoney() {
  return applyDecorators(
    ApiOperation({ summary: 'add Money' }),
    ApiOkResponse({
      schema: {
        example: {},
      },
    }),
    ApiNotFoundResponse({
      schema: {
        example: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'invalid amount',
        },
      },
    }),
  );
}
