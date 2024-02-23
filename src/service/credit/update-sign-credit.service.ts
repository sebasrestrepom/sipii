import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

import { Credit } from '../../entities/credit';
import { CreditRepository } from '../../repository/credit.repository';

@Injectable()
export class UpdateSignCreditService {
  constructor(private readonly creditRepository: CreditRepository) {}

  async execute(data: any): Promise<Credit> {
    const credit = await this.creditRepository.findOne(data.document);

    if (!credit) {
      throw new NotFoundException('Credit not found');
    }

    credit.acceptTerms = data.acceptTerms;
    credit.signed = data.signed;

    return this.creditRepository.save(credit);
  }
}
