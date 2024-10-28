import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import {
  LoginController,
  RegisterController
} from './controller';
import { DataServicesModule } from './frameworks/data-services/data-services.module';
import { LoginCreateUseCaseModule } from './use-case/login-create/login-create-use-case.module';
import { RegisterCreateUseCaseModule } from './use-case/register-create/register-create-use-case.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    DataServicesModule,
    RegisterCreateUseCaseModule,
    LoginCreateUseCaseModule,
  ],
  controllers: [RegisterController, LoginController],
})
export class AppModule {}
