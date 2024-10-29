import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { PostExpenseRequestDto } from 'src/core';
import { ExpenseCreateFactoryService } from './expense-create-factory.service';

@Injectable()
export class ExpenseCreateUseCase {
  constructor(
    private readonly dataSource: DataSource,
    private readonly expenseCreateFactoryService: ExpenseCreateFactoryService,
  ) {}

  async createExpense(postExpenseRequestDto: PostExpenseRequestDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const expenseEntity = this.expenseCreateFactoryService.createExpense(
        postExpenseRequestDto,
      );
      await queryRunner.manager.save(expenseEntity);
      await queryRunner.commitTransaction();

      return this.expenseCreateFactoryService.constructResponse(
        expenseEntity.id,
      );
    } catch (error) {
      console.error(error);
      const statusCode = error.code
        ? error.code
        : HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(error.message, statusCode);
    } finally {
      await queryRunner.release();
    }
  }
}
