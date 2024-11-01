import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker/.';

import { ExpenseController } from './expense.controller';
import { ExpenseCreateUseCase } from 'src/use-case/expense-create/expense-create-use-case';
import { ExpenseGetListUseCase } from 'src/use-case/expense-get-list/expense-get-list-use-case';
import { ExpenseUpdateUseCase } from 'src/use-case/expense-update/expense-update-use-case';
import { ExpenseDeleteUseCase } from 'src/use-case/expense-delete/expense-delete-use-case';
import {
  DeleteExpenseResponseDto,
  GetExpenseListResponseDto,
  PatchExpenseRequestDto,
  PatchExpenseResponseDto,
  PostExpenseRequestDto,
  PostExpenseResponseDto,
} from 'src/core';

const mockExpenseCreateUseCase = {
  createExpense: jest.fn(),
};

const mockExpenseGetListUseCase = {
  getExpenseList: jest.fn(),
};

const mockExpenseUpdateUseCase = {
  updateExpense: jest.fn(),
};

const mockExpenseDeleteUseCase = {
  deleteExpense: jest.fn(),
};

describe('Login-Controller', () => {
  let expenseController: ExpenseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseController],
      providers: [
        {
          provide: ExpenseCreateUseCase,
          useValue: mockExpenseCreateUseCase,
        },
        {
          provide: ExpenseGetListUseCase,
          useValue: mockExpenseGetListUseCase,
        },
        {
          provide: ExpenseUpdateUseCase,
          useValue: mockExpenseUpdateUseCase,
        },
        {
          provide: ExpenseDeleteUseCase,
          useValue: mockExpenseDeleteUseCase,
        },
      ],
    }).compile();

    expenseController = module.get<ExpenseController>(ExpenseController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(expenseController).toBeDefined();
  });

  describe('postExpense', () => {
    it('should call createExpense successful and return a response', async () => {
      const mockUserId = {
        user: {
          userId: faker.string.uuid(),
        },
      };

      const mockBodyReq: PostExpenseRequestDto = {
        title: faker.commerce.productName(),
        amount: parseFloat(faker.finance.amount()),
        notes: faker.lorem.sentence(),
        category: faker.string.sample(5),
      };

      const mockRes: PostExpenseResponseDto = {
        id: mockUserId.user.userId,
      };

      jest
        .spyOn(mockExpenseCreateUseCase, 'createExpense')
        .mockReturnValue(mockRes);

      const result = await expenseController.postExpense(
        mockBodyReq,
        mockUserId,
      );

      expect(mockExpenseCreateUseCase.createExpense).toHaveBeenCalled();
      expect(result).toEqual(mockRes);
    });
  });

  describe('getExpenseList', () => {
    it('should call getExpenseList successful and return a response', async () => {
      const mockRes: GetExpenseListResponseDto[] = [
        {
          id: faker.string.uuid(),
          title: faker.commerce.productName(),
          amount: parseFloat(faker.finance.amount()),
          notes: faker.lorem.sentence(),
          category: faker.string.sample(5),
          createdAt: faker.date.past().toString(),
          updatedAt: faker.date.past().toString(),
        },
      ];

      jest
        .spyOn(mockExpenseGetListUseCase, 'getExpenseList')
        .mockReturnValue(mockRes);

      const result = await expenseController.getExpenseList();

      expect(mockExpenseGetListUseCase.getExpenseList).toHaveBeenCalled();
      expect(result).toEqual(mockRes);
    });
  });

  describe('patchExpense', () => {
    it('should call updateExpense successful and return a response', async () => {
      const mockUserId = {
        user: {
          userId: faker.string.uuid(),
        },
      };

      const mockReqId = mockUserId.user.userId;

      const mockBodyReq: PatchExpenseRequestDto = {
        title: faker.commerce.productName(),
        amount: parseFloat(faker.finance.amount()),
        notes: faker.lorem.sentence(),
        category: faker.string.sample(5),
      };

      const mockRes: PatchExpenseResponseDto = {
        id: mockUserId.user.userId,
      };

      jest
        .spyOn(mockExpenseUpdateUseCase, 'updateExpense')
        .mockReturnValue(mockRes);

      const result = await expenseController.patchExpense(
        mockReqId,
        mockBodyReq,
        mockUserId,
      );

      expect(mockExpenseUpdateUseCase.updateExpense).toHaveBeenCalled();
      expect(result).toEqual(mockRes);
    });
  });

  describe('deleteExpense', () => {
    it('should call deleteExpense successful and return a response', async () => {
      const mockUserId = {
        user: {
          userId: faker.string.uuid(),
        },
      };

      const mockReqId = mockUserId.user.userId;

      const mockRes: DeleteExpenseResponseDto = {
        id: mockUserId.user.userId,
      };

      jest
        .spyOn(mockExpenseDeleteUseCase, 'deleteExpense')
        .mockReturnValue(mockRes);

      const result = await expenseController.deleteExpense(
        mockReqId,
        mockUserId,
      );

      expect(mockExpenseDeleteUseCase.deleteExpense).toHaveBeenCalled();
      expect(result).toEqual(mockRes);
    });
  });
});
