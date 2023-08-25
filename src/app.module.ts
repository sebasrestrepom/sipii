import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthRepository } from './auth/auth.repository';
import { typeOrmConfig } from './config/typeorm/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      ...typeOrmConfig,
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '20h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
  exports: [],
})
export class AppModule {}
