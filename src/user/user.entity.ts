import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Role } from '../role/role.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 100 })
  firstName: string;

  @Column({ nullable: false, length: 100 })
  lastName: string;

  @Column({ nullable: false, length: 10 })
  phoneNumber: string;

  @Column({ nullable: false, length: 100 })
  userName: string;

  @Column({ nullable: false, length: 80 })
  password: string;

  @ManyToOne(() => Role)
  role: Role;

  @CreateDateColumn({ name: 'created_at', type: 'varchar' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'varchar' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'varchar' })
  deletedAt: Date;
}
