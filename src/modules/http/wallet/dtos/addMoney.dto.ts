import { IsDecimal, IsNotEmpty, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddMoneyDto {
  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  amount: string;
}
