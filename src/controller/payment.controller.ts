import { Body, Controller, Post, Res } from '@nestjs/common';
import { MercadoPagoPreferenceService } from '../service/mercado-pago/mercado-pago-preference.service';
import { PaymentDto } from './dto/new-payment.dto';
import { ApiTags } from '@nestjs/swagger';
import { MercadoPagoHandleNotificationService } from '../service/mercado-pago/mercado-pago-webhook.service';
import { Response } from 'express';

@Controller('mercado-pago')
@ApiTags('Payment mercado pago Endpoints')
export class MercadoPagoController {
  constructor(
    private readonly mercadoPagoPreferenceService: MercadoPagoPreferenceService,
    private readonly mercadoPagoHandleNotificationService: MercadoPagoHandleNotificationService,
  ) {}

  @Post('payment')
  async createPayment(@Body() paymentData: PaymentDto): Promise<object> {
    return this.mercadoPagoPreferenceService.createPreference(paymentData);
  }

  @Post('webhook')
  async handleMercadopagoNotification(
    @Body() notification: any,
    @Res() res: Response,
  ) {
    await this.mercadoPagoHandleNotificationService.handleMercadoPagoNotification(
      notification,
    );

    res.status(200).send('OK');
  }
}
