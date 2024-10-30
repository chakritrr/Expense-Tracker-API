import { Injectable } from '@nestjs/common';
import { isNotEmpty } from 'class-validator';

import {
  ExpenseEntity,
  PatchExpenseRequestDto,
  PatchExpenseResponseDto,
} from 'src/core';

@Injectable()
export class ExpenseUpdateFactoryService {
  updateExpense(
    expenseEntity: ExpenseEntity,
    patchExpenseRequestDto: PatchExpenseRequestDto,
  ) {
    const { title, amount, category, notes } = patchExpenseRequestDto;

    expenseEntity.title = title;
    expenseEntity.amount = amount;
    expenseEntity.category = category;
    expenseEntity.notes = isNotEmpty(notes) ? notes : '';
    expenseEntity.updatedAt = new Date();

    return expenseEntity;
  }

  constructResponse(id: string) {
    const resp = new PatchExpenseResponseDto();
    resp.id = id;

    return resp;
  }
}
