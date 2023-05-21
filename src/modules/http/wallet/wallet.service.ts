import { BadRequestException, Injectable } from '@nestjs/common';
import { WalletRepository } from './wallet.repository';
import { Wallet } from 'src/shared/interfaces/wallet.interface';
import Decimal from 'decimal.js';
@Injectable()
export class WalletService {
  constructor(private walletRepo: WalletRepository) {}

  async addMoney(userId: number, amount: string | Decimal) {
    try {
      let wallet: Wallet | null = await this.walletRepo.findByOwnerId(userId);
      if (!wallet) {
        wallet = await this.walletRepo.create(userId);
      }

      const transactionAmount = new Decimal(amount);

      let newAmount = wallet.balance.add(transactionAmount).toNumber();
      if (newAmount < 0) {
        throw new BadRequestException('invalid amount');
      }

      const [transaction, walletUpdated] = await this.walletRepo.addMoney(
        userId,
        transactionAmount.toNumber(),
        newAmount,
      );

      return { referenceId: transaction.referenceId };
    } catch (e) {
      throw e;
    }
  }
}
