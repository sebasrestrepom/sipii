import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConfirmateCreditDto {
  @ApiProperty({
    type: 'number',
    description: 'The id of the credit',
    example: '1',
  })
  @IsNotEmpty()
  @IsNumber()
  creditId: number;

  @ApiProperty({
    type: 'number',
    description: 'The user identification',
    example: '123456789',
  })
  @IsNotEmpty()
  @IsNumber()
  document: number;
}
