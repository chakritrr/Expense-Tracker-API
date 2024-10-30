import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { IExpenseRepository, PatchExpenseRequestDto } from 'src/core';
import { ExpenseUpdateFactoryService } from './expense-update-factory.service';

@Injectable()
export class ExpenseUpdateUseCase {
  constructor(
    private readonly expenseUpdateFactoryService: ExpenseUpdateFactoryService,
    private readonly dataSource: DataSource,
    private readonly iExpenseRepository: IExpenseRepository,
  ) {}

  async updateExpense(
    id: string,
    patchExpenseRequestDto: PatchExpenseRequestDto,
    userId: string,
  ) {
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
      const expenseEntity = this.expenseUpdateFactoryService.updateExpense(
        expenseEntityById,
        patchExpenseRequestDto,
      );
      await queryRunner.manager.save(expenseEntity);
      await queryRunner.commitTransaction();

      return this.expenseUpdateFactoryService.constructResponse(
        expenseEntity.id,
      );
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
      throw new HttpException(error?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      await queryRunner.release();
    }
  }
}
