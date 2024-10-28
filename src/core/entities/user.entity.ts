import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { ExpenseEntity } from './expense.entity';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @Column({
    name: 'email',
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    name: 'password',
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @OneToMany(() => ExpenseEntity, (expense) => expense.userId)
  expenses: ExpenseEntity[];
}
