import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PaymentEntity } from '../entities/payments';

@Injectable()
export class PaymentRepository {
  constructor(
    @InjectRepository(PaymentEntity)
    private paymentRepository: Repository<PaymentEntity>,
  ) {}

  async save(payment: any): Promise<PaymentEntity> {
    return this.paymentRepository.save(payment);
  }

  async findByPaymentId(paymentId: number): Promise<PaymentEntity> {
    return this.paymentRepository.findOne({
      where: {
        paymentId,
      },
    });
  }
}
