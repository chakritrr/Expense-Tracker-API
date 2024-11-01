import { DataSource } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker/.';

import { ExpenseCreateUseCase } from './expense-create-use-case';
import { ExpenseCreateFactoryService } from './expense-create-factory.service';
import {
  ExpenseEntity,
  IUserRepository,
  PostExpenseResponseDto,
} from 'src/core';

const mockExpenseCreateFactoryService = {
  createExpense: jest.fn(),
  constructResponse: jest.fn(),
};

const mockDataSource = {
  createQueryRunner: jest.fn().mockReturnValue({
    connect: jest.fn(),
    startTransaction: jest.fn(),
    commitTransaction: jest.fn(),
    rollbackTransaction: jest.fn(),
    release: jest.fn(),
    manager: {
      save: jest.fn(),
    },
  }),
};

const mockIUserRepository = {
  findOneById: jest.fn(),
};

describe('ExpenseCreateUseCase', () => {
  let expenseCreateUseCase: ExpenseCreateUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpenseCreateUseCase,
        {
          provide: ExpenseCreateFactoryService,
          useValue: mockExpenseCreateFactoryService,
        },
        {
          provide: DataSource,
          useValue: mockDataSource,
        },
        {
          provide: IUserRepository,
          useValue: mockIUserRepository,
        },
      ],
    }).compile();

    expenseCreateUseCase =
      module.get<ExpenseCreateUseCase>(ExpenseCreateUseCase);
  });

  it('should be defined', () => {
    expect(expenseCreateUseCase).toBeDefined();
  });

  describe('createExpense', () => {
    it('should create a expense and return a response', async () => {
      const mockUserId = faker.string.uuid();

      const mockReqBody: ExpenseEntity = {
        title: faker.commerce.productName(),
        amount: parseFloat(faker.finance.amount()),
        notes: faker.lorem.sentence(),
        category: faker.string.sample(5),
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: {
          id: mockUserId,
        },
      } as ExpenseEntity;

      const mockRes: PostExpenseResponseDto = {
        id: mockUserId,
      };

      jest.spyOn(mockIUserRepository, 'findOneById').mockReturnValue('');
      jest
        .spyOn(mockExpenseCreateFactoryService, 'createExpense')
        .mockReturnValue(mockReqBody);
      jest
        .spyOn(mockExpenseCreateFactoryService, 'constructResponse')
        .mockReturnValue(mockRes);

      const result = await expenseCreateUseCase.createExpense(
        mockReqBody,
        mockUserId,
      );
      const queryRunner = mockDataSource.createQueryRunner();

      expect(mockIUserRepository.findOneById).toHaveBeenCalled()
      expect(mockExpenseCreateFactoryService.createExpense).toHaveBeenCalled()
      expect(mockExpenseCreateFactoryService.constructResponse).toHaveBeenCalled()
      expect(queryRunner.startTransaction).toHaveBeenCalled();
      expect(queryRunner.manager.save).toHaveBeenCalled();
      expect(queryRunner.commitTransaction).toHaveBeenCalled();
      expect(result).toEqual(mockRes)
    });
  });
});
