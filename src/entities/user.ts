import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { IsEmail } from 'class-validator';

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
}
