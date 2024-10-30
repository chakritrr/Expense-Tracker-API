import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { IUserRepository, PostExpenseRequestDto } from 'src/core';
import { ExpenseCreateFactoryService } from './expense-create-factory.service';

@Injectable()
export class ExpenseCreateUseCase {
  constructor(
    private readonly dataSource: DataSource,
    private readonly expenseCreateFactoryService: ExpenseCreateFactoryService,
    private readonly iUserRepository: IUserRepository,
  ) {}

  async createExpense(
    postExpenseRequestDto: PostExpenseRequestDto,
    userId: string,
  ) {
    const userEntity = await this.iUserRepository.findOneById(userId);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const expenseEntity = this.expenseCreateFactoryService.createExpense(
        postExpenseRequestDto,
        userEntity,
      );
      await queryRunner.manager.save(expenseEntity);
      await queryRunner.commitTransaction();

      return this.expenseCreateFactoryService.constructResponse(
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
