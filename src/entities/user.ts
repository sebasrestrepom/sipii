import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  document: number;

  @Column()
  age: number;

  @Column()
  city: string;

  @Column()
  address: string;

  @Column()
  password: string;
}
