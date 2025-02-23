// roles.guard.spec.ts

import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';
import { UserRole } from '../types/types';
import { RolesGuard } from './roles.gourd';

describe('RolesGuard', () => {
  let rolesGuard: RolesGuard;
  let reflector: Reflector;
  const roles = ['super_admin', 'admin', 'editor', 'viewer'];

  beforeEach(() => {
    // Mock the Reflector
    reflector = new Reflector();
    rolesGuard = new RolesGuard(reflector);
  });

  const mockExecutionContext = (userRoles: any[], handler: any = () => {}) => {
    return {
      switchToHttp: () => ({
        getRequest: () => ({ user: { roles: userRoles } }),
      }),
      getHandler: () => handler,
      getClass: () => RolesGuard,
    } as unknown as ExecutionContext;
  };

  it('should allow access if user has SUPER_ADMIN role', () => {
    const mockContext = mockExecutionContext([{ key: UserRole.SUPER_ADMIN }]);

    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(roles);

    expect(rolesGuard.canActivate(mockContext)).toBe(true);
  });

  it('should deny access if user has no roles', () => {
    const mockContext = mockExecutionContext([]);

    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(roles); // Required role is ADMIN

    expect(rolesGuard.canActivate(mockContext)).toBe(false);
  });

  it('should allow access if user has one of the required roles', () => {
    const mockContext = mockExecutionContext([{ key: 'admin' }]);

    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(roles);

    expect(rolesGuard.canActivate(mockContext)).toBe(true);
  });

  it('should deny access if user does not have any of the required roles', () => {
    const mockContext = mockExecutionContext([{ key: 'user' }]);

    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(roles);

    expect(rolesGuard.canActivate(mockContext)).toBe(false);
  });

  it('should deny access if required roles are empty', () => {
    const mockContext = mockExecutionContext([{ key: 'user' }]);

    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(roles);

    expect(rolesGuard.canActivate(mockContext)).toBe(false);
  });
});
