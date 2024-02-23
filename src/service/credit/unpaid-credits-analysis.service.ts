import { Logger } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

import { CreditRepository } from '../../repository/credit.repository';
import { sendSMS } from '../../utils/send-sms-message.util';
import { EmailService } from '../../utils/send-email-message.util';

@Injectable()
export class UnpaidCreditsAnalysisService {
  constructor(
    private readonly creditRepository: CreditRepository,
    private emailService: EmailService,
  ) {}

  async execute(): Promise<void> {
    const unpaidCredits = await this.creditRepository.findUnpaidCredits();

    if (unpaidCredits.length === 0) {
      Logger.log('No unpaid credits found');
      return;
    }

    let emailBody = `<p style="font-family: Arial, sans-serif; color: black; font-weight: bold;">Créditos en mora:</p><ul>`;

    for (const credit of unpaidCredits) {
      await this.creditRepository.updateUnpaidCredits(
        credit.id,
        credit.paymentDate,
      );

      await sendSMS(
        JSON.stringify(credit.user?.phoneNumber),
        `Hola ${credit.user?.name}, tu obligación crediticia con nosotros se encuentra en MORA. Evita reportes en centrales de riesgo. Contáctanos.`,
      );

      emailBody += `<li><strong>ID:</strong> ${
        credit.id
      }, <strong>Monto:</strong> ${credit.amount.toLocaleString()}, <strong>Días en mora:</strong> ${
        credit.daysInArrears
      }, <strong>Usuario:</strong> ${credit.user?.document}</li>`;
    }

    emailBody += `</ul>`;

    await this.emailService.sendEmail(
      process.env.ADMIN_EMAIL,
      'Reporte diario de créditos en mora 📉🧾',
      emailBody,
    );

    Logger.log('Reporte de créditos en mora enviado correctamente.');
  }
}
