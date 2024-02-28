import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RecoverPasswordDto {
  @ApiProperty({
    type: 'string',
    description: 'The token for change password',
    example: 'asd56as6d6asd67a78s78as8d',
  })
  @IsNotEmpty()
  token: string;

  @ApiProperty({
    type: 'string',
    description: 'The new password',
    example: 'asd56as6d6asd67a78s78as8d',
  })
  @IsNotEmpty()
  password: string;
}
