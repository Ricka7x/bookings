import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { ArtistsService } from './artists.service';
import { Artist } from './entities/artist.entity';
import { CreateArtistInput } from './dto/create-artist.input';
import { UpdateArtistInput } from './dto/update-artist.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/users/entities/user.entity';

@Resolver(() => Artist)
@UseGuards(JwtAuthGuard)
export class ArtistsResolver {
  constructor(private readonly artistsService: ArtistsService) {}

  @Mutation(() => Artist, { name: 'CreateArtist' })
  createArtist(
    @Args('createArtistInput') createArtistInput: CreateArtistInput,
    @GetUser() user: User,
  ) {
    return this.artistsService.create(createArtistInput, user);
  }

  @Query(() => [Artist], { name: 'GetArtists' })
  findAll(@GetUser() user: User) {
    return this.artistsService.findAll(user);
  }

  @Query(() => Artist, { name: 'GetOneArtist' })
  findOne(@GetUser() user: User) {
    return this.artistsService.findOne(user);
  }

  @Mutation(() => Artist, { name: 'UpdateArtist' })
  updateArtist(
    @Args('updateArtistInput') updateArtistInput: UpdateArtistInput,
    @GetUser() user: User,
  ) {
    return this.artistsService.update(updateArtistInput, user);
  }

  @Mutation(() => Artist, { name: 'DeleteOneArtist' })
  removeArtist(@GetUser() user: User) {
    return this.artistsService.remove(user);
  }
}
