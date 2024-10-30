import { Injectable } from '@nestjs/common';
import { isEmpty } from 'class-validator';

import { ExpenseEntity, GetExpenseListResponseDto } from 'src/core';

@Injectable()
export class ExpenseGetListFactoryService {
  constructResponse(expenseEntity: ExpenseEntity[]) {
    const resp = expenseEntity.map((item) => {
      const { id, title, amount, category, notes, createdAt, updatedAt } = item;

      const expenseResDto = new GetExpenseListResponseDto();
      expenseResDto.id = id;
      expenseResDto.title = title;
      expenseResDto.amount = amount;
      expenseResDto.category = category;
      expenseResDto.notes = isEmpty(notes) ? '' : notes;
      expenseResDto.createdAt = createdAt.toString()
      expenseResDto.updatedAt = updatedAt.toString();

      return expenseResDto;
    });

    return resp;
  }
}
