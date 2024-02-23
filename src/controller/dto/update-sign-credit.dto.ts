import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSignCreditDTO {
  @ApiProperty({
    type: 'number',
    description: 'The user identification',
    example: '123456789',
  })
  @IsNotEmpty()
  @IsNumber()
  document: number;

  @ApiProperty({
    type: 'boolean',
    description: 'The terms accepted',
    example: 'true',
  })
  @IsNotEmpty()
  @IsBoolean()
  acceptTerms: boolean;

  @ApiProperty({
    type: 'boolean',
    description: 'The sign of the credit',
    example: 'true',
  })
  @IsNotEmpty()
  @IsBoolean()
  signed: boolean;
}
