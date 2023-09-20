import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

/** @User()装饰器 */
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest<Request>();
    return user;
  },
);
