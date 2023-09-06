import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { CreditQuotaCalculationService } from './service/credit-quota/credit-quota-calculation.service';
import { CreditQuotaByDocumentService } from './service/credit-quota/credit-quota-by-document.service';
import { CreditRequestService } from './service/credit/credit-request.service';
import { CreditsByDocumentService } from './service/credit/credits-by-document.service';
import { IdentityValidationService } from './service/identity-validation/identity-validation.service';
import { AuthController } from './auth/auth.controller';
import { CreditQuotaController } from './controller/credit-quota.controller';
import { CreditController } from './controller/credit.controller';
import { IdentityValidationController } from './controller/identity-validation.controller';
import { AuthRepository } from './auth/auth.repository';
import { CreditQuotaRepository } from './repository/credit-quota.repository';
import { UserRepository } from './repository/user.respository';
import { CreditRepository } from './repository/credit.repository';
import { typeOrmConfig } from './config/typeorm/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user';
import { CreditQuota } from './entities/credit-quota';
import { Credit } from './entities/credit';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      ...typeOrmConfig,
    }),
    TypeOrmModule.forFeature([User, CreditQuota, Credit]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '20h' },
    }),
  ],
  controllers: [
    AuthController,
    CreditQuotaController,
    CreditController,
    IdentityValidationController,
  ],
  providers: [
    AuthService,
    CreditQuotaCalculationService,
    CreditQuotaByDocumentService,
    CreditRequestService,
    CreditsByDocumentService,
    IdentityValidationService,
    AuthRepository,
    CreditQuotaRepository,
    UserRepository,
    CreditRepository,
  ],
  exports: [],
})
export class AppModule {}
