import { Module } from '@nestjs/common';

import { DataServicesModule } from 'src/frameworks/data-services/data-services.module';
import { ExpenseDeleteUseCase } from './expense-delete-use-case';
import { ExpenseDeleteFactoryService } from './expense-delete-factory.service';

@Module({
  imports: [DataServicesModule],
  providers: [ExpenseDeleteUseCase, ExpenseDeleteFactoryService],
  exports: [ExpenseDeleteUseCase, ExpenseDeleteFactoryService],
})
export class ExpenseDeleteUseCaseModule {}
