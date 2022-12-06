import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Roles } from '../enums/valid-roles.enum';

export const CurrentUser = createParamDecorator(
  (roles: Roles[] = [], context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;

    if (!user) {
      throw new InternalServerErrorException('User not found');
    }

    if (roles.length === 0) return user;

    const hasRole = roles.some((role) => user.roles.includes(role));

    if (!hasRole) {
      throw new InternalServerErrorException('User not authorized');
    }

    return user;
  },
);
