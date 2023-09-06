import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { CreditRequestService } from '../service/credit/credit-request.service';
import { CreditsByDocumentService } from '../service/credit/credits-by-document.service';

import { CreditRequestDTO } from './dto/new-credit-request.dto';

import { Credit } from '../entities/credit';

@ApiTags('Credit Endpoints')
@Controller('credit')
export class CreditController {
  constructor(
    private creditRequestService: CreditRequestService,
    private creditsByDocumentService: CreditsByDocumentService,
  ) {}

  @Post('/request')
  @ApiOperation({ summary: 'Request a new credit' })
  async requestANewCredit(@Body() data: CreditRequestDTO): Promise<string> {
    const validationResult = await this.creditRequestService.execute(data);

    return validationResult;
  }

  @Get('/:document')
  @ApiOperation({ summary: 'Get credits by document' })
  async getCreditsByDocument(
    @Param('document') document: number,
  ): Promise<Credit[]> {
    return this.creditsByDocumentService.execute(document);
  }
}
