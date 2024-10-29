import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostExpenseRequestDto } from 'src/core';

@ApiTags('Expense-Controller')
@Controller()
export class ExpenseController {
  constructor() {}

  @Post('/v1/expense')
  postExpense(@Body() postExpenseRequestDto: PostExpenseRequestDto) {
    return postExpenseRequestDto;
  }
}
