import { Injectable } from '@nestjs/common';
import { isNotEmpty } from 'class-validator';

import {
  ExpenseEntity,
  PostExpenseRequestDto,
  PostExpenseResponseDto,
} from 'src/core';

@Injectable()
export class ExpenseCreateFactoryService {
  createExpense(postExpenseRequestDto: PostExpenseRequestDto) {
    const { title, amount, notes } = postExpenseRequestDto;
    
    const expenseEntity = new ExpenseEntity();
    expenseEntity.title = title;
    expenseEntity.amount = amount;
    expenseEntity.notes = isNotEmpty(notes) ? notes : '';
    expenseEntity.date = new Date();
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
