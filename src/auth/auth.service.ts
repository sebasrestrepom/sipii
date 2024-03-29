import { HttpException, Injectable } from '@nestjs/common';
import { ICreateNewUser } from './interfaces/create-new-user.interface';
import { ILoginUser } from './interfaces/user-login.interface';
import { AuthRepository } from './auth.repository';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async newUser(data: ICreateNewUser): Promise<any> {
    const user = await this.authRepository.findOne(data.document);
    if (user) throw new HttpException('The user is already registered', 400);
    const passwordHash = await hash(data.password, 10);
    data.password = passwordHash;
    return this.authRepository.save(data);
  }

  async login(request: ILoginUser): Promise<any> {
    const user = await this.authRepository.findOne(request.document);
    if (!user) throw new HttpException('USER_NOT_REGISTERED', 404);

    const checkPassword = await compare(request.password, user.password);
    if (!checkPassword) throw new HttpException('PASSWORD_INVALID', 403);

    const token = this.jwtService.sign({ document: user.document });

    return token;
  }
}
