import { Injectable } from '@nestjs/common';

import { IExpenseRepository, PostExpenseFilterRequestDto } from 'src/core';

@Injectable()
export class ExpenseFilterCreateListUseCase {
  constructor(private readonly iExpenseRepository: IExpenseRepository) {}

  createExpenseFilterList(
    postExpenseFilterRequestDto: PostExpenseFilterRequestDto,
    userId: string,
  ) {
    return this.iExpenseRepository.findExpenseFilter(userId, postExpenseFilterRequestDto);
  }
}
