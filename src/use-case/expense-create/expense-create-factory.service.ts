import { Injectable } from '@nestjs/common';
import { isNotEmpty } from 'class-validator';

import {
  ExpenseEntity,
  PostExpenseRequestDto,
  PostExpenseResponseDto,
  UserEntity,
} from 'src/core';

@Injectable()
export class ExpenseCreateFactoryService {
  createExpense(
    postExpenseRequestDto: PostExpenseRequestDto,
    userEntity: UserEntity,
  ) {
    const { title, amount, category, notes } = postExpenseRequestDto;

    const expenseEntity = new ExpenseEntity();
    expenseEntity.title = title;
    expenseEntity.amount = amount;
    expenseEntity.category = category;
    expenseEntity.notes = isNotEmpty(notes) ? notes : '';
    expenseEntity.userId = userEntity;
    expenseEntity.createdAt = new Date();
    expenseEntity.updatedAt = new Date();

    return expenseEntity;
  }

  constructResponse(id: string) {
    const resp = new PostExpenseResponseDto();
    resp.id = id;

    return resp;
  }
}
