import { Logger } from '@nestjs/common';
import * as Twilio from 'twilio';

const client = Twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
);

export async function sendSMS(
  destinataryNumber: string,
  textBody: string,
): Promise<void> {
  try {
    const message = await client.messages.create({
      body: textBody,
      to: `+57${destinataryNumber}`,
      from: process.env.TWILIO_PHONE_NUMBER,
    });
    Logger.log(
      'mensaje sms enviado:',
      message.sid,
      'body:',
      message.body,
      'destinatary:',
      message.to,
    );
  } catch (error) {
    Logger.error('Error al enviar mensaje sms:', error);
  }
}
