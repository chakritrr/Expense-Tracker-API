import { faker } from '@faker-js/faker/.';
import { Test, TestingModule } from '@nestjs/testing';

import { LoginRequestDto, LoginResponseDto } from 'src/core';
import { LoginCreateUseCase } from 'src/use-case/login-create/login-create-use-case';
import { LoginController } from './login.controller';

const mockLoginCreateUseCase = {
  createLogin: jest.fn(),
};

describe('Login-Controller', () => {
  let loginController: LoginController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [
        {
          provide: LoginCreateUseCase,
          useValue: mockLoginCreateUseCase,
        },
      ],
    }).compile();

    loginController = module.get<LoginController>(LoginController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(loginController).toBeDefined();
  });

  describe('createLogin', () => {
    it('should call createLogin successful and return a response', async () => {
      const mockReq: LoginRequestDto = {
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      const mockRes: LoginResponseDto = {
        token: faker.string.uuid(),
      };

      jest
        .spyOn(mockLoginCreateUseCase, 'createLogin')
        .mockReturnValue(mockRes);

      const result = await loginController.createLogin(mockReq);

      expect(mockLoginCreateUseCase.createLogin).toHaveBeenCalled();
      expect(result).toEqual(mockRes);
    });
  });
});
