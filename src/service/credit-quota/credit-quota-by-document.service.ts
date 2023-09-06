import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

import { CreditQuotaRepository } from '../../repository/credit-quota.repository';
import { UserRepository } from '../../repository/user.respository';

import { CreditQuota } from '../../entities/credit-quota';

@Injectable()
export class CreditQuotaByDocumentService {
  constructor(
    private readonly creditQuotaRepository: CreditQuotaRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(document: number): Promise<CreditQuota> {
    const user = await this.userRepository.findByDocument(document);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const creditQuota = await this.creditQuotaRepository.findByUserId(user.id);

    if (!creditQuota) {
      throw new NotFoundException('Credit quota not found');
    }

    return creditQuota;
  }
}
