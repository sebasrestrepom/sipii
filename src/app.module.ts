import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthRepository } from './auth/AuthRepository';
import { typeOrmConfig } from './config/typeorm/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      ...typeOrmConfig,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
  exports: [],
})
export class AppModule {}
