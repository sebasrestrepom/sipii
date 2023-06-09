import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsNumber()
  document: number;

  @IsNotEmpty()
  @IsString()
  password: string;
}
