import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PatchExpenseRequestDto, PostExpenseRequestDto } from 'src/core';
import { JwtAuthGuard } from 'src/frameworks/guards/jwt.auth.guard';
import { ExpenseCreateUseCase } from 'src/use-case/expense-create/expense-create-use-case';
import { ExpenseGetListUseCase } from 'src/use-case/expense-get-list/expense-get-list-use-case';
import { ExpenseUpdateUseCase } from 'src/use-case/expense-update/expense-update-use-case';

@UseGuards(JwtAuthGuard)
@ApiTags('Expense-Controller')
@Controller()
export class ExpenseController {
  constructor(
    private readonly expenseCreateUseCase: ExpenseCreateUseCase,
    private readonly expenseGetListUseCase: ExpenseGetListUseCase,
    private readonly expenseUpdateUseCase: ExpenseUpdateUseCase,
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

  @Patch('/v1/expense/:id')
  patchExpense(
    @Param('id') id: string,
    @Body() patchExpenseRequestDto: PatchExpenseRequestDto,
    @Request() req,
  ) {
    const userId = req.user.userId;
    return this.expenseUpdateUseCase.updateExpense(id, patchExpenseRequestDto, userId);
  }
}
