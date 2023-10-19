import {
  Controller,
  Get,
  Param,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

import { UserByDocumentService } from '../service/user/user-by-document.service';
import { JwtAuthGuard } from '../../src/auth/jwt-auth.guard';
import { User } from 'src/entities/user';

@ApiBearerAuth()
@ApiTags('User Endpoints')
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private userByDocumentService: UserByDocumentService) {}

  @Get('/:document')
  @ApiOperation({ summary: 'Get user by document' })
  async getUserByDocument(
    @Param('document') document: number,
    @Request() req: any,
  ): Promise<User> {
    if (+req.user.document !== +document) {
      throw new UnauthorizedException(
        'You are not allowed to access this data',
      );
    }

    return this.userByDocumentService.execute(document);
  }
}
