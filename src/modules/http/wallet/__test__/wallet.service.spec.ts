import { Wallet } from 'src/shared/interfaces/wallet.interface';
import { BadRequestException } from '@nestjs/common';
import { WalletService } from '../wallet.service';
import { WalletRepository } from '../wallet.repository';
import Decimal from 'decimal.js';

describe('WalletService', () => {
  let walletService: WalletService;
  let walletRepository: WalletRepository;

  beforeEach(() => {
    walletRepository = new WalletRepository(jest.fn() as any);
    walletService = new WalletService(walletRepository);
  });

  describe('addMoney', () => {
    it('should add money to wallet with zero balance and return the referenceId', async () => {
      // Arrange
      const userId = 1;
      const amount = '100';

      jest.spyOn(walletRepository, 'findByOwnerId').mockResolvedValueOnce(null);
      jest.spyOn(walletRepository, 'create').mockResolvedValueOnce({
        balance: new Decimal(100),
      } as Wallet);
      jest
        .spyOn(walletRepository, 'addMoney')
        .mockResolvedValueOnce([{}, {}] as any);

      // Act
      const result = await walletService.addMoney(userId, amount);

      // Assert
      expect(result).toEqual({ referenceId: expect.any(String) });
    });

    it('should add money to wallet with positive balance and return the referenceId', async () => {
      // Arrange
      const userId = 1;
      const amount = '100';

      jest
        .spyOn(walletRepository, 'findByOwnerId')
        .mockResolvedValueOnce({} as Wallet);
      jest
        .spyOn(walletRepository, 'addMoney')
        .mockResolvedValueOnce([{}, {}] as any);

      // Act
      const result = await walletService.addMoney(userId, amount);

      // Assert
      expect(result).toEqual({ referenceId: expect.any(String) });
    });

    it('should throw BadRequestException when adding negative amount to wallet', async () => {
      // Arrange
      const userId = 1;
      const amount = '-100';

      jest
        .spyOn(walletRepository, 'findByOwnerId')
        .mockResolvedValueOnce({} as Wallet);

      // Act & Assert
      await expect(walletService.addMoney(userId, amount)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
