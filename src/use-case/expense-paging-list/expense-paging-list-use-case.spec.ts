import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker/.';

import { ExpensePagingCreateListUseCase } from './expense-paging-list-use-case';
import {
  IExpenseRepository,
  PostExpensePagingRequestDto,
  PostExpensePagingResponseDto,
} from 'src/core';

const mockIExpenseRepository = {
    findExpensePaging: jest.fn(),
};

describe('ExpensePagingCreateListUseCase', () => {
  let expensePagingCreateListUseCase: ExpensePagingCreateListUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpensePagingCreateListUseCase,
        {
          provide: IExpenseRepository,
          useValue: mockIExpenseRepository,
        },
      ],
    }).compile();

    expensePagingCreateListUseCase = module.get<ExpensePagingCreateListUseCase>(
      ExpensePagingCreateListUseCase,
    );
  });

  it('should be defined', () => {
    expect(expensePagingCreateListUseCase).toBeDefined();
  });

  describe('createExpensePagingList', () => {
    it('should get a expense paging list and return a response', async () => {
      const mockUserId = faker.string.uuid();

      const mockReq: PostExpensePagingRequestDto = {
        startDate: faker.date.past().toString(),
        endDate: faker.date.past().toString(),
        category: faker.string.sample(5),
        page: 1,
        limit: 4,
      };

      const mockRes: PostExpensePagingResponseDto = {
        id: faker.string.uuid(),
        created_at: mockReq.startDate,
        updated_at: faker.date.past().toString(),
        title: faker.commerce.productName(),
        amount: parseFloat(faker.finance.amount()),
        notes: faker.lorem.sentence(),
        category: mockReq.category,
      };

      jest
        .spyOn(mockIExpenseRepository, 'findExpensePaging')
        .mockReturnValue(mockRes);

      const result =
        await expensePagingCreateListUseCase.createExpensePagingList(
          mockReq,
          mockUserId,
        );

      expect(mockIExpenseRepository.findExpensePaging).toHaveBeenCalled();
      expect(result).toEqual(mockRes);
    });
  });
});
