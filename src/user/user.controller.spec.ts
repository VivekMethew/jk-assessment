import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserDto } from './dtos/user.dto';
import { JwtAuthGuard } from '../gourds/jwt-auth.gourd';
import { RolesGuard } from '../gourds/roles.gourd';
import { UserStatus } from 'src/types/types';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            getAll: jest.fn(), // Mock getAll method
            getUser: jest.fn(), // Mock getUser method
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn().mockReturnValue(true) }) // Mock JwtAuthGuard
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: jest.fn().mockReturnValue(true) }) // Mock RolesGuard
      .compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  // Test case for getAll
  describe('GET /users', () => {
    it('should return an array of users', async () => {
      const users: UserDto[] = [
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          bio: 'I am sh s',
          phone: '9718546885',
          status: UserStatus.ACTIVE,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest.spyOn(service, 'getAll').mockResolvedValue(users);

      const result = await controller.getAll();
      expect(result).toEqual(users);
      expect(service.getAll).toHaveBeenCalled();
    });
  });

  // Test case for getUser by userId
  describe('GET /users/profile', () => {
    it('should return a user by userId', async () => {
      const userId = '1';
      const req = { user: { userId } };
      const user: UserDto = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        bio: 'I am sh s',
        phone: '9718546885',
        status: UserStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'getUser').mockResolvedValue(user);

      const result = await controller.getUser(req);
      expect(result).toEqual(user);
      expect(service.getUser).toHaveBeenCalledWith(userId);
    });
  });
});
