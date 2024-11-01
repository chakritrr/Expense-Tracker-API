import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker/.';

import { ExpenseReportCreateListUseCase } from './expense-report-create-list-use-case';
import {
  IExpenseRepository,
  PostExpenseReportListRequestDto,
  PostExpenseReportListResponseDto,
} from 'src/core';

const mockIExpenseRepository = {
  findReport: jest.fn(),
};

describe('ExpenseReportCreateListUseCase', () => {
  let expenseReportCreateListUseCase: ExpenseReportCreateListUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpenseReportCreateListUseCase,
        {
          provide: IExpenseRepository,
          useValue: mockIExpenseRepository,
        },
      ],
    }).compile();

    expenseReportCreateListUseCase = module.get<ExpenseReportCreateListUseCase>(
      ExpenseReportCreateListUseCase,
    );
  });

  it('should be defined', () => {
    expect(expenseReportCreateListUseCase).toBeDefined();
  });

  describe('createExpenseReportList', () => {
    it('should get a expense report list and return a response', async () => {
      const mockUserId = faker.string.uuid();

      const mockReq: PostExpenseReportListRequestDto = {
        startDate: faker.date.past().toString(),
        endDate: faker.date.past().toString(),
      };

      const mockRes: PostExpenseReportListResponseDto = {
        category: faker.string.sample(5),
        total: parseFloat(faker.finance.amount()),
        count: parseInt(faker.finance.amount()),
      };

      jest.spyOn(mockIExpenseRepository, 'findReport').mockReturnValue(mockRes);

      const result =
        await expenseReportCreateListUseCase.createExpenseReportList(
          mockReq,
          mockUserId,
        );

      expect(mockIExpenseRepository.findReport).toHaveBeenCalled();
      expect(result).toEqual(mockRes);
    });
  });
});
