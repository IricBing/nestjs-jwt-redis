import { registerAs } from '@nestjs/config';

/** Redis数据库配置 */
export const RedisConfigRegister = registerAs('redis', () => ({
  /** 公共配置 */
  common: {
    /** 数据库Host */
    host: process.env.REDIS_COMMON_HOST,
    /** 数据库端口 */
    port: parseInt(process.env.REDIS_COMMON_PORT),
    /** 登录密码 */
    password: process.env.REDIS_COMMON_PASSWORD,
  },
  /** 验证存储数据库配置 */
  auth: {
    /** 数据库编号0-15 */
    db: parseInt(process.env.REDIS_AUTH_DB),
    /** Key前缀 */
    keyPrefix: process.env.REDIS_AUTH_KEY_PREFIX,
  },
}));
