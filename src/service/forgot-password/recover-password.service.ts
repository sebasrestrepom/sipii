import { BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

import { UserRepository } from '../../repository/user.respository';
import * as bcrypt from 'bcrypt';
import { RecoverPasswordDto } from '../../controller/dto/recover-password.dto';

@Injectable()
export class RecoverPasswordService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: RecoverPasswordDto): Promise<{ message: string }> {
    const user = await this.userRepository.findByRecoveryToken(data.token);

    if (!user) {
      throw new BadRequestException('Usuario no encontrado');
    }

    const nowTimestamp = Date.now();
    if (
      !user.expirationResetPasswordToken ||
      user.expirationResetPasswordToken < nowTimestamp
    ) {
      throw new BadRequestException('El token ha expirado');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    user.password = hashedPassword;

    user.resetPasswordToken = null;
    user.expirationResetPasswordToken = null;

    await this.userRepository.save(user);

    return { message: 'Contraseña actualizada correctamente' };
  }
}
