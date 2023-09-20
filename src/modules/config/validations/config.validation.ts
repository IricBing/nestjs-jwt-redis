import Joi from 'joi';

/** .env文件校验 */
export const ConfigValidation = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'staging')
    .default('development'),

  // Common
  COMMON_JWT_EXPIRES_IN: Joi.number().default(604800),
  COMMON_PORT: Joi.number().default(3000),

  // Redis 公共配置
  REDIS_COMMON_HOST: Joi.string().required(),
  REDIS_COMMON_PORT: Joi.number().default(6379),
  REDIS_COMMON_PASSWORD: Joi.string().allow('').default(''),

  // Redis 认证数据库配置
  REDIS_AUTH_DB: Joi.number().default(1),
  REDIS_AUTH_KEY_PREFIX: Joi.string().required(),
});
