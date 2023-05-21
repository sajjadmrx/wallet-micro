import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from 'src/shared/interceptors/response.interceptor';
import { AddMoneyDto } from './dtos/addMoney.dto';
import { ApiAddMoney } from './docs/addMoney.doc';
import { ApiGetBalance } from './docs/getBalance.doc';
@ApiTags('Wallet')
@UseInterceptors(ResponseInterceptor)
@Controller('/wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @ApiAddMoney()
  @Put('/:userId/money')
  addMoney(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() data: AddMoneyDto,
  ) {
    return this.walletService.addMoney(userId, data.amount);
  }

  @ApiGetBalance()
  @Get('/:userId/balance')
  getUserBalance(@Param('userId', ParseIntPipe) userId: number) {
    return this.walletService.getUserBalance(userId);
  }
}
