import { Field, ObjectType } from '@nestjs/graphql';
import { PageInfoType } from './page-info-type';
import { Type } from '@nestjs/common';

export function Paginated<T>(classRef: Type<T>): any {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(() => [classRef])
    items: T[];

    @Field(() => PageInfoType)
    pageInfo: PageInfoType;
  }

  return PaginatedType;
}
