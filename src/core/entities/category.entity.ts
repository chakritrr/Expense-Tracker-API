import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { ExpenseEntity } from './expense.entity';

@Entity({ name: 'category' })
export class CategoryEntity extends BaseEntity {
  @Column({
    name: 'name',
    length: 50,
    unique: true,
    nullable: false,
  })
  name: string;

  @Column({
    name: 'description',
    length: 255,
    nullable: true,
  })
  description: string;

  @OneToMany(() => ExpenseEntity, (expense) => expense.categoryId)
  expenses: ExpenseEntity[];
}
