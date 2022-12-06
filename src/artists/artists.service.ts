import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/users/entities/user.entity';
import { CreateArtistInput } from './dto/create-artist.input';
import { UpdateArtistInput } from './dto/update-artist.input';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createArtistInput: CreateArtistInput, user: User): Promise<Artist> {
    return this.prisma.artist.create({
      data: { ...createArtistInput, userId: user.id },
    });
  }

  findAll(user: User): Promise<Artist[]> {
    console.log(user);

    return this.prisma.artist.findMany({});
  }

  findOne(user: User): Promise<Artist> {
    return this.prisma.artist.findUnique({
      where: { userId: user.id },
    });
  }

  update(updateArtistInput: UpdateArtistInput, user: User): Promise<Artist> {
    return this.prisma.artist.update({
      where: { userId: user.id },
      data: updateArtistInput,
    });
  }

  remove(user: User): Promise<Artist> {
    return this.prisma.artist.delete({
      where: { userId: user.id },
    });
  }
}
