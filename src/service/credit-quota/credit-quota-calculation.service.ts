import { NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Injectable } from '@nestjs/common';

import { CreditQuotaRepository } from '../../repository/credit-quota.repository';
import { UserRepository } from '../../repository/user.respository';

import { CreditQuota } from '../../entities/credit-quota';

@Injectable()
export class CreditQuotaCalculationService {
  constructor(
    private readonly creditQuotaRepository: CreditQuotaRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(document: number): Promise<CreditQuota> {
    const user = await this.userRepository.findByDocument(document);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    let creditQuota = await this.creditQuotaRepository.findByUserId(user.id);

    if (creditQuota) {
      return creditQuota;
    }

    const initialAmount = 200000;

    const data = {
      amountAssigned: initialAmount,
      amountAvailable: initialAmount,
      amountUtilized: 0,
      userId: user.id,
    };

    creditQuota = plainToClass(CreditQuota, data);

    return await this.creditQuotaRepository.save(creditQuota);
  }
}
