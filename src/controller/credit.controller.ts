import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Request,
  UnauthorizedException,
  Delete,
  Patch,
  Logger,
} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

import { CreditRequestService } from '../service/credit/credit-request.service';
import { CreditsByDocumentService } from '../service/credit/credits-by-document.service';

import { CreditRequestDTO } from './dto/new-credit-request.dto';

import { Credit } from '../entities/credit';
import { JwtAuthGuard } from '../../src/auth/jwt-auth.guard';
import { DeleteCreditsByDocumentService } from '../service/credit/delete-credits-by-id.service';
import { UpdateSignCreditDTO } from './dto/update-sign-credit.dto';
import { UpdateSignCreditService } from '../service/credit/update-sign-credit.service';
import { ConfirmateCreditService } from '../service/credit/confirmate-credit.service';
import { ConfirmateCreditDto } from './dto/confirmate-credit.dto';
import { DeletePendingCreditsService } from '../service/credit/delete-pending-credits.service';
import { UnpaidCreditsAnalysisService } from '../service/credit/unpaid-credits-analysis.service';

@ApiBearerAuth()
@ApiTags('Credit Endpoints')
@UseGuards(JwtAuthGuard)
@Controller('credit')
export class CreditController {
  constructor(
    private creditRequestService: CreditRequestService,
    private creditsByDocumentService: CreditsByDocumentService,
    private deleteCreditsByDocumentService: DeleteCreditsByDocumentService,
    private updateSignCreditService: UpdateSignCreditService,
    private confirmateCreditService: ConfirmateCreditService,
    private deletePendingCreditsService: DeletePendingCreditsService,
    private unpaidCreditsAnalysisService: UnpaidCreditsAnalysisService,
  ) {}

  @Post('/request')
  @ApiOperation({ summary: 'Request a new credit' })
  async requestANewCredit(
    @Body() data: CreditRequestDTO,
    @Request() req: any,
  ): Promise<Credit> {
    if (+req.user.document !== +data.document) {
      throw new UnauthorizedException(
        'You are not allowed to access this data',
      );
    }

    const creditSaved = await this.creditRequestService.execute(data);

    return creditSaved;
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

  @Delete('/:document')
  @ApiOperation({ summary: 'Delete credits by document' })
  async deleteCreditsByDocument(@Param('document') document: number) {
    if (+document !== +document) {
      throw new UnauthorizedException(
        'You are not allowed to access this data',
      );
    }
    return this.deleteCreditsByDocumentService.execute(document);
  }

  @Patch('/')
  @ApiOperation({ summary: 'Request a new credit' })
  async updateSignCredit(
    @Body() data: UpdateSignCreditDTO,
    @Request() req: any,
  ): Promise<Credit> {
    if (+req.user.document !== +data.document) {
      throw new UnauthorizedException(
        'You are not allowed to access this data',
      );
    }

    return this.updateSignCreditService.execute(data);
  }

  @Post('/confirmacion-desembolso')
  @ApiOperation({ summary: 'confirmate one credit' })
  async confirmateCredit(
    @Body() data: ConfirmateCreditDto,
    @Request() req: any,
  ): Promise<void> {
    if (+req.user.document !== +data.document) {
      throw new UnauthorizedException(
        'You are not allowed to access this data',
      );
    }

    await this.confirmateCreditService.execute(data.creditId);
  }

  @ApiOperation({
    summary: 'Delete pending credits in excess of 12 hours created',
  })
  @Cron('0 * * * *')
  async deletePendingCredits(): Promise<void> {
    Logger.log('Started process of cleaning pending credits');
    await this.deletePendingCreditsService.execute();
  }

  @ApiOperation({
    summary: 'Proccess of analysis unpaid credits',
  })
  @Cron('0 13 * * *')
  async unpaidCreditsAnalysis(): Promise<void> {
    Logger.log('Started process of unpaid credit analysis');
    await this.unpaidCreditsAnalysisService.execute();
  }
}
