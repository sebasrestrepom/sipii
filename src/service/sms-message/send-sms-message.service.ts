import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

import { sendSMS } from '../../utils/send-sms-message.util';
import { CreditRepository } from '../../repository/credit.repository';

@Injectable()
export class SendSMSMessageService {
  constructor(private readonly creditRepository: CreditRepository) {}

  async execute(
    destinataryNumber: string,
    code: number,
    creditId: number,
  ): Promise<void> {
    const credit = await this.creditRepository.findById(creditId);

    if (!credit) {
      throw new NotFoundException('Credit not found');
    }

    credit.verificationCode = code;

    await this.creditRepository.save(credit);

    const textBody = `Tu código de verificación de SIPII es: ${code} Por seguridad no lo compartas con nadie.`;

    return sendSMS(destinataryNumber, textBody);
  }
}
