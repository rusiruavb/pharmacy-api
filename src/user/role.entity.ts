import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Permission } from './permission.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 100 })
  name: string;

  @Column({ nullable: false, length: 100 })
  description: string;

  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Permission[];

  @CreateDateColumn({ name: 'created_at', type: 'varchar' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'varchar' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'varchar' })
  deletedAt: Date;
}
