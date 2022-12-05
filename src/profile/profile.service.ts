import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/users/entities/user.entity';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createProfileInput: CreateProfileInput, user: User) {
    return await this.prisma.profile.create({
      data: { ...createProfileInput, userId: user.id },
    });
  }

  async update(updateProfileInput: UpdateProfileInput, user: User) {
    return await this.prisma.profile.update({
      where: { userId: user.id },
      data: updateProfileInput,
    });
  }
}
