import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker/.';
import { HttpException, HttpStatus } from '@nestjs/common';

import { ExpenseDeleteUseCase } from './expense-delete-use-case';
import {
  DeleteExpenseResponseDto,
  ExpenseEntity,
  IExpenseRepository,
} from 'src/core';
import { ExpenseDeleteFactoryService } from './expense-delete-factory.service';

const mockExpenseDeleteFactoryService = {
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
      remove: jest.fn(),
    },
  }),
};

const mockIExpenseRepository = {
  findOneByIdRelation: jest.fn(),
};

describe('ExpenseUpdateUseCase', () => {
  let expenseDeleteUseCase: ExpenseDeleteUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpenseDeleteUseCase,
        {
          provide: ExpenseDeleteFactoryService,
          useValue: mockExpenseDeleteFactoryService,
        },
        {
          provide: DataSource,
          useValue: mockDataSource,
        },
        {
          provide: IExpenseRepository,
          useValue: mockIExpenseRepository,
        },
      ],
    }).compile();

    expenseDeleteUseCase =
      module.get<ExpenseDeleteUseCase>(ExpenseDeleteUseCase);
  });

  it('should be defined', () => {
    expect(expenseDeleteUseCase).toBeDefined();
  });

  describe('deleteExpense', () => {
    it('should delete a expense and return a response', async () => {
      const mockParam = faker.string.uuid();
      const mockUserId = mockParam;

      const mockExpenseEntiry: ExpenseEntity = {
        title: faker.commerce.productName(),
        amount: parseFloat(faker.finance.amount()),
        notes: faker.lorem.sentence(),
        category: faker.string.sample(5),
        updatedAt: new Date(),
        userId: {
          id: mockParam,
        },
      } as ExpenseEntity;

      const mockRes: DeleteExpenseResponseDto = {
        id: mockParam,
      };

      jest
        .spyOn(mockIExpenseRepository, 'findOneByIdRelation')
        .mockReturnValue(mockExpenseEntiry);
      jest
        .spyOn(mockExpenseDeleteFactoryService, 'constructResponse')
        .mockReturnValue(mockRes);

      const result = await expenseDeleteUseCase.deleteExpense(
        mockParam,
        mockUserId,
      );
      const queryRunner = mockDataSource.createQueryRunner();

      expect(mockIExpenseRepository.findOneByIdRelation).toHaveBeenCalled();
      expect(
        mockExpenseDeleteFactoryService.constructResponse,
      ).toHaveBeenCalled();
      expect(queryRunner.startTransaction).toHaveBeenCalled();
      expect(queryRunner.manager.remove).toHaveBeenCalled();
      expect(queryRunner.commitTransaction).toHaveBeenCalled();
      expect(result).toEqual(mockRes);
    });

    it('should throw an HttpException if the expense not found', async () => {
      const mockParam = faker.string.uuid();
      const mockUserId = mockParam;

      jest
        .spyOn(mockIExpenseRepository, 'findOneByIdRelation')
        .mockReturnValue(null);

      await expect(
        expenseDeleteUseCase.deleteExpense(mockParam, mockUserId),
      ).rejects.toThrow(
        new HttpException('Expense not found', HttpStatus.BAD_REQUEST),
      );

      expect(mockIExpenseRepository.findOneByIdRelation).toHaveBeenCalled();
    });

    it('should throw an HttpException if the you do not have permission to access this expense', async () => {
      const mockParam = faker.string.uuid();
      const mockUserId = faker.string.uuid();
      const mockExpenseEntiry: ExpenseEntity = {
        title: faker.commerce.productName(),
        amount: parseFloat(faker.finance.amount()),
        notes: faker.lorem.sentence(),
        category: faker.string.sample(5),
        updatedAt: new Date(),
        userId: {
          id: faker.string.uuid(),
        },
      } as ExpenseEntity;

      jest
        .spyOn(mockIExpenseRepository, 'findOneByIdRelation')
        .mockReturnValue(mockExpenseEntiry);

      await expect(
        expenseDeleteUseCase.deleteExpense(mockParam, mockUserId),
      ).rejects.toThrow(
        new HttpException(
          'You do not have permission to access this expense',
          HttpStatus.BAD_REQUEST,
        ),
      );

      expect(mockIExpenseRepository.findOneByIdRelation).toHaveBeenCalled();
    });
  });
});
