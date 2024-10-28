import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RegisterRequestDto } from 'src/core/dtos';
import { RegisterCreateUseCase } from 'src/use-case/register-create/register-create-use-case';

@ApiTags('Register-Controller')
@Controller()
export class RegisterController {
  constructor(private readonly registerCreateUseCase: RegisterCreateUseCase) {}

  @Post('/v1/register')
  createRegister(@Body() registerRequestDto: RegisterRequestDto) {
    return this.registerCreateUseCase.createRegister(registerRequestDto);
  }
}
