import { Type } from 'class-transformer';
import { ValidateNested, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentItemDto } from './new-payment-item.dto';

export class PaymentDto {
  @ApiProperty({
    type: PaymentItemDto,
    description: 'The items of the payment',
    example: [
      {
        ID: '123',
        quantity: 1,
        unitPrice: 1000,
        document: '123456789',
      },
    ],
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PaymentItemDto)
  items: PaymentItemDto[];
}
