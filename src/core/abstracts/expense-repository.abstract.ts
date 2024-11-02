import { ExpenseEntity } from '../entities';
import {
  PostExpenseFilterRequestDto,
  PostExpenseFilterResponseDto,
  PostExpensePagingRequestDto,
  PostExpensePagingResponseDto,
  PostExpenseReportListRequestDto,
  PostExpenseReportListResponseDto,
} from '../dtos';

export abstract class IExpenseRepository {
  abstract findAll(): Promise<ExpenseEntity[]>;

  abstract findOneByIdRelation(id: string): Promise<ExpenseEntity>;

  abstract remove(expenseEntity: ExpenseEntity): Promise<ExpenseEntity>;

  abstract findReport(
    postExpenseReportListRequestDto: PostExpenseReportListRequestDto,
    userId: string,
  ): Promise<PostExpenseReportListResponseDto>;

  abstract findExpenseFilter(
    userId: string,
    postExpenseFilterRequestDto: PostExpenseFilterRequestDto,
  ): Promise<PostExpenseFilterResponseDto>;

  abstract findExpensePaging(
    postExpensePagingRequestDto: PostExpensePagingRequestDto,
    userId: string,
  ): Promise<PostExpensePagingResponseDto>;
}
