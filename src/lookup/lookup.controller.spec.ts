import { Test, TestingModule } from '@nestjs/testing';
import { LookupController } from './lookup.controller';
import { LookupService } from './lookup.service';
import { RolesGuard } from '../gourds/roles.gourd';
import { JwtAuthGuard } from '../gourds/jwt-auth.gourd';
import { RoleDto } from './dtos/role.dto';
import { UserRole } from '../types/types';

describe('LookupController', () => {
  let lookupController: LookupController;
  let lookupService: LookupService;

  const mockLookupService = {
    getAll: jest.fn().mockResolvedValue([
      {
        id: '1',
        name: 'Admin',
        key: UserRole.ADMIN,
      },
      {
        id: '2',
        name: 'Editor',
        key: UserRole.EDITOR,
      },
      {
        id: '3',
        name: 'Viewer',
        key: UserRole.VIEWER,
      },
    ]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LookupController],
      providers: [
        {
          provide: LookupService,
          useValue: mockLookupService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    lookupController = module.get<LookupController>(LookupController);
    lookupService = module.get<LookupService>(LookupService);
  });

  it('should be defined', () => {
    expect(lookupController).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of RoleDto', async () => {
      const result: RoleDto[] = await lookupController.getAll();
      expect(lookupService.getAll).toHaveBeenCalled();

      expect(result).toEqual([
        {
          id: '1',
          name: 'Admin',
          key: UserRole.ADMIN,
        },
        {
          id: '2',
          name: 'Editor',
          key: UserRole.EDITOR,
        },
        {
          id: '3',
          name: 'Viewer',
          key: UserRole.VIEWER,
        },
      ]);
    });

    it('should return an empty array if no roles are found', async () => {
      jest.spyOn(lookupService, 'getAll').mockResolvedValueOnce([]);
      const result: RoleDto[] = await lookupController.getAll();
      expect(lookupService.getAll).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });
});
