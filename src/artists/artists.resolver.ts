import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { ArtistsService } from './artists.service';
import { Artist } from './entities/artist.entity';
import { CreateArtistInput } from './dto/create-artist.input';
import { UpdateArtistInput } from './dto/update-artist.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';

@Resolver(() => Artist)
@UseGuards(JwtAuthGuard)
export class ArtistsResolver {
  constructor(private readonly artistsService: ArtistsService) {}

  @Mutation(() => Artist, { name: 'CreateArtist' })
  createArtist(
    @Args('createArtistInput') createArtistInput: CreateArtistInput,
    @CurrentUser() user: User,
  ) {
    return this.artistsService.create(createArtistInput, user);
  }

  @Query(() => [Artist], { name: 'GetArtists' })
  findAll(@CurrentUser() user: User) {
    return this.artistsService.findAll(user);
  }

  @Query(() => Artist, { name: 'GetOneArtist' })
  findOne(@CurrentUser() user: User) {
    return this.artistsService.findOne(user);
  }

  @Mutation(() => Artist, { name: 'UpdateArtist' })
  updateArtist(
    @Args('updateArtistInput') updateArtistInput: UpdateArtistInput,
    @CurrentUser() user: User,
  ) {
    return this.artistsService.update(updateArtistInput, user);
  }

  @Mutation(() => Artist, { name: 'DeleteOneArtist' })
  removeArtist(@CurrentUser() user: User) {
    return this.artistsService.remove(user);
  }
}
