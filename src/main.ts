import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ConfigsType } from './configuration';
import { DocumentConfig } from './document.config';
import { PrismaService } from './modules/prisma/prisma.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  const configService: ConfigService<ConfigsType> = new ConfigService();
  const port = configService.get<number>('PORT') || 3000;

  const isDevelopmentMode: boolean =
    configService.get<string>('APP_MODE').toUpperCase() == 'DEVELOPMENT';

  isDevelopmentMode && new DocumentConfig(app, port, '/api').setupSwagger();

  await app.listen(port);

  isDevelopmentMode &&
    console.log('Document: http://localhost:' + port + '/api');
}
bootstrap();
