import { User } from '../entities/user';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(User) private authRepository: Repository<User>,
  ) {}

  async findOne(document: number): Promise<User> {
    return await this.authRepository.findOne({
      where: {
        document,
      },
    });
  }

  async save(data: any): Promise<User> {
    return await this.authRepository.save(data);
  }
}
