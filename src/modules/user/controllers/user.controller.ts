import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { LoginReqDto } from '../dtos/login.req.dto';
import { AuthService } from '../../auth/services/auth.service';
import { UserEntity } from '../entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../auth/decorators/user.decorator';
import { JwtPayload } from '../../auth/interfaces/jwt-payload.interface';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() { name, type }: LoginReqDto): Promise<string> {
    const user = this.userService.findOneByName(name);
    if (!user) throw new BadRequestException('用户不存在');

    const token = await this.authService.createToken(type, user);

    return 'Bearer ' + token;
  }

  @UseGuards(AuthGuard())
  @Get('info')
  async getInfo(@User() user: JwtPayload): Promise<UserEntity> {
    return this.userService.findOneByName(user.name);
  }
}
