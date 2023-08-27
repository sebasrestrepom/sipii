import { IsNotEmpty, IsString, IsNumber, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NewUserDto {
  @ApiProperty({
    type: 'string',
    description: 'The name of the user',
    example: 'sebastian',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: 'string',
    description: 'The last name of the user',
    example: 'restrepo',
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    type: 'string',
    description: 'The document type',
    example: 'cedula',
  })
  @IsNotEmpty()
  @IsString()
  documentType: string;

  @ApiProperty({
    type: 'number',
    description: 'The user identification',
    example: '123456789',
  })
  @IsNotEmpty()
  @IsString()
  document: number;

  @ApiProperty({
    type: 'string',
    description: 'The email of the user',
    example: 'sebastian@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: 'number',
    description: 'The phone number of the user',
    example: '3110002222',
  })
  @IsNotEmpty()
  @IsNumber()
  phoneNumber: number;

  @ApiProperty({
    type: 'number',
    description: 'The age of the user',
    example: '24',
  })
  @IsNotEmpty()
  @IsNumber()
  age: number;

  @ApiProperty({
    type: 'string',
    description: 'The department where the user lives',
    example: 'Valle',
  })
  @IsNotEmpty()
  @IsString()
  department: string;

  @ApiProperty({
    type: 'string',
    description: 'The city where the user lives',
    example: 'Cartago',
  })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({
    type: 'string',
    description: 'The user address',
    example: 'calle busquela',
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    type: 'string',
    description: 'The user password',
    example: '909090',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
