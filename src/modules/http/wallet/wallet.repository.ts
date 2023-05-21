import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Wallet } from '../../../shared/interfaces/wallet.interface';
import { getRandomString } from '../../../shared/utils/uuid.util';
import { Transaction } from '../../../shared/interfaces/transaction.interface';

@Injectable()
export class WalletRepository {
  constructor(private db: PrismaService) {}

  async findByOwnerId(ownerId: number): Promise<Wallet | null> {
    return this.db.wallet.findUnique({
      where: {
        ownerId,
      },
    });
  }

  async addMoney(
    ownerId: number,
    transactionAmount: number,
    amount: number,
  ): Promise<[Transaction, Wallet]> {
    return this.db.$transaction([
      this.db.transaction.create({
        data: {
          amount: transactionAmount,
          referenceId: getRandomString(11),
          wallet: {
            connect: {
              ownerId,
            },
          },
        },
      }),
      this.db.wallet.update({
        where: {
          ownerId,
        },
        data: {
          balance: amount,
        },
      }),
    ]);
  }
  async create(ownerId: number): Promise<Wallet> {
    return this.db.wallet.create({
      data: {
        ownerId,
      },
    });
  }
}
