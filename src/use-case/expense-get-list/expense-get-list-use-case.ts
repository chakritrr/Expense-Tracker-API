import { Injectable } from '@nestjs/common';

import { IExpenseRepository } from 'src/core';
import { ExpenseGetListFactoryService } from './expense-get-factory.service';

@Injectable()
export class ExpenseGetListUseCase {
  constructor(
    private readonly iExpenseRepository: IExpenseRepository,
    private readonly expenseGetListFactoryService: ExpenseGetListFactoryService,
  ) {}

  async getExpenseList() {
    const expenseEntity = await this.iExpenseRepository.findAll();

    return this.expenseGetListFactoryService.constructResponse(expenseEntity);
  }
}
