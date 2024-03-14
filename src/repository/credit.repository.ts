import { Injectable } from '@nestjs/common';
import { LessThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Credit } from '../entities/credit';
import { differenceInCalendarDays } from 'date-fns';

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

  async findOne(document: number): Promise<Credit> {
    return this.creditRepository.findOne({
      where: {
        document,
        status: 'Pendiente',
      },
    });
  }

  async remove(document: number) {
    await this.creditRepository.delete({
      document: document,
      status: 'Pendiente',
    });
  }

  async calculateActiveCreditsTotal(userId: number): Promise<number> {
    const result = await this.creditRepository
      .createQueryBuilder('credit')
      .select('SUM(credit.amount)', 'sum')
      .where('credit.userId = :userId', { userId })
      .andWhere(
        '(credit.status = :activeStatus OR credit.status = :pendingStatus OR credit.status = :overdueStatus OR credit.status = :readyForDisburmentStatus)',
        {
          activeStatus: 'Activo',
          pendingStatus: 'Pendiente',
          overdueStatus: 'En Mora',
          readyForDisburmentStatus: 'Listo para desembolso',
        },
      )
      .getRawOne();

    return Number(result.sum) || 0;
  }

  async findById(creditId: number): Promise<Credit> {
    return this.creditRepository.findOne({
      where: {
        id: creditId,
      },
      relations: { user: true },
    });
  }

  async removePendingCredits() {
    const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000);

    await this.creditRepository
      .createQueryBuilder()
      .delete()
      .from(Credit)
      .where('status = :status', { status: 'Pendiente' })
      .andWhere('created_at <= :twelveHoursAgo', { twelveHoursAgo })
      .execute();
  }

  async findUnpaidCredits() {
    const today = new Date();
    const formattedToday = `${today.getDate()}/${
      today.getMonth() + 1
    }/${today.getFullYear()}`;

    const findUnpaidCredits = await this.creditRepository.find({
      where: {
        status: 'Activo',
        paymentDate: LessThan(formattedToday),
      },
      relations: { user: true },
    });

    return findUnpaidCredits;
  }

  async updateUnpaidCredits(id: number, paymentDate: string) {
    const paymentDateParts = paymentDate.split('/').map(Number);
    const paymentDateObj = new Date(
      paymentDateParts[2],
      paymentDateParts[1] - 1,
      paymentDateParts[0],
    );

    const today = new Date();

    const daysInArrears = differenceInCalendarDays(today, paymentDateObj);

    await this.creditRepository.update(id, {
      status: 'En Mora',
      daysInArrears,
    });
  }

  async updateCreditStatus(id: number, status: string) {
    await this.creditRepository.update(id, {
      status,
    });
  }
}
