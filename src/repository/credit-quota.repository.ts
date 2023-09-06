import { CreditQuota } from '../entities/credit-quota';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class CreditQuotaRepository {
  constructor(
    @InjectRepository(CreditQuota)
    private creditQuotaRepository: Repository<CreditQuota>,
  ) {}

  async save(creditQuota: CreditQuota): Promise<CreditQuota> {
    return this.creditQuotaRepository.save(creditQuota);
  }

  async findByUserId(userId: number): Promise<CreditQuota> {
    return this.creditQuotaRepository.findOne({
      where: {
        userId,
      },
    });
  }
}
