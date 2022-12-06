import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

@InputType()
export class UpdateArtistInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @Min(20)
  bio?: string;
}
