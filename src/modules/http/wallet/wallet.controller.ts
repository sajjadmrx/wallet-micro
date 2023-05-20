import { Controller, Get, Param, ParseIntPipe, Put } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { ApiGetBalance } from './docs/balance.doc';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Wallet')
@Controller('/wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @ApiGetBalance()
  @Get('/balance')
  getBalance(@Param('userId', ParseIntPipe) userId: number) {
    return 0;
  }

  @Put('/money')
  addMoney(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('amount', ParseIntPipe) amount: number,
  ) {
    return 0;
  }
}
