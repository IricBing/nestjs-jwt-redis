import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { AuthService } from '../services/auth.service';
import { AuthUtil } from '../utils/auth.util';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly authUtil: AuthUtil,
  ) {
    super();
  }

  /**
   * 验证token是否合法
   * @param token token值
   * @returns 需要的用户信息
   */
  async validate(token: string): Promise<JwtPayload> {
    if (!token) throw new UnauthorizedException();

    try {
      const [key, random] = this.authUtil.decrypt(token);

      const jwtPayload = await this.authService.getUser(key, random);
      if (!jwtPayload) throw new UnauthorizedException();

      return jwtPayload;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
