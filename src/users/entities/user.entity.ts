import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Artist } from 'src/artists/entities/artist.entity';
import { Profile } from 'src/profile/entities/profile.entity';

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  email: string;

  password: string;

  @Field(() => [String])
  roles: string[];

  @Field(() => Profile, { nullable: true })
  profile?: Profile;

  @Field(() => Artist, { nullable: true })
  artist?: Artist;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
