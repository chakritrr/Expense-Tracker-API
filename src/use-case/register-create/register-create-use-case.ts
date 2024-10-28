import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { IUserRepository } from 'src/core';
import { RegisterRequestDto } from 'src/core/dtos';
import { RegisterCreateFactoryService } from './register-create-factory.service';

@Injectable()
export class RegisterCreateUseCase {
  constructor(
    private readonly dataSource: DataSource,
    private readonly iUserRepository: IUserRepository,
    private readonly registerCreateFactoryService: RegisterCreateFactoryService,
  ) {}

  async createRegister(registerRequestDto: RegisterRequestDto) {
    const { email } = registerRequestDto;
    const user = await this.iUserRepository.findOneByEmail(email);

    if (user) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const userEntity =
        await this.registerCreateFactoryService.createResgister(
          registerRequestDto,
        );
      await queryRunner.manager.save(userEntity);
      await queryRunner.commitTransaction();

      return this.registerCreateFactoryService.constructResponse(userEntity.id);
    } catch (error) {
      console.error(error);
      const statusCode = error.code
        ? error.code
        : HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(error.message, statusCode);
    } finally {
      await queryRunner.release();
    }
  }
}
