import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { LocalAuthGuard } from '../gourds/local-auth.gourd';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: { login: jest.fn(), register: jest.fn() },
        },
      ],
    })
      // Mocking LocalAuthGuard
      .overrideGuard(LocalAuthGuard)
      .useValue({
        canActivate: jest.fn(() => true),
      })
      .compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should call AuthService.login and return the result', async () => {
      const loginDto: LoginDto = {
        email: 'jon@gmail.com',
        password: 'john@123',
      };

      const result = {
        user: {
          email: 'test@example.com',
          id: 'user-id',
          status: 'ACTIVE',
        },
        access_token: 'token',
      };

      jest.spyOn(authService, 'login').mockResolvedValue(result);

      const response = await authController.login(loginDto);
      expect(authService.login).toHaveBeenCalledWith(loginDto);
      expect(response).toEqual(result);
    });
  });

  describe('register', () => {
    it('should call AuthService.register and return the result', async () => {
      const registerDto: RegisterDto = {
        firstName: 'vivek',
        lastName: 'kumar',
        password: '123456',
        email: 'test__213@example.com',
      };

      const result = {
        message: 'User created successfully',
        user: {
          firstName: 'john',
          lastName: 'doe',
          email: 'john_1@gmail.com',
          password: 'john@123', // For the test, this should be hashed in a real-world scenario
          id: '4efd0d77-13bc-4648-bd21-76df9870fe73',
          createdAt: new Date('2025-02-23T09:06:26.879Z'),
          updatedAt: new Date('2025-02-23T09:06:26.879Z'),
          deletedAt: null,
          status: 'active',
        },
      };

      jest.spyOn(authService, 'register').mockResolvedValue(result);

      const response = await authController.register(registerDto);

      expect(authService.register).toHaveBeenCalledWith(registerDto);

      expect(response).toEqual(result);
    });
  });
});
