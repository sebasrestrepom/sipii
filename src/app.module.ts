import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
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
import { JwtStrategy } from './auth/jwt.strategy';
import { UserController } from './controller/user.controller';
import { UserByDocumentService } from './service/user/user-by-document.service';
import { DeleteCreditsByDocumentService } from './service/credit/delete-credits-by-id.service';
import { SmsMessagesController } from './controller/send-messages.controller';
import { SendSMSMessageService } from './service/sms-message/send-sms-message.service';
import { UpdateSignCreditService } from './service/credit/update-sign-credit.service';
import { EmailService } from './utils/send-email-message.util';
import { ConfirmateCreditService } from './service/credit/confirmate-credit.service';
import { ScheduleModule } from '@nestjs/schedule';
import { DeletePendingCreditsService } from './service/credit/delete-pending-credits.service';
import { UnpaidCreditsAnalysisService } from './service/credit/unpaid-credits-analysis.service';
import { MercadoPagoController } from './controller/payment.controller';
import { MercadoPagoPreferenceService } from './service/mercado-pago/mercado-pago-preference.service';
import { MercadoPagoHandleNotificationService } from './service/mercado-pago/mercado-pago-webhook.service';
import { PaymentRepository } from './repository/payment.repository';
import { PaymentEntity } from './entities/payments';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      ...typeOrmConfig,
    }),
    TypeOrmModule.forFeature([User, CreditQuota, Credit, PaymentEntity]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '20h' },
    }),
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: 'sebasrestrepom@gmail.com',
          pass: 'keqdgbslilplbjia',
        },
      },
      defaults: {
        from: 'sebasrestrepom@gmail.com',
      },
    }),
  ],
  controllers: [
    AuthController,
    CreditQuotaController,
    CreditController,
    IdentityValidationController,
    UserController,
    SmsMessagesController,
    MercadoPagoController,
  ],
  providers: [
    AuthService,
    JwtStrategy,
    CreditQuotaCalculationService,
    CreditQuotaByDocumentService,
    CreditRequestService,
    CreditsByDocumentService,
    IdentityValidationService,
    UpdateSignCreditService,
    AuthRepository,
    CreditQuotaRepository,
    UserRepository,
    CreditRepository,
    UserByDocumentService,
    DeleteCreditsByDocumentService,
    SendSMSMessageService,
    ConfirmateCreditService,
    EmailService,
    DeletePendingCreditsService,
    UnpaidCreditsAnalysisService,
    MailerModule,
    MercadoPagoPreferenceService,
    MercadoPagoHandleNotificationService,
    PaymentRepository,
  ],
  exports: [],
})
export class AppModule {}
