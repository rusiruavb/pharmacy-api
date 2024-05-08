import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 100 })
  name: string;

  @Column({ nullable: false, length: 100 })
  description: string;

  @CreateDateColumn({ name: 'created_at', type: 'varchar' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'varchar' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'varchar' })
  deletedAt: Date;
}
