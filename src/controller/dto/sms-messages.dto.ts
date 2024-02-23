import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SmsMessagesDto {
  @ApiProperty({
    type: 'number',
    description: 'The verification code',
    example: '453265',
  })
  @IsNotEmpty()
  @IsNumber()
  code: number;

  @ApiProperty({
    type: 'string',
    description: 'The number of the destinatary',
    example: '315123456',
  })
  @IsNotEmpty()
  @IsString()
  destinataryNumber: string;

  @ApiProperty({
    type: 'number',
    description: 'The id opf the credit',
    example: '123456789',
  })
  @IsNotEmpty()
  @IsNumber()
  creditId: number;
}
