import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user';

@Entity()
export class Credit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.credits)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  document: number;

  @Column({ type: 'float', default: 0 })
  amount: number;

  @Column({ type: 'float', default: 0 })
  totalAmount: number;

  @Column()
  decision: string;

  @Column({ default: 'Active' })
  status: string;

  @Column()
  paymentDate: string;

  @Column({ default: 0 })
  daysInArrears: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
