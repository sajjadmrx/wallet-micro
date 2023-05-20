import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ConfigsType } from './configuration';
import { DocumentConfig } from './document.config';
import { PrismaService } from './modules/prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  const configService: ConfigService<ConfigsType> = new ConfigService();
  const port = configService.get<number>('PORT') || 3000;
  const isDevelopmentMode: boolean =
    configService.get<string>('APP_MODE').toUpperCase() == 'DEVELOPMENT';

  isDevelopmentMode && new DocumentConfig(app, port, '/api').setupSwagger();

  const prisma = app.get<PrismaService>(PrismaService);

  const users = await prisma.user.findMany();
  if (!users.length) {
    const usersData: Array<string> = ['sajjadmrx', 'ali'];

    for (const username of usersData) {
      await prisma.user.create({
        data: {
          username,
          wallet: {
            create: {},
          },
        },
      });
    }
  }

  await app.listen(port);

  isDevelopmentMode &&
    console.log('Document: http://localhost:' + port + '/api');
}
bootstrap();
