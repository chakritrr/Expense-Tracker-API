import { ExpenseEntity } from '../entities';

export abstract class IExpenseRepository {
  abstract findAll(): Promise<ExpenseEntity[]>;
}
