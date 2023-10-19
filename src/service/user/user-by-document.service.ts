import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

import { UserRepository } from '../../repository/user.respository';

import { User } from 'src/entities/user';

@Injectable()
export class UserByDocumentService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(document: number): Promise<User> {
    const user = await this.userRepository.findByDocument(document);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
