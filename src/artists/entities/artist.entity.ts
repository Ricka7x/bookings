import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Artist {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  bio?: string;
}
