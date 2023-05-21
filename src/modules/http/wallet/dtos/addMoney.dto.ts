import { IsDecimal, IsNotEmpty, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddMoneyDto {
  @ApiProperty({
    example: '1000',
  })
  @IsNumberString()
  @IsNotEmpty()
  amount: string;
}
