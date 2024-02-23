import { Controller, Post, Body, Logger } from '@nestjs/common';

import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { SmsMessagesDto } from './dto/sms-messages.dto';
import { SendSMSMessageService } from '../service/sms-message/send-sms-message.service';

@ApiTags('SMS messages Endpoints')
@Controller('send-sms-messages')
export class SmsMessagesController {
  constructor(private sendSMSMessageService: SendSMSMessageService) {}
  @Post('/')
  @ApiOperation({ summary: 'Send validations SMS messages' })
  async identityValidation(@Body() data: SmsMessagesDto): Promise<string> {
    try {
      await this.sendSMSMessageService.execute(
        data.destinataryNumber,
        data.code,
        data.creditId,
      );

      return 'Mensaje enviado exitosamente';
    } catch (error) {
      Logger.error('Error al enviar mensaje SMS:', error);
      throw new Error('Error al enviar mensaje SMS');
    }
  }
}
