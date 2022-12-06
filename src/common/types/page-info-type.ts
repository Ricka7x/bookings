import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PageInfoType {
  @Field(() => Boolean)
  hasNextPage: boolean;

  @Field(() => Int)
  endCursor: number;
}
