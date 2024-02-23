import { User } from '../entities/user';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByDocument(document: number): Promise<User> {
    try {
      return this.userRepository.findOne({
        where: {
          document,
        },
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
