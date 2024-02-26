import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaymentItemDto {
  @ApiProperty({
    type: 'string',
    description: 'The ID of the item',
    example: '123',
  })
  @IsNotEmpty()
  @IsString()
  ID: string;

  @ApiProperty({
    type: 'number',
    description: 'The quantity of the item',
    example: '1',
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({
    type: 'number',
    description: 'The unit price of the item',
    example: '1000',
  })
  @IsNotEmpty()
  @IsNumber()
  unitPrice: number;

  @ApiProperty({
    type: 'string',
    description: 'The document of the client',
    example: '123456789',
  })
  @IsNotEmpty()
  @IsString()
  document: string;
}
