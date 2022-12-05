import { ObjectType, Field, ID } from '@nestjs/graphql';
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

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
