import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { ConfigValidation } from './modules/config/validations/config.validation';
import { CommonConfigRegister } from './modules/config/registers/common.register';
import { RedisConfigRegister } from './modules/config/registers/redis.register';
import { UserModule } from './modules/user/user.module';
import { RedisModule } from '@iot9x.com/nestjs-redis';
import { AUTH_REDIS } from './modules/common/constants/redis.constant';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      validationSchema: ConfigValidation,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
      load: [CommonConfigRegister, RedisConfigRegister],
    }),
    RedisModule.forRootAsync({
      useFactory: (redisConfig: ConfigType<typeof RedisConfigRegister>) => ({
        defaultOptions: redisConfig.common,
        config: [{ namespace: AUTH_REDIS, ...redisConfig.auth }],
      }),
      inject: [RedisConfigRegister.KEY],
    }),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
