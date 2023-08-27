import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    type: 'number',
    description: 'The user identification',
    example: '123456789',
  })
  @IsNotEmpty()
  @IsNumber()
  document: number;

  @ApiProperty({
    type: 'string',
    description: 'The user password',
    example: '909090',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
