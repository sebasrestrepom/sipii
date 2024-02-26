import { Injectable } from '@nestjs/common';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { PaymentItemDto } from '../../controller/dto/new-payment-item.dto';

@Injectable()
export class MercadoPagoPreferenceService {
  private client: MercadoPagoConfig;
  private preference: Preference;

  constructor() {
    this.client = new MercadoPagoConfig({
      accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
      options: { timeout: 5000 },
    });
    this.preference = new Preference(this.client);
  }

  async createPreference(preferenceData: {
    items: PaymentItemDto[];
  }): Promise<object> {
    const items = preferenceData.items.map((item) => ({
      id: item.ID,
      title: `Pago crédito Sipii ${item.ID}`,
      quantity: item.quantity,
      currency_id: 'COP',
      unit_price: item.unitPrice,
      external_reference: item.ID,
    }));

    const preferenceBody = {
      items: items,
      payer: {
        identification: {
          type: 'CC',
          number: preferenceData.items[0].document,
        },
      },
      payment_methods: {
        installments: 1,
        default_installments: 1,
      },
      statement_descriptor: 'Pago SIPII',
      back_urls: {
        success: 'http://localhost:3000/dashboard', //CAMBIAR POR VARIABLES DE ENTORNO
        failure: 'http://localhost:3000/dashboard', //CAMBIAR POR VARIABLES DE ENTORNO
        pending: 'http://localhost:3000/dashboard', //CAMBIAR POR VARIABLES DE ENTORNO
      },
      notification_url:
        'https://ec1b-186-83-184-77.ngrok-free.app/mercado-pago/webhook', //CAMBIAR POR VARIABLES DE ENTORNO
    };

    try {
      const preferenceResponse = await this.preference.create({
        body: preferenceBody,
      });
      return { init_point: preferenceResponse.init_point };
    } catch (error) {
      throw error;
    }
  }
}
