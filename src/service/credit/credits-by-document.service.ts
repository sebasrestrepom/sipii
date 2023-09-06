import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

import { CreditRepository } from '../../repository/credit.repository';
import { UserRepository } from '../../repository/user.respository';

import { Credit } from '../../entities/credit';

@Injectable()
export class CreditsByDocumentService {
  constructor(
    private readonly creditRepository: CreditRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(document: number): Promise<Credit[]> {
    const user = await this.userRepository.findByDocument(document);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const credits = await this.creditRepository.findByDocument(document);

    if (!credits) {
      throw new NotFoundException('Credits not found');
    }

    return credits;
  }
}
