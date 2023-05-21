import { HttpStatus, INestApplication } from '@nestjs/common';
import { runAppFixture } from './fixtures/startapp.fixture';
import { PrismaService } from '../src/modules/prisma/prisma.service';
import * as request from 'supertest';

describe('Wallet e2e', function () {
  let app: INestApplication;
  let prismaService: PrismaService;
  beforeAll(async () => {
    app = await runAppFixture();
    prismaService = app.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await prismaService.transaction.deleteMany();
    await prismaService.wallet.deleteMany();
  });

  it('should add money to user wallet', async () => {
    const userId = 1;
    const amount = '10';

    const response = await request(app.getHttpServer())
      .put(`/wallet/${userId}/money`)
      .send({ amount })
      .expect(200);

    expect(response.body.data).toHaveProperty('referenceId');
  });
  it('should create a new wallet if none exists for the user', async () => {
    const userId = 12345;
    const amount = '10';

    const response = await request(app.getHttpServer())
      .put(`/wallet/${userId}/money`)
      .send({ amount })
      .expect(200);

    expect(response.body.data).toHaveProperty('referenceId');
  });

  it('should throw BadRequestException for negative amount', async () => {
    const userWallet = await prismaService.wallet.create({
      data: {
        ownerId: 1,
        balance: 5,
      },
    });

    const userId = userWallet.ownerId;
    const amount = '-10';

    await request(app.getHttpServer())
      .put(`/wallet/${userId}/money`)
      .send({ amount })
      .expect(400);
  });

  it('should throw InternalServerErrorException for database connection', async function () {
    jest.spyOn(prismaService.wallet, 'update').mockImplementation(() => {
      throw new Error('Database connection error');
    });

    const userId = 1;
    const amount = '999';

    const response = await request(app.getHttpServer())
      .put(`/wallet/${userId}/money`)
      .send({ amount });

    expect(response.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
  });
});
