import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty({
    type: 'string',
    description: 'The user email',
    example: 'sebas@sebas.com',
  })
  @IsNotEmpty()
  email: string;
}
