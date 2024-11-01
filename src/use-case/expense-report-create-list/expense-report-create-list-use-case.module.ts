import { Module } from '@nestjs/common';

import { DataServicesModule } from 'src/frameworks/data-services/data-services.module';
import { ExpenseReportCreateListUseCase } from './expense-report-create-list-use-case';

@Module({
  imports: [DataServicesModule],
  providers: [ExpenseReportCreateListUseCase],
  exports: [ExpenseReportCreateListUseCase],
})
export class ExpenseReportCreateListUseCaseModule {}
