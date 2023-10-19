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

import { CreditQuotaCalculationService } from '../service/credit-quota/credit-quota-calculation.service';
import { CreditQuotaByDocumentService } from '../service/credit-quota/credit-quota-by-document.service';

import { CreditQuota } from '../entities/credit-quota';

import { CreditQuotaDto } from './dto/credit-quota.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@ApiBearerAuth()
@ApiTags('Credit Quota Endpoints')
@UseGuards(JwtAuthGuard)
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
    @Request() req: any,
  ): Promise<CreditQuota> {
    if (req.user.document !== +data.document) {
      throw new UnauthorizedException(
        'You are not allowed to access this data',
      );
    }

    return this.creditQuotaCalculationService.execute(data.document);
  }

  @Get('/:document')
  @ApiOperation({ summary: 'Get credit quota by document' })
  async getCreditQuotaByDocument(
    @Param('document') document: number,
    @Request() req: any,
  ): Promise<CreditQuota> {
    if (+req.user.document !== +document) {
      throw new UnauthorizedException(
        'You are not allowed to access this data',
      );
    }

    return this.creditQuotaByDocumentService.execute(document);
  }
}
