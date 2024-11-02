import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  ExpenseEntity,
  IExpenseRepository,
  PostExpenseFilterRequestDto,
  PostExpenseFilterResponseDto,
  PostExpensePagingRequestDto,
  PostExpensePagingResponseDto,
  PostExpenseReportListRequestDto,
  PostExpenseReportListResponseDto,
} from 'src/core';

@Injectable()
export class ExpenseRepository implements IExpenseRepository {
  constructor(
    @InjectRepository(ExpenseEntity)
    private readonly expenseEntity: Repository<ExpenseEntity>,
  ) {}

  findAll(): Promise<ExpenseEntity[]> {
    return this.expenseEntity.find();
  }

  findOneByIdRelation(id: string): Promise<ExpenseEntity> {
    return this.expenseEntity.findOne({
      where: {
        id,
      },
      relations: {
        userId: true,
      },
    });
  }

  remove(expenseEntity: ExpenseEntity): Promise<ExpenseEntity> {
    return this.expenseEntity.remove(expenseEntity);
  }

  async findReport(
    postExpenseReportListRequestDto: PostExpenseReportListRequestDto,
    userId: string,
  ): Promise<PostExpenseReportListResponseDto> {
    const { startDate, endDate } = postExpenseReportListRequestDto;

    const query = `
      SELECT "category", SUM("amount") AS total_amount, COUNT(*) AS count
      FROM expenses
      WHERE "user_id" = $1
        AND "created_at" >= $2
        AND "created_at" <= $3
      GROUP BY "category"
    `;
    const params = [userId, startDate, endDate];
    const result = await this.expenseEntity.query(query, params);

    const resp = result.map((item) => {
      const responseDto = new PostExpenseReportListResponseDto();
      responseDto.category = item.category;
      responseDto.total = parseFloat(item.total_amount);
      responseDto.count = item.count;
      return responseDto;
    });

    return resp;
  }

  async findExpenseFilter(
    userId: string,
    postExpenseFilterRequestDto: PostExpenseFilterRequestDto,
  ): Promise<PostExpenseFilterResponseDto> {
    const { startDate, endDate, category } = postExpenseFilterRequestDto;

    let query = `
      SELECT *
      FROM expenses
      WHERE "user_id" = $1
    `;
    const params: string[] = [userId];

    if (startDate) {
      query += ` AND "created_at" >= $2`;
      params.push(startDate);
    }
    if (endDate) {
      query += ` AND "created_at" <= $3`;
      params.push(endDate);
    }
    if (category) {
      query += ` AND "category" = $4`;
      params.push(category);
    }

    const result = await this.expenseEntity.query(query, params);

    const resp = result.map((item) => {
      const responseDto = new PostExpenseFilterResponseDto();
      responseDto.id = item.id;
      responseDto.title = item.title;
      responseDto.amount = parseFloat(item.amount);
      responseDto.notes = item.notes;
      responseDto.category = item.category;
      responseDto.created_at = item.created_at;
      responseDto.updated_at = item.updated_at;
      return responseDto;
    });

    return resp;
  }

  async findExpensePaging(
    postExpensePagingRequestDto: PostExpensePagingRequestDto,
    userId: string,
  ): Promise<PostExpensePagingResponseDto> {
    const { startDate, endDate, category, page, limit } =
      postExpensePagingRequestDto;
    let query = `
      SELECT *
      FROM expenses
      WHERE "user_id" = $1
    `;
    const params: string[] = [userId];

    if (startDate) {
      query += ` AND "created_at" >= $2`;
      params.push(startDate);
    }
    if (endDate) {
      query += ` AND "created_at" <= $3`;
      params.push(endDate);
    }
    if (category) {
      query += ` AND "category" = $4`;
      params.push(category);
    }

    const offset = (page - 1) * limit;
    query += ` ORDER BY "created_at" DESC LIMIT $5 OFFSET $6`;
    params.push(limit.toString(), offset.toString());

    const result = await this.expenseEntity.query(query, params);

    const resp = result.map((item) => {
      const responseDto = new PostExpensePagingResponseDto();
      responseDto.id = item.id;
      responseDto.title = item.title;
      responseDto.amount = parseFloat(item.amount);
      responseDto.notes = item.notes;
      responseDto.category = item.category;
      responseDto.created_at = item.created_at;
      responseDto.updated_at = item.updated_at;
      return responseDto;
    });

    return resp;
  }
}
