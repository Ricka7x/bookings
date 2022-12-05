import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateProfileInput {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  firstName?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  lastName?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  middleName?: string;
}
