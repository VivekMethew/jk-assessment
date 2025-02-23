import { Test, TestingModule } from '@nestjs/testing';
import { UserRoleController } from './user_role.controller';
import { UserRoleService } from './user_role.service';
import { AssignRoleDto } from './dtos/assign-role.dto';
import { JwtAuthGuard } from '../gourds/jwt-auth.gourd';
import { RolesGuard } from '../gourds/roles.gourd';

describe('UserRoleController', () => {
  let controller: UserRoleController;
  let service: UserRoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserRoleController],
      providers: [
        {
          provide: UserRoleService,
          useValue: {
            findAllUserRoles: jest.fn(), // Mock findAllUserRoles method
            assignRoleToUser: jest.fn(), // Mock assignRoleToUser method
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn().mockReturnValue(true) }) // Mock JwtAuthGuard
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: jest.fn().mockReturnValue(true) }) // Mock RolesGuard
      .compile();

    controller = module.get<UserRoleController>(UserRoleController);
    service = module.get<UserRoleService>(UserRoleService);
  });

  // Test case for findAllUserRoles
  describe('GET /user-roles', () => {
    it('should return all user roles for the given userId', async () => {
      const userId = '123'; // Mock userId
      const req = { user: { userId } };
      const roles = [
        { id: '1', role: 'Admin' },
        { id: '2', role: 'Editor' },
      ];

      jest.spyOn(service, 'findAllUserRoles').mockResolvedValue(roles);

      const result = await controller.findAll(req);
      expect(result).toEqual(roles);
      expect(service.findAllUserRoles).toHaveBeenCalledWith(userId);
    });
  });

  // Test case for assignRoleToUser
  describe('PUT /user-roles', () => {
    it('should assign a role to the user', async () => {
      const assignRoleDto: AssignRoleDto = {
        userId: '123',
        role: '1',
      };
      const successMessage = { message: 'Role assigned successfully' };

      jest.spyOn(service, 'assignRoleToUser').mockResolvedValue(successMessage);

      const result = await controller.assiignRoleToUser(assignRoleDto);
      expect(result).toEqual(successMessage);
      expect(service.assignRoleToUser).toHaveBeenCalledWith(assignRoleDto);
    });
  });
});
