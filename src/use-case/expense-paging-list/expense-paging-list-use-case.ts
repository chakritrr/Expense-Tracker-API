import { Injectable } from '@nestjs/common';

import { IExpenseRepository, PostExpensePagingRequestDto } from 'src/core';

@Injectable()
export class ExpensePagingCreateListUseCase {
  constructor(private readonly iExpenseRepository: IExpenseRepository) {}

  async createExpensePagingList(
    postExpensePagingRequestDto: PostExpensePagingRequestDto,
    userId: string,
  ) {
    return await this.iExpenseRepository.findExpensePaging(
      postExpensePagingRequestDto,
      userId,
    );
  }
}
