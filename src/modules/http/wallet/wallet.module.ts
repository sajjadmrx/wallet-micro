import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletRepository } from './wallet.repository';
import { WalletController } from './wallet.controller';

@Module({
  providers: [WalletService, WalletRepository],
  controllers: [WalletController],
})
export class WalletModule {}
