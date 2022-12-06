import { Resolver, Query, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { PaginationArgs } from 'src/common/dto/pagination.args';
import { PaginatedUsers } from './types/paginated-users.type';

@Resolver(() => User)
@UseGuards(JwtAuthGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => PaginatedUsers, { name: 'GetUsers' })
  findAll(
    @Args() paginationArgs: PaginationArgs,
    @GetUser() user: User,
  ): Promise<PaginatedUsers> {
    console.log(user);

    return this.usersService.findAll(paginationArgs);
  }
}
