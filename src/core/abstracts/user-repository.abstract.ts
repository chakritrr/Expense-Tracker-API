import { UserEntity } from '../entities';

export abstract class IUserRepository {
  abstract findOneByEmail(email: string): Promise<UserEntity>;

  abstract findAll(): Promise<UserEntity[]>;

  abstract findOneById(id: string): Promise<UserEntity>;
}
