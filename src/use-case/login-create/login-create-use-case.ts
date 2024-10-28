import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { IUserRepository, LoginRequestDto } from 'src/core';
import { LoginCreateFactoryService } from './login-create-factory.service';

@Injectable()
export class LoginCreateUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly iUserRepository: IUserRepository,
    private readonly loginCreateFactoryService: LoginCreateFactoryService,
  ) {}

  async createLogin(loginRequestDto: LoginRequestDto) {
    const { email } = loginRequestDto;

    const userEntity = await this.iUserRepository.findOneByEmail(email);
    const payload = await this.loginCreateFactoryService.comparePassword(userEntity, loginRequestDto,);
    const token = this.jwtService.sign(payload);

    return this.loginCreateFactoryService.constructResponse(token);
  }
}
