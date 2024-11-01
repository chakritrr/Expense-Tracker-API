import { Injectable } from '@nestjs/common';

import { IExpenseRepository, PostExpenseReportListRequestDto } from 'src/core';

@Injectable()
export class ExpenseReportCreateListUseCase {
  constructor(private readonly iExpenseRepository: IExpenseRepository) {}

  async createExpenseReportList(
    postExpenseReportListRequestDto: PostExpenseReportListRequestDto,
    userId: string,
  ) {
    return await this.iExpenseRepository.findReport(
      postExpenseReportListRequestDto,
      userId,
    );
  }
}
