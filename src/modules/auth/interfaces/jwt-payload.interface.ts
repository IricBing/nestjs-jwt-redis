import { UserEntity } from '../../user/entities/user.entity';

/** Json Web Token 内容 */
export interface JwtPayload extends UserEntity {
  /** 随机字符串，用于校验token是否正确 */
  random: string;
}
