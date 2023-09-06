import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IdentityValidationDto {
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
    format: 'binary',
  })
  documentPhoto: Express.Multer.File;

  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  selfiePhoto: Express.Multer.File;

  @ApiProperty({
    type: 'Date',
    description: 'Date of birth',
    example: '1997-09-05',
  })
  @IsNotEmpty()
  dateOfBirth: Date;

  @ApiProperty({
    type: 'Date',
    description: 'Date of issuance of identity card',
    example: '2010-09-05',
  })
  dateDocumentIssuance: Date;

  @ApiProperty({
    type: 'string',
    description: 'User gender',
    example: 'Male',
  })
  @IsString()
  gender: string;

  @ApiProperty({
    type: 'string',
    description: 'User marital status',
    example: 'Married',
  })
  maritalStatus: string;

  @ApiProperty({
    type: 'string',
    description: 'Composition of the user household',
    example: 'Wife',
  })
  householdComposition: string;

  @ApiProperty({
    type: 'number',
    description: 'How many children does the user have',
    example: '2',
  })
  sons: number;

  @ApiProperty({
    type: 'number',
    description: 'Dependents of the user',
    example: '2',
  })
  economicDependents: number;

  @ApiProperty({
    type: 'string',
    description: 'User level of education',
    example: 'Master',
  })
  levelStudy: string;

  @ApiProperty({
    type: 'number',
    description: 'Stratum of the house where the user lives',
    example: '5',
  })
  houseStratum: number;

  @ApiProperty({
    type: 'string',
    description: 'How did you meet Sipii',
    example: 'Youtube ADS',
  })
  discoveryChannel: string;

  @ApiProperty({
    type: 'string',
    description: 'User occupation',
    example: 'Employee',
  })
  occupation: string;

  @ApiProperty({
    type: 'string',
    description: 'User Job',
    example: 'Software engineer',
  })
  job: string;

  @ApiProperty({
    type: 'number',
    description: 'Years of work experience',
    example: '3',
  })
  yearsExperience: number;

  @ApiProperty({
    type: 'string',
    description: 'Type of Company',
    example: 'Private',
  })
  companyType: string;

  @ApiProperty({
    type: 'string',
    description: 'Company Name',
    example: 'Sipii',
  })
  companyName: string;

  @ApiProperty({
    type: 'string',
    description: 'Contract Type',
    example: 'Indefinite',
  })
  contractType: string;

  @ApiProperty({
    type: 'number',
    description: 'Monthly Income',
    example: '9000000',
  })
  monthlyIncome: number;

  @ApiProperty({
    type: 'string',
    description: 'Bank Name',
    example: 'Bancolombia',
  })
  bankName: string;

  @ApiProperty({
    type: 'number',
    description: 'Account Number',
    example: '10040023002',
  })
  bankAccount: number;
}
