import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { LoginSceneType } from '../constants/auth.constant';
import { UserEntity } from '../../user/entities/user.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { CommonConfigRegister } from '../../config/registers/common.register';
import { ConfigType } from '@nestjs/config';
import { InjectRedisService, RedisService } from '@iot9x.com/nestjs-redis';
import { AUTH_REDIS } from '../../common/constants/redis.constant';
import { AuthUtil } from '../utils/auth.util';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CommonConfigRegister.KEY)
    private readonly commonConfig: ConfigType<typeof CommonConfigRegister>,
    @InjectRedisService(AUTH_REDIS)
    private readonly authRedisService: RedisService,
    private readonly authUtil: AuthUtil,
  ) {}

  async createToken(type: LoginSceneType, user: UserEntity): Promise<string> {
    const random = uuid();
    const payload: JwtPayload = {
      random,
      ...user,
    };

    const redisKey = `${user.uuid}_${type}`;
    await this.authRedisService.setex(
      redisKey,
      JSON.stringify(payload),
      this.commonConfig.jwtExpiresIn,
    );

    return this.authUtil.encrypt(redisKey, random);
  }

  async getUser(key: string, random: string): Promise<JwtPayload> {
    const decode = await this.authRedisService.get<JwtPayload>(key);

    // * token自动续期功能
    if (decode != null)
      this.authRedisService.expire(key, this.commonConfig.jwtExpiresIn);

    if (!decode || decode.random !== random) return null;

    return decode;
  }
}
