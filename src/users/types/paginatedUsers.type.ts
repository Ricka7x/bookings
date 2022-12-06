import { ObjectType } from '@nestjs/graphql';
import { Paginated } from 'src/common/types/paginated.type';
import { User } from '../entities/user.entity';

@ObjectType()
export class PaginatedUsers extends Paginated(User) {}
