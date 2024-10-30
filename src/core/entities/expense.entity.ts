import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'expenses' })
export class ExpenseEntity extends BaseEntity {
  @Column({
    name: 'title',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  title: string;

  @Column({
    name: 'amount',
    type: 'float',
    nullable: false,
  })
  amount: number;

  @Column({
    name: 'notes',
    type: 'text',
    nullable: true,
  })
  notes: string;

  @Column({
    name: 'category',
    type: 'varchar',
    nullable: false,
  })
  category: string;

  @ManyToOne(() => UserEntity, (user) => user.expenses, {
    nullable: true,
  })
  @JoinColumn({ name: 'user_id' })
  userId: UserEntity;
}
