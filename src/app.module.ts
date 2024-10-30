import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import {
  ExpenseController,
  LoginController,
  RegisterController,
} from './controller';
import { DataServicesModule } from './frameworks/data-services/data-services.module';
import { LoginCreateUseCaseModule } from './use-case/login-create/login-create-use-case.module';
import { RegisterCreateUseCaseModule } from './use-case/register-create/register-create-use-case.module';
import { ExpenseCreateUseCaseModule } from './use-case/expense-create/expense-create-use-case.module';
import { ExpenseGetListUseCaseModule } from './use-case/expense-get-list/expense-get-list-use-case.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    DataServicesModule,
    RegisterCreateUseCaseModule,
    LoginCreateUseCaseModule,
    ExpenseCreateUseCaseModule,
    ExpenseGetListUseCaseModule,
  ],
  controllers: [RegisterController, LoginController, ExpenseController],
})
export class AppModule {}
