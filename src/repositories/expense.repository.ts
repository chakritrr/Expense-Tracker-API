import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ExpenseEntity, IExpenseRepository } from 'src/core';

@Injectable()
export class ExpenseRepository implements IExpenseRepository {
  constructor(
    @InjectRepository(ExpenseEntity)
    private readonly expenseEntity: Repository<ExpenseEntity>,
  ) {}

  findAll(): Promise<ExpenseEntity[]> {
    return this.expenseEntity.find();
  }

  findOneByIdRelation(id: string): Promise<ExpenseEntity> {
    return this.expenseEntity.findOne({
      where: {
        id,
      },
      relations: {
        userId: true,
      },
    });
  }
}
