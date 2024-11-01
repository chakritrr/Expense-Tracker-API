import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker/.';

import {
  ExpenseEntity,
  GetExpenseListResponseDto,
  IExpenseRepository,
} from 'src/core';
import { ExpenseGetListFactoryService } from './expense-get-factory.service';
import { ExpenseGetListUseCase } from './expense-get-list-use-case';

const mockIExpenseRepository = {
  findAll: jest.fn(),
};

const mockExpenseGetListFactoryService = {
  constructResponse: jest.fn(),
};

describe('ExpenseGetListUseCase', () => {
  let expenseGetListUseCase: ExpenseGetListUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpenseGetListUseCase,
        {
          provide: IExpenseRepository,
          useValue: mockIExpenseRepository,
        },
        {
          provide: ExpenseGetListFactoryService,
          useValue: mockExpenseGetListFactoryService,
        },
      ],
    }).compile();

    expenseGetListUseCase = module.get<ExpenseGetListUseCase>(
      ExpenseGetListUseCase,
    );
  });
  it('should be defined', () => {
    expect(expenseGetListUseCase).toBeDefined();
  });

  describe('getExpenseList', () => {
    it('should get a expense and return a response', async () => {
      const mockReqBody: ExpenseEntity = {
        title: faker.commerce.productName(),
        amount: parseFloat(faker.finance.amount()),
        notes: faker.lorem.sentence(),
        category: faker.string.sample(5),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        userId: {
          id: faker.string.uuid(),
        },
      } as ExpenseEntity;

      const mockRes: GetExpenseListResponseDto = {
        id: faker.string.uuid(),
        title: mockReqBody.title,
        amount: mockReqBody.amount,
        category: mockReqBody.category,
        notes: mockReqBody.notes,
        createdAt: mockReqBody.createdAt.toString(),
        updatedAt: mockReqBody.updatedAt.toString(),
      };

      jest
        .spyOn(mockIExpenseRepository, 'findAll')
        .mockReturnValue(mockReqBody);
      jest
        .spyOn(mockExpenseGetListFactoryService, 'constructResponse')
        .mockReturnValue(mockRes);

      const result = await expenseGetListUseCase.getExpenseList();

      expect(mockIExpenseRepository.findAll).toHaveBeenCalled();
      expect(
        mockExpenseGetListFactoryService.constructResponse,
      ).toHaveBeenCalled();
      expect(result).toEqual(mockRes);
    });
  });
});
