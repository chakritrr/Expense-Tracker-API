import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'created_at',
    type: 'date',
    nullable: true,
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'date',
    nullable: true,
  })
  updatedAt: Date;

  @Column({
    name: 'deleted_at',
    type: 'date',
    nullable: true,
  })
  deletedAt: Date;
}
