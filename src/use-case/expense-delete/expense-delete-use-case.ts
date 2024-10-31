import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { ExpenseDeleteFactoryService } from './expense-delete-factory.service';
import { IExpenseRepository } from 'src/core';

@Injectable()
export class ExpenseDeleteUseCase {
  constructor(
    private readonly expenseDeleteFactoryService: ExpenseDeleteFactoryService,
    private readonly dataSource: DataSource,
    private readonly iExpenseRepository: IExpenseRepository,
  ) {}

  async deleteExpense(id: string, userId: string) {
    const expenseEntityById = await this.iExpenseRepository.findOneByIdRelation(id);

    if (!expenseEntityById) {
      throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);
    }

    if (expenseEntityById.userId.id !== userId) {
      throw new HttpException('You do not have permission to access this expense', HttpStatus.UNAUTHORIZED);
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.remove(expenseEntityById);
      await queryRunner.commitTransaction();

      return this.expenseDeleteFactoryService.constructResponse(id);
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
      throw new HttpException(error?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      await queryRunner.release();
    }
  }
}
