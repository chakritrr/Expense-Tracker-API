import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker/.';

import { RegisterController } from './register.controller';
import { RegisterCreateUseCase } from 'src/use-case/register-create/register-create-use-case';
import { RegisterRequestDto } from 'src/core';
import { RegisterResponseDto } from 'src/core/dtos/register/register-response.dto';

const mockRegisterCreateUseCase = {
  createRegister: jest.fn(),
};

describe('Register-Controller', () => {
  let registerController: RegisterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegisterController],
      providers: [
        {
          provide: RegisterCreateUseCase,
          useValue: mockRegisterCreateUseCase,
        },
      ],
    }).compile();

    registerController = module.get<RegisterController>(RegisterController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(registerController).toBeDefined();
  });

  describe('createRegister', () => {
    it('should call createRegister successful and return a response', async () => {
      const mockReq: RegisterRequestDto = {
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      const mockRes: RegisterResponseDto = {
        id: faker.string.uuid(),
      };

      jest
        .spyOn(mockRegisterCreateUseCase, 'createRegister')
        .mockReturnValue(mockRes);

      const result = await registerController.createRegister(mockReq);

      expect(mockRegisterCreateUseCase.createRegister).toHaveBeenCalled();
      expect(result).toEqual(mockRes);
    });
  });
});
