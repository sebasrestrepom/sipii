import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

import { CreditRepository } from '../../repository/credit.repository';

@Injectable()
export class DeleteCreditsByDocumentService {
  constructor(private readonly creditRepository: CreditRepository) {}

  async execute(document: number) {
    const credit = await this.creditRepository.findOne(document);

    if (!credit) {
      throw new NotFoundException('Credit not found with status Pendiente');
    }

    await this.creditRepository.remove(document);
  }
}
