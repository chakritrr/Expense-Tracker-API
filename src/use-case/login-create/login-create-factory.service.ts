import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { LoginRequestDto, LoginResponseDto, UserEntity } from 'src/core';

@Injectable()
export class LoginCreateFactoryService {
  async comparePassword(user: UserEntity, loginRequestDto: LoginRequestDto) {
    const { password } = loginRequestDto;

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const payload = { email: user.email, sub: user.id };

      return payload;
    }
    
    throw new HttpException('Invalid username or password', HttpStatus.UNAUTHORIZED);
  }

  constructResponse( token: string) {
    const resp: LoginResponseDto = {
      token: token,
    };
    
    return resp;
  }
}
