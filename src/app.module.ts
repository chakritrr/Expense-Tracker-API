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
import { ExpenseUpdateUseCaseModule } from './use-case/expense-update/expense-update-use-case.module';
import { ExpenseDeleteUseCaseModule } from './use-case/expense-delete/expense-delete-use-case.module';
import { ExpenseReportCreateListUseCaseModule } from './use-case/expense-report-create-list/expense-report-create-list-use-case.module';
import { ExpenseFilterCreateListUseCaseModule } from './use-case/expense-filter-list/expense-filter-list-use-case.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    DataServicesModule,
    RegisterCreateUseCaseModule,
    LoginCreateUseCaseModule,
    ExpenseCreateUseCaseModule,
    ExpenseGetListUseCaseModule,
    ExpenseUpdateUseCaseModule,
    ExpenseDeleteUseCaseModule,
    ExpenseReportCreateListUseCaseModule,
    ExpenseFilterCreateListUseCaseModule,
  ],
  controllers: [RegisterController, LoginController, ExpenseController],
})
export class AppModule {}
