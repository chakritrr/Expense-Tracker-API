import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PostExpenseRequestDto } from 'src/core';
import { JwtAuthGuard } from 'src/frameworks/guards/jwt.auth.guard';
import { ExpenseCreateUseCase } from 'src/use-case/expense-create/expense-create-use-case';
import { ExpenseGetListUseCase } from 'src/use-case/expense-get-list/expense-get-list-use-case';

@UseGuards(JwtAuthGuard)
@ApiTags('Expense-Controller')
@Controller()
export class ExpenseController {
  constructor(
    private readonly expenseCreateUseCase: ExpenseCreateUseCase,
    private readonly expenseGetListUseCase: ExpenseGetListUseCase,
  ) {}

  @Post('/v1/expense')
  postExpense(
    @Body() postExpenseRequestDto: PostExpenseRequestDto,
    @Request() req,
  ) {
    const userId = req.user.userId;
    return this.expenseCreateUseCase.createExpense(postExpenseRequestDto, userId);
  }

  @Get('/v1/expense')
  getExpenseList() {
    return this.expenseGetListUseCase.getExpenseList();
  }
}
