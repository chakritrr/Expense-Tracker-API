import { Module } from '@nestjs/common';

import { DataServicesModule } from 'src/frameworks/data-services/data-services.module';
import { ExpenseUpdateUseCase } from './expense-update-use-case';
import { ExpenseUpdateFactoryService } from './expense-update-factory.service';

@Module({
  imports: [DataServicesModule],
  providers: [ExpenseUpdateUseCase, ExpenseUpdateFactoryService],
  exports: [ExpenseUpdateUseCase, ExpenseUpdateFactoryService],
})
export class ExpenseUpdateUseCaseModule {}
