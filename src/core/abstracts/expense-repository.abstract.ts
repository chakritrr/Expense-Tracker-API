import { ExpenseEntity } from '../entities';

export abstract class IExpenseRepository {
  abstract findAll(): Promise<ExpenseEntity[]>;

  abstract findOneByIdRelation(id: string): Promise<ExpenseEntity>;
}
