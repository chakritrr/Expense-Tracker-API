import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TYPE_ORM_CONFIG } from 'src/configulations';
import {
  UserEntity,
  ExpenseEntity,
  CategoryEntity,
  IUserRepository,
  IExpenseRepository,
  ICategoryRepository,
} from 'src/core';
import {
  CategoryRepository,
  ExpenseRepository,
  UserRepository,
} from 'src/repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, ExpenseEntity, CategoryEntity]),
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
    {
      provide: ICategoryRepository,
      useClass: CategoryRepository,
    },
  ],
  exports: [IUserRepository, IExpenseRepository, ICategoryRepository],
})
export class TypeOrmDataServicesModule {}
