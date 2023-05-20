import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export function ApiGetBalance() {
  return applyDecorators(ApiOperation({ summary: 'get balance' }));
}
