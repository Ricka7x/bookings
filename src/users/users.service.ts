import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

import { AuthDto } from '../auth/dto/auth.dto';
import { User } from './entities/user.entity';

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

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      include: { profile: true },
    });
  }
}
