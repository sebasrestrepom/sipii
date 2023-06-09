import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { NewUserDto } from './dto/new-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/user-login.dto';
import { User } from '../entities/user';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async newUser(
    @Body() request: NewUserDto,
  ): Promise<{ message: string; status: number }> {
    await this.authService.newUser(request);
    return {
      message: 'Your record was successfully created in the database.',
      status: HttpStatus.CREATED,
    };
  }

  @Post('/login')
  async login(
    @Body() request: LoginDto,
  ): Promise<{ message: string; status: number; data: User }> {
    const login = await this.authService.login(request);
    return {
      message: 'Your record was successfully created in the database.',
      status: HttpStatus.CREATED,
      data: login,
    };
  }
}
