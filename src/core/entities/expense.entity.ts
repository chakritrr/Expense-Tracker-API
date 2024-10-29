import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from './base.entity';
import { CategoryEntity } from './category.entity';
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
    name: 'date',
    type: 'date',
    nullable: false,
  })
  date: Date;

  @Column({
    name: 'notes',
    type: 'text',
    nullable: true,
  })
  notes: string;

  @ManyToOne(() => UserEntity, (user) => user.id, {
    nullable: true,
  })
  @JoinColumn({ name: 'user_id' })
  userId: UserEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.id, {
    nullable: true,
  })
  @JoinColumn({ name: 'category_id' })
  categoryId: CategoryEntity;
}
