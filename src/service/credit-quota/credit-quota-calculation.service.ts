import { NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Injectable } from '@nestjs/common';

import { CreditQuotaRepository } from '../../repository/credit-quota.repository';
import { UserRepository } from '../../repository/user.respository';

import { CreditQuota } from '../../entities/credit-quota';
import { CreditRepository } from '../../repository/credit.repository';

@Injectable()
export class CreditQuotaCalculationService {
  constructor(
    private readonly creditQuotaRepository: CreditQuotaRepository,
    private readonly creditRepository: CreditRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(document: number): Promise<CreditQuota> {
    const user = await this.userRepository.findByDocument(document);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    let creditQuota = await this.creditQuotaRepository.findByUserId(user.id);

    const activeCreditsTotal =
      await this.creditRepository.calculateActiveCreditsTotal(user.id);

    const initialAmount = 200000;
    const amountUtilized = +activeCreditsTotal;
    const amountAvailable = initialAmount - +amountUtilized;

    if (!creditQuota) {
      const data = {
        amountAssigned: initialAmount,
        amountAvailable,
        amountUtilized,
        userId: user.id,
      };
      creditQuota = plainToClass(CreditQuota, data);
    } else {
      creditQuota.amountUtilized = +amountUtilized;
      creditQuota.amountAvailable = amountAvailable;
    }

    return await this.creditQuotaRepository.save(creditQuota);
  }
}
