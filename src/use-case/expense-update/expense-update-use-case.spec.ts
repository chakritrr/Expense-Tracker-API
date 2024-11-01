import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker/.';
import { HttpException, HttpStatus } from '@nestjs/common';

import {
  ExpenseEntity,
  IExpenseRepository,
  PatchExpenseResponseDto,
} from 'src/core';
import { ExpenseUpdateFactoryService } from './expense-update-factory.service';
import { ExpenseUpdateUseCase } from './expense-update-use-case';

const mockExpenseUpdateFactoryService = {
  updateExpense: jest.fn(),
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

const mockIExpenseRepository = {
  findOneByIdRelation: jest.fn(),
};

describe('ExpenseUpdateUseCase', () => {
  let expenseUpdateUseCase: ExpenseUpdateUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpenseUpdateUseCase,
        {
          provide: ExpenseUpdateFactoryService,
          useValue: mockExpenseUpdateFactoryService,
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

    expenseUpdateUseCase =
      module.get<ExpenseUpdateUseCase>(ExpenseUpdateUseCase);
  });

  it('should be defined', () => {
    expect(expenseUpdateUseCase).toBeDefined();
  });

  describe('updateExpense', () => {
    it('should update a expense and return a response', async () => {
      const mockParam = faker.string.uuid();
      const mockUserId = mockParam;
      const mockReqBody: ExpenseEntity = {
        title: faker.commerce.productName(),
        amount: parseFloat(faker.finance.amount()),
        notes: faker.lorem.sentence(),
        category: faker.string.sample(5),
        updatedAt: new Date(),
        userId: {
          id: mockUserId,
        },
      } as ExpenseEntity;
      const mockRes: PatchExpenseResponseDto = {
        id: mockUserId,
      };

      jest
        .spyOn(mockIExpenseRepository, 'findOneByIdRelation')
        .mockReturnValue(mockReqBody);
      jest
        .spyOn(mockExpenseUpdateFactoryService, 'updateExpense')
        .mockReturnValue(mockReqBody);
      jest
        .spyOn(mockExpenseUpdateFactoryService, 'constructResponse')
        .mockReturnValue(mockRes);

      const result = await expenseUpdateUseCase.updateExpense(
        mockParam,
        mockReqBody,
        mockUserId,
      );

      const queryRunner = mockDataSource.createQueryRunner();

      expect(mockIExpenseRepository.findOneByIdRelation).toHaveBeenCalled();
      expect(mockExpenseUpdateFactoryService.updateExpense).toHaveBeenCalled();
      expect(
        mockExpenseUpdateFactoryService.constructResponse,
      ).toHaveBeenCalled();
      expect(queryRunner.startTransaction).toHaveBeenCalled();
      expect(queryRunner.manager.save).toHaveBeenCalled();
      expect(queryRunner.commitTransaction).toHaveBeenCalled();
      expect(result).toEqual(mockRes);
    });

    it('should throw an HttpException if the expense not found', async () => {
      const mockParam = faker.string.uuid();
      const mockUserId = mockParam;
      const mockReqBody: ExpenseEntity = {
        title: faker.commerce.productName(),
        amount: parseFloat(faker.finance.amount()),
        notes: faker.lorem.sentence(),
        category: faker.string.sample(5),
        updatedAt: new Date(),
        userId: {
          id: mockUserId,
        },
      } as ExpenseEntity;

      jest
        .spyOn(mockIExpenseRepository, 'findOneByIdRelation')
        .mockReturnValue(null);

      await expect(
        expenseUpdateUseCase.updateExpense(mockParam, mockReqBody, mockUserId),
      ).rejects.toThrow(
        new HttpException('Expense not found', HttpStatus.BAD_REQUEST),
      );

      expect(mockIExpenseRepository.findOneByIdRelation).toHaveBeenCalled();
    });

    it('should throw an HttpException if the you do not have permission to access this expense', async () => {
      const mockParam = faker.string.uuid();
      const mockUserId = faker.string.uuid();
      const mockReqBody: ExpenseEntity = {
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
        .mockReturnValue(mockReqBody);

      await expect(
        expenseUpdateUseCase.updateExpense(mockParam, mockReqBody, mockUserId),
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
