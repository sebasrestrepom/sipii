import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

import { CreditRequestService } from '../service/credit/credit-request.service';
import { CreditsByDocumentService } from '../service/credit/credits-by-document.service';

import { CreditRequestDTO } from './dto/new-credit-request.dto';

import { Credit } from '../entities/credit';
import { JwtAuthGuard } from '../../src/auth/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('Credit Endpoints')
@UseGuards(JwtAuthGuard)
@Controller('credit')
export class CreditController {
  constructor(
    private creditRequestService: CreditRequestService,
    private creditsByDocumentService: CreditsByDocumentService,
  ) {}

  @Post('/request')
  @ApiOperation({ summary: 'Request a new credit' })
  async requestANewCredit(
    @Body() data: CreditRequestDTO,
    @Request() req: any,
  ): Promise<string> {
    if (+req.user.document !== +data.document) {
      throw new UnauthorizedException(
        'You are not allowed to access this data',
      );
    }

    const validationResult = await this.creditRequestService.execute(data);

    return validationResult;
  }

  @Get('/:document')
  @ApiOperation({ summary: 'Get credits by document' })
  async getCreditsByDocument(
    @Param('document') document: number,
    @Request() req: any,
  ): Promise<Credit[]> {
    if (+req.user.document !== +document) {
      throw new UnauthorizedException(
        'You are not allowed to access this data',
      );
    }

    return this.creditsByDocumentService.execute(document);
  }
}
