import { registerAs } from '@nestjs/config';

/** 基础配置 */
export const CommonConfigRegister = registerAs('common', () => ({
  /** 运行环境 */
  nodeENV: process.env.NODE_ENV as
    | 'development'
    | 'production'
    | 'staging'
    | 'test',
  /** jwt token有效期，单位：秒 */
  jwtExpiresIn: parseInt(process.env.COMMON_JWT_EXPIRES_IN),
  /** 程序占用端口号 */
  port: parseInt(process.env.COMMON_PORT),
}));
