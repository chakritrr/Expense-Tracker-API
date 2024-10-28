import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { faker } from '@faker-js/faker/.';

import {
  IUserRepository,
  LoginRequestDto,
  LoginResponseDto,
  UserEntity,
} from 'src/core';
import { LoginCreateFactoryService } from './login-create-factory.service';
import { LoginCreateUseCase } from './login-create-use-case';

const mockLoginCreateFactoryService = {
  comparePassword: jest.fn(),
  constructResponse: jest.fn(),
};

const mockIUserRepository = {
  findOneByEmail: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn(),
};

describe('LoginCreateUseCase', () => {
  let loginCreateUseCase: LoginCreateUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginCreateUseCase,
        {
          provide: LoginCreateFactoryService,
          useValue: mockLoginCreateFactoryService,
        },
        {
          provide: IUserRepository,
          useValue: mockIUserRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();
    loginCreateUseCase = module.get<LoginCreateUseCase>(LoginCreateUseCase);
  });

  it('should be defined', () => {
    expect(loginCreateUseCase).toBeDefined();
  });

  describe('createLogin', () => {
    it('should login successful and return a response', async () => {
      const mockReq: LoginRequestDto = {
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      const mockUserEntity: UserEntity = {
        email: mockReq.email,
      } as UserEntity;

      const mockToken = {
        token: mockReq.email,
      };

      const mockRes: LoginResponseDto = {
        token: faker.string.uuid(),
      };

      jest
        .spyOn(mockLoginCreateFactoryService, 'comparePassword')
        .mockReturnValue(mockUserEntity);
      jest.spyOn(mockJwtService, 'sign').mockReturnValue(mockToken);
      jest
        .spyOn(mockLoginCreateFactoryService, 'constructResponse')
        .mockReturnValue(mockRes);

      const result = await loginCreateUseCase.createLogin(mockReq);

      expect(mockLoginCreateFactoryService.comparePassword).toHaveBeenCalled()
      expect(mockLoginCreateFactoryService.constructResponse).toHaveBeenCalled()
      expect(mockJwtService.sign).toHaveBeenCalled()
      expect(result).toEqual(mockRes);
    });
  });
});
