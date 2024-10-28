import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IUserRepository, UserEntity } from 'src/core';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
  ) {}

  findOneByEmail(email: string): Promise<UserEntity> {
    return this.userEntity.findOne({
      where: {
        email,
      },
    });
  }

  findAll(): Promise<UserEntity[]> {
    return this.userEntity.find();
  }

  findOneById(id: string): Promise<UserEntity> {
    return this.userEntity.findOne({
      where: {
        id: id,
      },
    });
  }
}
