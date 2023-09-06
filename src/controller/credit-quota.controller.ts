import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { CreditQuotaCalculationService } from '../service/credit-quota/credit-quota-calculation.service';
import { CreditQuotaByDocumentService } from '../service/credit-quota/credit-quota-by-document.service';

import { CreditQuota } from '../entities/credit-quota';

import { CreditQuotaDto } from './dto/credit-quota.dto';

@ApiTags('Credit Quota Endpoints')
@Controller('credit-quota')
export class CreditQuotaController {
  constructor(
    private creditQuotaCalculationService: CreditQuotaCalculationService,
    private creditQuotaByDocumentService: CreditQuotaByDocumentService,
  ) {}

  @Post('/')
  @ApiOperation({ summary: 'Credit Quota Calculation' })
  async creditQuotaCalculation(
    @Body() data: CreditQuotaDto,
  ): Promise<CreditQuota> {
    return this.creditQuotaCalculationService.execute(data.document);
  }

  @Get('/:document')
  @ApiOperation({ summary: 'Get credit quota by document' })
  async getCreditQuotaByDocument(
    @Param('document') document: number,
  ): Promise<CreditQuota> {
    return this.creditQuotaByDocumentService.execute(document);
  }
}
