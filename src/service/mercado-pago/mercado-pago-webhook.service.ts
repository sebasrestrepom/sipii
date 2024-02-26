import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { CreditRepository } from '../../repository/credit.repository';
import { EmailService } from '../../utils/send-email-message.util';
import { PaymentRepository } from '../../repository/payment.repository';
import { PaymentEntity } from '../../entities/payments';
import { response } from 'express';

@Injectable()
export class MercadoPagoHandleNotificationService {
  private client: MercadoPagoConfig;
  private payment: Payment;

  constructor(
    private readonly creditRepository: CreditRepository,
    private readonly paymentRepository: PaymentRepository,
    private emailService: EmailService,
  ) {
    this.client = new MercadoPagoConfig({
      accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
      options: { timeout: 5000 },
    });
    this.payment = new Payment(this.client);
  }

  async handleMercadoPagoNotification(notification: any): Promise<any> {
    if (notification.type === 'payment' && notification.data) {

      const creditDetails = [];

      try {
        const paymentResponse = await this.payment.get({
          id: notification.data.id,
        });

        const existingPayment = await this.paymentRepository.findByPaymentId(
          paymentResponse.id,
        );

        if (existingPayment && existingPayment.status !== 'in_process') {
          console.log(`El pago con ID ${paymentResponse.id} ya fue procesado.`);
          return;
        }

        if (paymentResponse.status === 'approved') {
          for (const item of paymentResponse.additional_info.items) {
            const credit = await this.creditRepository.findById(+item.id);

            if (!credit) {
              throw new HttpException('The Credit to pay does not exist', 400);
            }

            await this.creditRepository.updateCreditStatus(+item.id, 'Pagado');

            creditDetails.push(credit);
          }
        }

        const payment: PaymentEntity = new PaymentEntity();
        payment.paymentId = paymentResponse?.id;
        payment.authorizationCode = paymentResponse?.authorization_code;
        payment.cardholder = JSON.stringify(paymentResponse?.card?.cardholder);
        payment.expirationMonth = paymentResponse?.card?.expiration_month;
        payment.expirationYear = paymentResponse?.card?.expiration_year;
        payment.firstSixDigits = paymentResponse?.card?.first_six_digits;
        payment.lastFourDigits = paymentResponse?.card?.last_four_digits;
        payment.currencyId = paymentResponse?.currency_id;
        payment.dateApproved = paymentResponse?.date_approved;
        payment.dateCreated = paymentResponse?.date_created;
        payment.description = paymentResponse?.description;
        payment.paymentMethodId = paymentResponse?.payment_method_id;
        payment.paymentTypeId = paymentResponse?.payment_type_id;
        payment.status = paymentResponse?.status;
        payment.statusDetail = paymentResponse?.status_detail;
        payment.transactionAmount = JSON.stringify(
          paymentResponse?.transaction_amount,
        );
        payment.items = JSON.stringify(paymentResponse?.additional_info?.items);
        payment.fee_mercadopago = JSON.stringify(
          paymentResponse?.fee_details[0]?.amount,
        );

        await this.paymentRepository.save(payment);

        //Mnadar email al cliente del pago realizado

        /* await this.emailService.sendEmail(
          creditDetails[0].user.email,
          'Detalles de tu transacción 🧾',
          `
            <p style="
              flex: 1;
              padding: 10px;
              background-color: #ffffff;
              border-radius: 10px;
              width: 100%;
              margin: 5px;
              margin-bottom: 20px;
              margin-top: 20px;
              box-shadow: -9px 10px 28px 0px rgb(147, 145, 147);
              flex-basis: calc(50% - 10px);
              max-width: calc(50% - 10px);">
              Hola ${creditDetails[0].user.name},<br>
              Aquí están los detalles de tu transacción:<br>
              ID de Transacción: ${paymentResponse.authorization_code}<br>
              Monto: ${paymentResponse.transaction_amount}<br>
              Estado: ${paymentResponse.status}<br>
            </p>
          `,
        );*/
        return response.status(200);
      } catch (error) {
        return `Error al obtener los detalles del pago: ${error}`;
      }
    }
  }
}
