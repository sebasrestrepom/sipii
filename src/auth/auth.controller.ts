import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { NewUserDto } from './dto/new-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/user-login.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Auth Endpoints')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @ApiOperation({ summary: 'User registration' })
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
  @ApiOperation({ summary: 'User login' })
  async login(
    @Body() request: LoginDto,
  ): Promise<{ message: string; status: number; data: object }> {
    const token = await this.authService.login(request);
    return {
      message: 'The login was successful',
      status: HttpStatus.OK,
      data: { token },
    };
  }
}
