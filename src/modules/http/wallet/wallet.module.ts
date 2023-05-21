import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletRepository } from './wallet.repository';
import { WalletController } from './wallet.controller';
import { WalletCronjob } from './wallet.cronjob';

@Module({
  providers: [WalletService, WalletRepository, WalletCronjob],
  controllers: [WalletController],
})
export class WalletModule {}
