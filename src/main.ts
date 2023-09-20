import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigType } from '@nestjs/config';
import { CommonConfigRegister } from './modules/config/registers/common.register';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const commonConfig = app
    .select(AppModule)
    .get<ConfigType<typeof CommonConfigRegister>>(CommonConfigRegister.KEY);

  await app.listen(commonConfig.port);

  Logger.log(`服务已经启动:${await app.getUrl()}`);
}
bootstrap();
