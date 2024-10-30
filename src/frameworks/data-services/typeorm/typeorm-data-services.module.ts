import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TYPE_ORM_CONFIG } from 'src/configulations';
import {
  ExpenseEntity,
  IExpenseRepository,
  IUserRepository,
  UserEntity,
} from 'src/core';
import { ExpenseRepository, UserRepository } from 'src/repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, ExpenseEntity]),
    TYPE_ORM_CONFIG,
  ],
  providers: [
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    {
      provide: IExpenseRepository,
      useClass: ExpenseRepository,
    },
  ],
  exports: [IUserRepository, IExpenseRepository],
})
export class TypeOrmDataServicesModule {}
