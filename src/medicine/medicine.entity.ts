import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('medicines')
export class Medicine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 100 })
  name: string;

  @Column({ nullable: false, length: 2000 })
  description: string;

  @Column({ nullable: false })
  quantity: number;

  @Column({ nullable: false, type: 'decimal' })
  price: number;

  @CreateDateColumn({ name: 'created_at', type: 'varchar' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'varchar' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'varchar' })
  deletedAt: Date;
}
