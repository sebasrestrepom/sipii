import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

import { CreditQuotaRepository } from '../../repository/credit-quota.repository';
import { UserRepository } from '../../repository/user.respository';

import { RequestCredit } from './interfaces/credit-request.interface';
import { Credit } from '../../entities/credit';
import { CreditRepository } from '../../repository/credit.repository';

@Injectable()
export class CreditRequestService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly creditQuotaRepository: CreditQuotaRepository,
    private readonly creditRepository: CreditRepository,
  ) {}

  async execute(data: RequestCredit): Promise<Credit> {
    const user = await this.userRepository.findByDocument(data.document);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const creditQuota = await this.creditQuotaRepository.findByUserId(user.id);

    const decision: string =
      data.amount <= creditQuota.amountAvailable ? 'Approved' : 'Denied';

    if (decision === 'Approved') {
      creditQuota.amountAvailable -= data.amount;
      creditQuota.amountUtilized += data.amount;
      await this.creditQuotaRepository.save(creditQuota);
    }

    const credit: Credit = new Credit();
    credit.userId = user.id;
    credit.document = user.document;
    credit.amount = data.amount;
    credit.totalAmount = data.totalAmount;
    credit.decision = decision;
    credit.paymentDate = data.paymentDate;
    credit.status = data.status;

    const creditSaved = await this.creditRepository.save(credit);

    return creditSaved;
  }
}
