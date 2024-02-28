import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
} from 'typeorm';
import { IsEmail } from 'class-validator';

import { Credit } from './credit';

@Entity()
@Unique(['email', 'document'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  documentType: string;

  @Column()
  document: number;

  @Column()
  @IsEmail()
  email: string;

  @Column('bigint')
  phoneNumber: number;

  @Column()
  age: number;

  @Column()
  department: string;

  @Column()
  city: string;

  @Column()
  address: string;

  @Column()
  password: string;

  @Column({ type: 'text', nullable: true })
  documentPhoto: string;

  @Column({ type: 'text', nullable: true })
  selfiePhoto: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date;

  @Column({ type: 'date', nullable: true })
  dateDocumentIssuance: Date;

  @Column({ type: 'varchar', nullable: true })
  gender: string;

  @Column({ type: 'varchar', nullable: true })
  maritalStatus: string;

  @Column({ type: 'varchar', nullable: true })
  householdComposition: string;

  @Column({ type: 'int', nullable: true })
  sons: number;

  @Column({ type: 'int', nullable: true })
  economicDependents: number;

  @Column({ type: 'varchar', nullable: true })
  levelStudy: string;

  @Column({ type: 'int', nullable: true })
  houseStratum: number;

  @Column({ type: 'varchar', nullable: true })
  discoveryChannel: string;

  @Column({ type: 'varchar', nullable: true })
  occupation: string;

  @Column({ type: 'varchar', nullable: true })
  job: string;

  @Column({ type: 'int', nullable: true })
  yearsExperience: number;

  @Column({ type: 'varchar', nullable: true })
  companyType: string;

  @Column({ type: 'varchar', nullable: true })
  companyName: string;

  @Column({ type: 'varchar', nullable: true })
  contractType: string;

  @Column({ type: 'float', nullable: true })
  monthlyIncome: number;

  @Column({ type: 'varchar', nullable: true })
  bankName: string;

  @Column({ type: 'bigint', nullable: true })
  bankAccount: number;

  @Column({ type: 'boolean', nullable: true })
  isValidated: boolean;

  @OneToMany(() => Credit, (credit) => credit.user)
  credits: Credit[];

  @Column({ nullable: true })
  resetPasswordToken: string;

  @Column({ type: 'bigint', nullable: true })
  expirationResetPasswordToken: number;
}
