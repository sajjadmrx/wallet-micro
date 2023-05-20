import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ConfigsType } from './configuration';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  const configService: ConfigService<ConfigsType> = new ConfigService();
  const port = configService.get<number>('PORT') || 3000;
  const isDevelopmentMode: boolean =
    configService.get<string>('APP_MODE').toUpperCase() == 'DEVELOPMENT';

  await app.listen(port);
}
bootstrap();
