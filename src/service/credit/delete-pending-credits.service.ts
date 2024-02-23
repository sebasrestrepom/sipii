import { Injectable } from '@nestjs/common';

import { CreditRepository } from '../../repository/credit.repository';

@Injectable()
export class DeletePendingCreditsService {
  constructor(private readonly creditRepository: CreditRepository) {}

  async execute() {
    await this.creditRepository.removePendingCredits();
  }
}
