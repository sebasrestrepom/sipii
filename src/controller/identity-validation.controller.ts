import {
  Controller,
  Post,
  Body,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

import { ApiTags, ApiOperation, ApiConsumes } from '@nestjs/swagger';

import { IdentityValidationService } from '../service/identity-validation/identity-validation.service';

import { IdentityValidationDto } from './dto/identity-validation.dto';

@ApiTags('Identity Validation Endpoints')
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
  ): Promise<string> {
    data.documentPhoto = files.documentPhoto[0];
    data.selfiePhoto = files.selfiePhoto[0];

    return this.identityValidationService.execute(data);
  }
}
