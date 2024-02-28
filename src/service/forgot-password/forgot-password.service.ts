import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

import { EmailService } from '../../utils/send-email-message.util';
import { UserRepository } from '../../repository/user.respository';
import { ForgotPasswordDto } from '../../controller/dto/forgot-password.dto';
import * as crypto from 'crypto';

@Injectable()
export class ForgotPasswordService {
  constructor(
    private readonly userRepository: UserRepository,
    private emailService: EmailService,
  ) {}

  async execute(data: ForgotPasswordDto): Promise<string> {
    const { FRON_APP_URL } = process.env;
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const token = this.generateRecoveryToken();

    const expirationDate = new Date();

    user.resetPasswordToken = token;
    user.expirationResetPasswordToken = expirationDate.setHours(
      expirationDate.getHours() + 1,
    );

    await this.userRepository.save(user);

    await this.emailService.sendEmail(
      user.email,
      'Recuperación de Contraseña',
      `Para restablecer tu contraseña, sigue este enlace: ${FRON_APP_URL}/recover/${token}`,
    );

    return 'Email de recuperación de contraseña enviado';
  }

  private generateRecoveryToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }
}
