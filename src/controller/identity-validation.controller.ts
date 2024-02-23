import {
  Controller,
  Post,
  Body,
  UploadedFiles,
  UseInterceptors,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { IdentityValidationService } from '../service/identity-validation/identity-validation.service';

import { IdentityValidationDto } from './dto/identity-validation.dto';
import { JwtAuthGuard } from '../../src/auth/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('Identity Validation Endpoints')
@UseGuards(JwtAuthGuard)
@Controller('identity-validation')
export class IdentityValidationController {
  constructor(private identityValidationService: IdentityValidationService) {}

  @Post('/')
  @ApiOperation({ summary: 'Validation of user identity' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'documentPhoto', maxCount: 1 },
      { name: 'selfiePhoto', maxCount: 1 },
    ]),
  )
  async identityValidation(
    @Body() data: IdentityValidationDto,
    @UploadedFiles()
    files: {
      documentPhoto?: Express.Multer.File[];
      selfiePhoto?: Express.Multer.File[];
    },
    @Request() req: any,
  ): Promise<string> {
    data.documentPhoto = files?.documentPhoto?.[0];
    data.selfiePhoto = files?.selfiePhoto?.[0];

    return this.identityValidationService.execute(data);
  }
}
