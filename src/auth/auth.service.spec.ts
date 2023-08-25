import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { HttpException } from '@nestjs/common';
import { hash } from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let mockAuthRepository;
  let mockJwtService;

  beforeEach(async () => {
    mockAuthRepository = {
      findOne: jest.fn(),
      save: jest.fn(),
    };
    mockJwtService = {
      sign: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: AuthRepository,
          useValue: mockAuthRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('newUser', () => {
    it('should throw an error if user already exists', async () => {
      mockAuthRepository.findOne.mockResolvedValue(true);
      await expect(
        authService.newUser({
          document: 12345,
          password: '123',
          name: 'sebas',
          lastName: 'restrepo',
          age: 10,
          city: 'cartago',
          address: 'calle busquela',
          documentType: 'cedula',
          email: 'sebas@gmail.com',
          phoneNumber: 0,
          department: 'valle',
        }),
      ).rejects.toThrow(HttpException);
    });

    it('should successfully save a new user', async () => {
      mockAuthRepository.findOne.mockResolvedValue(null);
      const hashedPassword = await hash('123', 10);
      mockAuthRepository.save.mockResolvedValue({
        document: 1,
        password: hashedPassword,
      });

      const result = await authService.newUser({
        document: 12345,
        password: '123',
        name: 'sebas',
        lastName: 'restrepo',
        age: 10,
        city: 'cartago',
        address: 'calle busquela',
        documentType: 'cedula',
        email: 'sebas@gmail.com',
        phoneNumber: 0,
        department: 'valle',
      });
      expect(result).toEqual({ document: 1, password: hashedPassword });
    });
  });

  describe('login', () => {
    it('should throw an error if user is not found', async () => {
      mockAuthRepository.findOne.mockResolvedValue(null);
      await expect(
        authService.login({ document: 1, password: '123' }),
      ).rejects.toThrow(HttpException);
    });

    it('should throw an error if password is incorrect', async () => {
      mockAuthRepository.findOne.mockResolvedValue({
        document: 1,
        password: await hash('321', 10),
      });
      await expect(
        authService.login({ document: 1, password: '123' }),
      ).rejects.toThrow(HttpException);
    });

    it('should return a token if login is successful', async () => {
      const hashedPassword = await hash('123', 10);
      mockAuthRepository.findOne.mockResolvedValue({
        document: 1,
        password: hashedPassword,
      });
      mockJwtService.sign.mockReturnValue('someToken');

      const result = await authService.login({ document: 1, password: '123' });
      expect(result).toEqual('someToken');
    });
  });
});
