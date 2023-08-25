import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HttpStatus } from '@nestjs/common';

describe('AuthController', () => {
  let authController: AuthController;
  let mockAuthService;

  beforeEach(async () => {
    mockAuthService = {
      newUser: jest.fn(),
      login: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('newUser', () => {
    it('should return a successful registration message', async () => {
      mockAuthService.newUser.mockResolvedValue();

      const result = await authController.newUser({
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
      expect(result).toEqual({
        message: 'Your record was successfully created in the database.',
        status: HttpStatus.CREATED,
      });
      expect(mockAuthService.newUser).toHaveBeenCalledWith({
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
    });
  });

  describe('login', () => {
    it('should return a successful login message and a token', async () => {
      mockAuthService.login.mockResolvedValue('someToken');

      const result = await authController.login({
        document: 1,
        password: '123',
      });
      expect(result).toEqual({
        message: 'The login was successful',
        status: HttpStatus.OK,
        data: { token: 'someToken' },
      });
      expect(mockAuthService.login).toHaveBeenCalledWith({
        document: 1,
        password: '123',
      });
    });
  });
});
