import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

import { AuthDto } from '../auth/dto/auth.dto';
import { User } from './entities/user.entity';
import { PaginationArgs } from 'src/common/dto/pagination.args';
import { PaginatedUsers } from './types/paginatedUsers.type';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(authDto: AuthDto): Promise<User> {
    return this.prisma.user.create({
      data: { ...authDto, password: bcrypt.hashSync(authDto.password, 10) },
    });
  }

  async findOneByEmail(authDto: AuthDto): Promise<User> {
    const { email } = authDto;
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findOneById(id: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findAll(paginationArgs: PaginationArgs): Promise<PaginatedUsers> {
    const { limit, cursor } = paginationArgs;

    if (isNaN(Number(cursor))) {
      const users = await this.prisma.user.findMany({
        take: limit + 1,
        include: { profile: true, artist: true },
        orderBy: { id: 'asc' },
      });

      const hasNextPage = users.length > limit;

      const items = hasNextPage ? users.slice(0, -1) : users;

      const endCursor =
        users[hasNextPage ? users.length - 2 : users.length - 1].id;

      return {
        items,
        pageInfo: {
          hasNextPage,
          endCursor,
        },
      };
    }
    const users = await this.prisma.user.findMany({
      take: limit + 1,
      skip: 1,
      cursor: { id: Number(cursor) },
      include: { profile: true, artist: true },
      orderBy: { id: 'asc' },
    });

    const hasNextPage = users.length > limit;

    const items = hasNextPage ? users.slice(0, -1) : users;

    const endCursor =
      users[hasNextPage ? users.length - 2 : users.length - 1].id;

    return {
      items,
      pageInfo: {
        hasNextPage,
        endCursor,
      },
    };
  }
}
