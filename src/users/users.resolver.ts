import { Resolver, Query, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PaginationArgs } from 'src/common/dto/pagination.args';
import { PaginatedUsers } from './types/paginated-users.type';
import { Roles } from 'src/auth/decorators/roles.decotator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guards';

@Resolver(() => User)
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => PaginatedUsers, { name: 'GetUsers' })
  @Roles(Role.ADMIN)
  findAll(@Args() paginationArgs: PaginationArgs): Promise<PaginatedUsers> {
    return this.usersService.findAll(paginationArgs);
  }
}
