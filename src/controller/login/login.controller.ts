import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { LoginRequestDto } from 'src/core';
import { LoginCreateUseCase } from 'src/use-case/login-create/login-create-use-case';

@ApiTags('Login-Controller')
@Controller()
export class LoginController {
  constructor(private readonly loginCreateUseCase: LoginCreateUseCase) {}

  @Post('/v1/login')
  createLogin(@Body() loginRequestDto: LoginRequestDto) {
    return this.loginCreateUseCase.createLogin(loginRequestDto);
  }
}
