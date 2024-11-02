import { Module } from '@nestjs/common';

import { DataServicesModule } from 'src/frameworks/data-services/data-services.module';
import { ExpenseFilterCreateListUseCase } from './expense-filter-list-use-case';

@Module({
  imports: [DataServicesModule],
  providers: [ExpenseFilterCreateListUseCase],
  exports: [ExpenseFilterCreateListUseCase],
})
export class ExpenseFilterCreateListUseCaseModule {}
