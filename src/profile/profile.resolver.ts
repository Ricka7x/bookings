import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import { Profile } from './entities/profile.entity';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/users/entities/user.entity';

@Resolver(() => Profile)
@UseGuards(JwtAuthGuard)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Mutation(() => Profile, { name: 'CreateProfile' })
  createProfile(
    @Args('createProfileInput') createProfileInput: CreateProfileInput,
    @GetUser() user: User,
  ): Promise<Profile> {
    return this.profileService.create(createProfileInput, user);
  }

  @Mutation(() => Profile, { name: 'EditProfile' })
  updateProfile(
    @Args('updateProfileInput') updateProfileInput: UpdateProfileInput,
    @GetUser() user: User,
  ): Promise<Profile> {
    return this.profileService.update(updateProfileInput, user);
  }
}
