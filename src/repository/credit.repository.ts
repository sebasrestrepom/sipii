import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Credit } from '../entities/credit';

@Injectable()
export class CreditRepository {
  constructor(
    @InjectRepository(Credit)
    private creditRepository: Repository<Credit>,
  ) {}

  async save(credit: Credit): Promise<Credit> {
    return this.creditRepository.save(credit);
  }

  async findByDocument(document: number): Promise<Credit[]> {
    return this.creditRepository.find({
      where: {
        document,
        decision: 'Approved',
      },
    });
  }
}
