import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthUtil } from './utils/auth.util';

@Global()
@Module({
  imports: [PassportModule.register({ defaultStrategy: 'bearer' })],
  providers: [AuthService, JwtStrategy, AuthUtil],
  exports: [
    AuthService,
    JwtStrategy,
    PassportModule.register({ defaultStrategy: 'bearer' }),
    AuthUtil,
  ],
})
export class AuthModule {}
