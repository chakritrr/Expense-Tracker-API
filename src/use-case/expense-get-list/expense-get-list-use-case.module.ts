import { Module } from '@nestjs/common';

import { DataServicesModule } from 'src/frameworks/data-services/data-services.module';
import { ExpenseGetListUseCase } from './expense-get-list-use-case';
import { ExpenseGetListFactoryService } from './expense-get-factory.service';

@Module({
  imports: [DataServicesModule],
  providers: [ExpenseGetListUseCase, ExpenseGetListFactoryService],
  exports: [ExpenseGetListUseCase, ExpenseGetListFactoryService],
})
export class ExpenseGetListUseCaseModule {}
