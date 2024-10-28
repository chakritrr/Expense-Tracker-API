import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';

import { faker } from '@faker-js/faker/.';
import { IUserRepository, UserEntity } from 'src/core';
import { RegisterRequestDto } from 'src/core/dtos';
import { RegisterResponseDto } from 'src/core/dtos/register/register-response.dto';
import { RegisterCreateFactoryService } from './register-create-factory.service';
import { RegisterCreateUseCase } from './register-create-use-case';

const mockUserRepository = {
  findOneByEmail: jest.fn(),
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

const mockRegisterCreateFactoryService = {
  createResgister: jest.fn(),
  constructResponse: jest.fn(),
};

describe('RegisterCreateUseCase', () => {
  let registerCreateUseCase: RegisterCreateUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterCreateUseCase,
        {
          provide: IUserRepository,
          useValue: mockUserRepository,
        },
        {
          provide: DataSource,
          useValue: mockDataSource,
        },
        {
          provide: RegisterCreateFactoryService,
          useValue: mockRegisterCreateFactoryService,
        },
      ],
    }).compile();

    registerCreateUseCase = module.get<RegisterCreateUseCase>(
      RegisterCreateUseCase,
    );
  });

  it('should be defined', () => {
    expect(registerCreateUseCase).toBeDefined();
  });

  describe('createRegister', () => {
    it('should create a user and return a response', async () => {
      const mockReq: RegisterRequestDto = {
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      const mockUserEntity: UserEntity = {
        email: faker.internet.email(),
        password: faker.internet.password(),
        id: faker.string.uuid(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        deletedAt: faker.date.past(),
      } as UserEntity;

      const mockRes: RegisterResponseDto = {
        id: faker.string.uuid(),
      };

      jest
        .spyOn(mockRegisterCreateFactoryService, 'createResgister')
        .mockReturnValue(mockUserEntity);
      jest
        .spyOn(mockRegisterCreateFactoryService, 'constructResponse')
        .mockReturnValue(mockRes);

      const result = await registerCreateUseCase.createRegister(mockReq);

      const queryRunner = mockDataSource.createQueryRunner();

      expect(
        mockRegisterCreateFactoryService.createResgister,
      ).toHaveBeenCalled();
      expect(
        mockRegisterCreateFactoryService.constructResponse,
      ).toHaveBeenCalled();
      expect(queryRunner.startTransaction).toHaveBeenCalled();
      expect(queryRunner.manager.save).toHaveBeenCalled();
      expect(queryRunner.commitTransaction).toHaveBeenCalled();
      expect(result).toEqual(mockRes);
    });
  });
});
