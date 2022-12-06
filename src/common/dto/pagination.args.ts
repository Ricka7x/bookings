import { Field, ArgsType, Int } from '@nestjs/graphql';
import { IsOptional, IsPositive } from 'class-validator';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { nullable: true, defaultValue: 5 })
  @IsOptional()
  @IsPositive()
  limit?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  cursor?: string;
}
