import { Module } from '@nestjs/common';

import { DataServicesModule } from 'src/frameworks/data-services/data-services.module';
import { ExpenseCreateUseCase } from './expense-create-use-case';
import { ExpenseCreateFactoryService } from './expense-create-factory.service';

@Module({
  imports: [DataServicesModule],
  providers: [ExpenseCreateUseCase, ExpenseCreateFactoryService],
  exports: [ExpenseCreateUseCase, ExpenseCreateFactoryService],
})
export class ExpenseCreateUseCaseModule {}
