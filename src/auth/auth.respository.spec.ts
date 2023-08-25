import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { AuthRepository } from './auth.repository';
import { User } from '../entities/user';

describe('AuthRepository', () => {
  let authRepository: AuthRepository;
  let mockUserRepository: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    mockUserRepository = {
      findOne: jest.fn(),
      save: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthRepository,
        {
          provide: 'UserRepository',
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    authRepository = module.get<AuthRepository>(AuthRepository);
  });

  it('should be defined', () => {
    expect(authRepository).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a user by document', async () => {
      const user = new User();
      user.document = 123;

      mockUserRepository.findOne.mockResolvedValue(user);

      const foundUser = await authRepository.findOne(123);
      expect(foundUser).toEqual(user);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { document: 123 },
      });
    });
  });

  describe('save', () => {
    it('should save a user', async () => {
      const user = new User();
      user.document = 123;

      mockUserRepository.save.mockResolvedValue(user);

      const savedUser = await authRepository.save(user);
      expect(savedUser).toEqual(user);
      expect(mockUserRepository.save).toHaveBeenCalledWith(user);
    });
  });
});
