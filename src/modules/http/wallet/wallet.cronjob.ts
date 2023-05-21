import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { WalletRepository } from './wallet.repository';
import Decimal from 'decimal.js';

@Injectable()
export class WalletCronjob {
  private readonly logger = new Logger(WalletCronjob.name);

  constructor(private walletRepo: WalletRepository) {}

  @Cron(CronExpression.EVERY_DAY_AT_7AM, {
    name: 'logTotalTransactions',
    timeZone: 'Asia/Tehran',
  })
  async logTotalTransactions() {
    const amounts: { amount: Decimal }[] =
      await this.walletRepo.getTotalTransactionAmounts();

    // chatGpt
    const total = amounts.reduce(
      (acc, curr) => (curr.amount.isNegative() ? acc : acc.add(curr.amount)),
      new Decimal(0),
    );

    this.logger.log(`Total amount of transactions: ${total.toFixed(2)}`);
  }
}
