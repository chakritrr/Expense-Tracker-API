import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PostExpenseRequestDto } from 'src/core';
import { ExpenseCreateUseCase } from 'src/use-case/expense-create/expense-create-use-case';

@ApiTags('Expense-Controller')
@Controller()
export class ExpenseController {
  constructor(private readonly expenseCreateUseCase: ExpenseCreateUseCase) {}

  @Post('/v1/expense')
  postExpense(@Body() postExpenseRequestDto: PostExpenseRequestDto) {
    return this.expenseCreateUseCase.createExpense(postExpenseRequestDto);
  }
}
