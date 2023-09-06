import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreditRequestDTO {
  @ApiProperty({
    type: 'number',
    description: 'The user identification',
    example: '123456789',
  })
  @IsNotEmpty()
  @IsNumber()
  document: number;

  @ApiProperty({
    type: 'number',
    description: 'The amount of credit',
    example: '100000',
  })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({
    type: 'number',
    description: 'The total amount of credit',
    example: '150000',
  })
  @IsNotEmpty()
  @IsNumber()
  totalAmount: number;

  @ApiProperty({
    type: 'string',
    description: 'The payment date of credit',
    example: '5/12/2',
  })
  @IsNotEmpty()
  @IsString()
  paymentDate: string;
}
