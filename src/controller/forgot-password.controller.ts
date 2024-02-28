import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ForgotPasswordService } from '../service/forgot-password/forgot-password.service';
import { RecoverPasswordDto } from './dto/recover-password.dto';
import { RecoverPasswordService } from '../service/forgot-password/recover-password.service';

@Controller('forgot-password')
@ApiTags('Forgot Password Endpoints')
export class ForgotPasswordController {
  constructor(
    private readonly forgotPasswordService: ForgotPasswordService,
    private readonly recoverPasswordService: RecoverPasswordService,
  ) {}

  @Post('/')
  async forgotPassword(@Body() email: ForgotPasswordDto): Promise<string> {
    return this.forgotPasswordService.execute(email);
  }

  @Post('/recover')
  async recoverPassword(
    @Body() data: RecoverPasswordDto,
  ): Promise<{ message: string }> {
    return this.recoverPasswordService.execute(data);
  }
}
