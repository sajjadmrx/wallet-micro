import { Module } from '@nestjs/common';
import configuration from '../configuration';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { HttpModule } from './http/http.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    HttpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
