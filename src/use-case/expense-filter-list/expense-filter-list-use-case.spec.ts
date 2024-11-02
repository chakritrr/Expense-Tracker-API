import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker/.';

import { ExpenseFilterCreateListUseCase } from './expense-filter-list-use-case';
import {
  IExpenseRepository,
  PostExpenseFilterRequestDto,
  PostExpenseFilterResponseDto,
} from 'src/core';

const mockIExpenseRepository = {
  findExpenseFilter: jest.fn(),
};

describe('ExpenseFilterCreateListUseCase', () => {
  let expenseFilterCreateListUseCase: ExpenseFilterCreateListUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpenseFilterCreateListUseCase,
        {
          provide: IExpenseRepository,
          useValue: mockIExpenseRepository,
        },
      ],
    }).compile();

    expenseFilterCreateListUseCase = module.get<ExpenseFilterCreateListUseCase>(
      ExpenseFilterCreateListUseCase,
    );
  });

  it('should be defined', () => {
    expect(expenseFilterCreateListUseCase).toBeDefined();
  });

  describe('createExpenseFilterList', () => {
    it('should get a expense filter list and return a response', async () => {
      const mockUserId = faker.string.uuid();

      const mockReq: PostExpenseFilterRequestDto = {
        startDate: faker.date.past().toString(),
        endDate: faker.date.past().toString(),
        category: faker.string.sample(5),
      };

      const mockRes: PostExpenseFilterResponseDto = {
        id: faker.string.uuid(),
        created_at: mockReq.startDate,
        updated_at: faker.date.past().toString(),
        title: faker.commerce.productName(),
        amount: parseFloat(faker.finance.amount()),
        notes: faker.lorem.sentence(),
        category: mockReq.category,
      };

      jest
        .spyOn(mockIExpenseRepository, 'findExpenseFilter')
        .mockReturnValue(mockRes);

      const result =
        await expenseFilterCreateListUseCase.createExpenseFilterList(
          mockReq,
          mockUserId,
        );

      expect(mockIExpenseRepository.findExpenseFilter).toHaveBeenCalled();
      expect(result).toEqual(mockRes);
    });
  });
});
