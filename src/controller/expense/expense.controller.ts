import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
  PatchExpenseRequestDto,
  PostExpenseFilterRequestDto,
  PostExpensePagingRequestDto,
  PostExpenseReportListRequestDto,
  PostExpenseRequestDto,
} from 'src/core';
import { JwtAuthGuard } from 'src/frameworks/guards/jwt.auth.guard';
import { ExpenseCreateUseCase } from 'src/use-case/expense-create/expense-create-use-case';
import { ExpenseDeleteUseCase } from 'src/use-case/expense-delete/expense-delete-use-case';
import { ExpenseFilterCreateListUseCase } from 'src/use-case/expense-filter-list/expense-filter-list-use-case';
import { ExpenseGetListUseCase } from 'src/use-case/expense-get-list/expense-get-list-use-case';
import { ExpensePagingCreateListUseCase } from 'src/use-case/expense-paging-list/expense-paging-list-use-case';
import { ExpenseReportCreateListUseCase } from 'src/use-case/expense-report-create-list/expense-report-create-list-use-case';
import { ExpenseUpdateUseCase } from 'src/use-case/expense-update/expense-update-use-case';

@UseGuards(JwtAuthGuard)
@ApiTags('Expense-Controller')
@Controller()
export class ExpenseController {
  constructor(
    private readonly expenseCreateUseCase: ExpenseCreateUseCase,
    private readonly expenseGetListUseCase: ExpenseGetListUseCase,
    private readonly expenseUpdateUseCase: ExpenseUpdateUseCase,
    private readonly expenseDeleteUseCase: ExpenseDeleteUseCase,
    private readonly expenseReportCreateListUseCase: ExpenseReportCreateListUseCase,
    private readonly expenseFilterCreateListUseCase: ExpenseFilterCreateListUseCase,
    private readonly expensePagingCreateListUseCase: ExpensePagingCreateListUseCase,
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

  @Delete('/v1/expense/:id')
  deleteExpense(
    @Param('id') id: string,
    @Request() req,
  ) {
    const userId = req.user.userId;
    return this.expenseDeleteUseCase.deleteExpense(id, userId);
  }

  @Post('/v1/expense/report')
  @HttpCode(HttpStatus.OK)
  postExpenseReportList(
    @Body() postExpenseReportListRequestDto: PostExpenseReportListRequestDto,
    @Request() req,
  ) {
    const userId = req.user.userId;
    return this.expenseReportCreateListUseCase.createExpenseReportList(postExpenseReportListRequestDto, userId);
  }

  @Post('/v1/expense/filter')
  @HttpCode(HttpStatus.OK)
  postExpenseFilter(
    @Body() postExpenseFilterRequestDto: PostExpenseFilterRequestDto,
    @Request() req,
  ){
    return this.expenseFilterCreateListUseCase.createExpenseFilterList(postExpenseFilterRequestDto, req.user.userId);
  }

  @Post('/v1/expense/paging')
  @HttpCode(HttpStatus.OK)
  postExpensePagingList(
    @Body() postExpensePagingRequestDto: PostExpensePagingRequestDto,
    @Request() req,
  ){
    return this.expensePagingCreateListUseCase.createExpensePagingList(postExpensePagingRequestDto, req.user.userId);
  }
}
