import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('payments')
export class PaymentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  paymentId: number;

  @Column({ nullable: true })
  authorizationCode: string;

  @Column({ nullable: true })
  cardholder: string;

  @Column({ nullable: true })
  expirationMonth: number;

  @Column({ nullable: true })
  expirationYear: number;

  @Column({ nullable: true })
  firstSixDigits: string;

  @Column({ nullable: true })
  lastFourDigits: string;

  @Column({ nullable: true })
  currencyId: string;

  @Column({ nullable: true })
  dateApproved: string;

  @Column({ nullable: true })
  dateCreated: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  paymentMethodId: string;

  @Column({ nullable: true })
  paymentTypeId: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  statusDetail: string;

  @Column({ nullable: true })
  transactionAmount: string;

  @Column({ nullable: true })
  items: string;

  @Column({ nullable: true })
  fee_mercadopago: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
