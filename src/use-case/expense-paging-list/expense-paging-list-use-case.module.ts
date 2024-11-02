import { Module } from '@nestjs/common';

import { DataServicesModule } from 'src/frameworks/data-services/data-services.module';
import { ExpensePagingCreateListUseCase } from './expense-paging-list-use-case';

@Module({
  imports: [DataServicesModule],
  providers: [ExpensePagingCreateListUseCase],
  exports: [ExpensePagingCreateListUseCase],
})
export class ExpensePagingCreateListUseCaseModule {}
