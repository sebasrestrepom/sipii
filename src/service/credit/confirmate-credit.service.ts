import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

import { CreditRepository } from '../../repository/credit.repository';
import { sendSMS } from '../../utils/send-sms-message.util';

import { Credit } from '../../entities/credit';
import { EmailService } from '../../utils/send-email-message.util';

@Injectable()
export class ConfirmateCreditService {
  constructor(
    private readonly creditRepository: CreditRepository,
    private emailService: EmailService,
  ) {}

  async execute(creditId: number): Promise<Credit> {
    const credit = await this.creditRepository.findById(creditId);

    if (!credit) {
      throw new NotFoundException('Credit not found');
    }

    const textBody = `Crédito listo para desembolsar 🎊 ID: ${creditId} Monto: ${credit.amount.toLocaleString()} Fecha de pago: ${
      credit.paymentDate
    }`;

    await sendSMS(process.env.ADMIN_PHONE_NUMBER, textBody);

    await this.emailService.sendEmail(
      process.env.ADMIN_EMAIL,
      'Credito listo para desembolso ✅ 💸',
      `<p style="background-color: #f0e68c;
          padding: 20px; 
          border: 1px solid #ccc;
          box-shadow: 3px 3px 5px 0px rgba(0,0,0,0.3);
          font-family: Arial, sans-serif; 
          color: black;">
        Crédito listo para desembolsar 🎊<br>ID: ${creditId}<br>Monto: ${credit.amount.toLocaleString()} <br>Fecha de pago: ${
        credit.paymentDate
      }
    </p>`,
    );

    credit.status = 'Listo para desembolso';

    return this.creditRepository.save(credit);
  }
}
