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

  @ManyToOne(() => User, (user) => user.credits)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: number;

  @Column()
  document: number;

  @Column({ type: 'float', default: 0 })
  amount: number;

  @Column({ type: 'float', default: 0 })
  totalAmount: number;

  @Column()
  decision: string;

  @Column({ default: 'Pendiente' })
  status: string;

  @Column()
  paymentDate: string;

  @Column({ default: 0 })
  daysInArrears: number;

  @Column({ type: 'boolean', nullable: true })
  disbursed: boolean;

  @Column({ type: 'boolean', nullable: true })
  acceptTerms: boolean;

  @Column({ type: 'boolean', nullable: true })
  signed: boolean;

  @Column({ nullable: true })
  verificationCode: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
