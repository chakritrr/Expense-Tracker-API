import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  ExpenseEntity,
  IExpenseRepository,
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

    const queryParams: any[] = [userId];
    let whereClause = 'WHERE "user_id" = $1';

    if (startDate && endDate) {
      whereClause += ' AND "created_at" BETWEEN $2 AND $3';
      queryParams.push(startDate, endDate);
    }

    const query = `
    SELECT 
      category, 
      ROUND(SUM(amount)::numeric, 2) as "totalAmount", 
      COUNT(*) as "transactionCount"
    FROM expenses
    ${whereClause}
    GROUP BY category
    ORDER BY "totalAmount" DESC
  `;

    const report = await this.expenseEntity.query(query, queryParams);

    const resp = report.map((item) => ({
      category: item.category,
      total: parseFloat(item.totalAmount),
      Count: parseInt(item.transactionCount),
    }));

    return resp;
  }
}
